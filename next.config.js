/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: ['./app', './sass'],
    },
    images: {
        domains: ['api.nove.team', 'files-api.nove.team', 'f.nove.team'],
    }
};

module.exports = nextConfig;
