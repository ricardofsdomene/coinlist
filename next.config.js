/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    LL_BASE_URL: process.env.LL_BASE_URL,
    QUERY_TOKEN: process.env.QUERY_TOKEN,
    FB_PIXEL_ID: process.env.FB_PIXEL_ID
  },
};

module.exports = nextConfig;
