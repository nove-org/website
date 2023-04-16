/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    sassOptions: {
        includePaths: ['./app', './sass'],
    },
    images: {
        domains: ['api.nove.team', 'api.cheems.dog'],
    },
};

module.exports = nextConfig;
