/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: ['./app', './sass'],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.nove.team',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'files-api.nove.team',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
