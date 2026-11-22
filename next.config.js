/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // GitHub Pages serves the site under /snbn; the Pages workflow sets
  // NEXT_BASE_PATH, the Workers build leaves it unset (basePath '').
  basePath: process.env.NEXT_BASE_PATH || '',
};

module.exports = nextConfig;
