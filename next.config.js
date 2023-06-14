/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    sassOptions: {
        includePaths: ['./app', './sass'],
    },
    images: {
        domains: ['api.nove.team', 'files-api.nove.team', 'f.nove.team'],
    },
};

module.exports = nextConfig;
