/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    URL: process.env.URL,
    API_KEY: process.env.API_KEY,
  },
};

module.exports = nextConfig;
