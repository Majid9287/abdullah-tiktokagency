/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'img.youtube.com',
      'i.ytimg.com',
      'p16-sign.tiktokcdn.com',
      'p19-sign.tiktokcdn.com',
      'p26-sign.tiktokcdn.com',
      'p77-sign.tiktokcdn.com',
      'p58-sign.tiktokcdn.com'
    ],
  },
  webpack: (config, { isServer }) => {
    // Fix for Node.js modules in client-side code
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    return config;
  },
};

export default nextConfig;
