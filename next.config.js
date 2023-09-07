/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    URL: process.env.URL,
    API_KEY: process.env.API_KEY,
  },
  images: {
    domains: ['image.tmdb.org', 'i.ytimg.com'],
  },
};

module.exports = nextConfig;
