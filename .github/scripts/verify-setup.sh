#!/bin/bash
# 验证 CI/CD 设置的脚本

set -e

echo "🔍 验证 pnpm 设置..."

# 检查 pnpm-lock.yaml 是否存在
if [ ! -f "pnpm-lock.yaml" ]; then
    echo "❌ pnpm-lock.yaml 文件不存在"
    exit 1
fi

echo "✅ pnpm-lock.yaml 文件存在"

# 检查 pnpm 版本
if command -v pnpm >/dev/null 2>&1; then
    PNPM_VERSION=$(pnpm --version)
    echo "📦 本地 pnpm 版本: $PNPM_VERSION"
    
    # 检查锁文件版本
    LOCKFILE_VERSION=$(grep "lockfileVersion:" pnpm-lock.yaml | cut -d "'" -f 2)
    echo "🔒 锁文件版本: $LOCKFILE_VERSION"
    
    # pnpm 版本建议
    case $LOCKFILE_VERSION in
        "9.0")
            echo "💡 建议使用 pnpm 9.x 或 10.x"
            ;;
        "6.0")
            echo "💡 建议使用 pnpm 7.x 或 8.x"
            ;;
        *)
            echo "⚠️  未知的锁文件版本"
            ;;
    esac
else
    echo "❌ pnpm 未安装"
    exit 1
fi

# 测试安装
echo "🧪 测试 pnpm 安装..."
if pnpm install --frozen-lockfile; then
    echo "✅ frozen-lockfile 安装成功"
else
    echo "⚠️  frozen-lockfile 失败，尝试普通安装..."
    if pnpm install; then
        echo "✅ 普通安装成功"
    else
        echo "❌ 安装失败"
        exit 1
    fi
fi

# 测试构建
echo "🏗️  测试构建..."
if pnpm build; then
    echo "✅ 构建成功"
else
    echo "❌ 构建失败"
    exit 1
fi

echo "🎉 所有检查通过！"
