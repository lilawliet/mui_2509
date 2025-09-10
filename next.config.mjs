/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // 如果部署到 GitHub Pages 的子路径，需要设置 basePath
  basePath: '/mui_2509',
  assetPrefix: '/mui_2509/',
};

export default nextConfig;
