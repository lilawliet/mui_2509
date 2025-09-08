# CI/CD 故障排除指南

## 问题 1：Dependencies lock file is not found

### 错误信息
```
Error: Dependencies lock file is not found in /home/runner/work/mui_2509/mui_2509. 
Supported file patterns: package-lock.json,npm-shrinkwrap.json,yarn.lock
```

### 问题原因
这个错误是因为 GitHub Actions 工作流中的包管理器检测和缓存配置不正确。项目使用的是 `pnpm`，但工作流配置只识别 npm 和 yarn 的锁文件。

## 问题 2：pnpm-lock.yaml 版本不兼容

### 错误信息
```
WARN  Ignoring not compatible lockfile at /home/runner/work/mui_2509/mui_2509/pnpm-lock.yaml
ERR_PNPM_NO_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is absent
```

### 问题原因
本地开发环境使用的 pnpm 版本（如 10.x）与 GitHub Actions 中配置的版本（如 8.x）不匹配，导致锁文件版本不兼容。

### 解决方案（问题 2）

#### 1. 更新 pnpm 版本
确保 GitHub Actions 中的 pnpm 版本与本地开发环境一致：

```yaml
- name: Setup pnpm
  if: steps.detect-package-manager.outputs.manager == 'pnpm'
  uses: pnpm/action-setup@v4
  with:
    version: 10  # 更新为与本地环境匹配的版本
```

#### 2. 添加备用安装策略
修改安装步骤以处理锁文件不兼容的情况：

```yaml
- name: Install dependencies
  run: |
    if [ "${{ steps.detect-package-manager.outputs.manager }}" = "pnpm" ]; then
      # 尝试使用 frozen-lockfile，如果失败则回退到普通安装
      pnpm install --frozen-lockfile || pnpm install
    else
      ${{ steps.detect-package-manager.outputs.manager }} ${{ steps.detect-package-manager.outputs.command }}
    fi
```

### 解决方案（问题 1）

#### 1. 修复包管理器检测逻辑
在 `.github/workflows/nextjs.yml` 中，更新包管理器检测逻辑以支持 pnpm：

```yaml
- name: Detect package manager
  id: detect-package-manager
  run: |
    if [ -f "${{ github.workspace }}/pnpm-lock.yaml" ]; then
      echo "manager=pnpm" >> $GITHUB_OUTPUT
      echo "command=install --frozen-lockfile" >> $GITHUB_OUTPUT
      echo "runner=pnpm" >> $GITHUB_OUTPUT
      exit 0
    elif [ -f "${{ github.workspace }}/yarn.lock" ]; then
      echo "manager=yarn" >> $GITHUB_OUTPUT
      echo "command=install" >> $GITHUB_OUTPUT
      echo "runner=yarn" >> $GITHUB_OUTPUT
      exit 0
    elif [ -f "${{ github.workspace }}/package.json" ]; then
      echo "manager=npm" >> $GITHUB_OUTPUT
      echo "command=ci" >> $GITHUB_OUTPUT
      echo "runner=npx --no-install" >> $GITHUB_OUTPUT
      exit 0
    else
      echo "Unable to determine package manager"
      exit 1
    fi
```

#### 2. 添加 pnpm 设置步骤
```yaml
- name: Setup pnpm
  if: steps.detect-package-manager.outputs.manager == 'pnpm'
  uses: pnpm/action-setup@v4
  with:
    version: 8
```

#### 3. 修复缓存配置
更新缓存配置以支持 `pnpm-lock.yaml`：

```yaml
- name: Setup pnpm cache
  if: steps.detect-package-manager.outputs.manager == 'pnpm'
  uses: actions/cache@v4
  with:
    path: ~/.pnpm-store
    key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
    restore-keys: |
      ${{ runner.os }}-pnpm-store-

- name: Restore cache
  uses: actions/cache@v4
  with:
    path: |
      .next/cache
    key: ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json', '**/yarn.lock', '**/pnpm-lock.yaml') }}-${{ hashFiles('**.[jt]s', '**.[jt]sx') }}
    restore-keys: |
      ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json', '**/yarn.lock', '**/pnpm-lock.yaml') }}-
```

### 最佳实践

#### 使用专门的 pnpm 工作流
如果项目确定只使用 pnpm，可以使用专门为 pnpm 优化的工作流配置（参考 `ci-cd-pnpm.yml`）。

#### 关键配置要点
1. **正确的锁文件检测**：确保检测 `pnpm-lock.yaml` 文件
2. **pnpm 设置**：使用 `pnpm/action-setup@v4` action
3. **缓存配置**：配置 pnpm store 缓存以提高构建速度
4. **安装命令**：使用 `pnpm install --frozen-lockfile` 确保依赖一致性

### 验证修复
修复后，工作流应该能够：
1. 正确检测到 pnpm 作为包管理器
2. 设置 pnpm 环境
3. 缓存 pnpm store 以提高后续构建速度
4. 成功安装依赖并构建项目

### 常见问题
- **缓存不生效**：确保缓存路径正确，使用 `pnpm store path` 获取正确路径
- **版本不匹配**：确保 GitHub Actions 中的 pnpm 版本与本地开发环境一致
- **权限问题**：确保工作流有足够的权限访问缓存和部署目标
