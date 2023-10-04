/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io"],
    unoptimized: true,
  },
  // i18n: {
  //   locales: ['de', 'en'],
  //   defaultLocale: 'de',
  // },
};

module.exports = nextConfig;
