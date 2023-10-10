/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    sassOptions: {
        includePaths: ['./app', './sass'],
    },
    images: {
        domains: ['api.nove.team'],
    },
};

module.exports = nextConfig;
