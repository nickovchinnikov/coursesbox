/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost:1337",
      "localhost",
      "ec2-35-173-183-160.compute-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
