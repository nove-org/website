/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    sassOptions: {
        includePaths: ['./app', './sass'],
    },
};

module.exports = nextConfig;
