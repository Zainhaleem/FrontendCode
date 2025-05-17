const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['zainhaleem.com', 'res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: 'dqjjgstzn',
      },
    ],
  },
};

export default nextConfig;
