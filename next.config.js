/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export to enable server runtime required by NextAuth
  images: { unoptimized: true },
};

module.exports = nextConfig;
