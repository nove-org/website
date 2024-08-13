import localFont from 'next/font/local';

export const inter = localFont({
    src: [
        {
            path: './thin.woff2',
            weight: '100',
            style: 'normal',
        },
        {
            path: './extralight.woff2',
            weight: '200',
            style: 'normal',
        },
        {
            path: './light.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: './regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: './medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: './semibold.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: './bold.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: './extrabold.woff2',
            weight: '800',
            style: 'normal',
        },
        {
            path: './black.woff2',
            weight: '900',
            style: 'normal',
        },
    ],
});
