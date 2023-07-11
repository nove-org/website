/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: ['./app', './sass'],
    },
    images: {
        domains: ['api.nove.team'],
    }
};

module.exports = nextConfig;
