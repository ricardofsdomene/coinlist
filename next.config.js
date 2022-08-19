/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    LL_BASE_URL: process.env.LL_BASE_URL,
    QUERY_TOKEN: process.env.QUERY_TOKEN,
  },
};

module.exports = nextConfig;
