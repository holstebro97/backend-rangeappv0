/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  images: {
      unoptimized: true // Required for static export
  },
  trailingSlash: false,
}

export default nextConfig;