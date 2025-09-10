
// ----------------------------------------------------------------------

/**
 * 获取静态资源的正确路径
 * 适配不同的部署环境（开发、生产、GitHub Pages等）
 */
export function getAssetPath(path: string): string {
  // 确保路径以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // 在开发环境中直接返回路径
  if (process.env.NODE_ENV === 'development') {
    return normalizedPath;
  }
  
  // 在生产环境中，如果有 basePath 配置，需要添加前缀
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  
  return `${basePath}${normalizedPath}`;
}

/**
 * 获取设置图标的路径
 */
export function getSettingIconPath(iconName: string): string {
  return getAssetPath(`/assets/icons/setting/ic_${iconName}.svg`);
}
