import localFont from 'next/font/local';

export const inter = localFont({
    src: [
        {
            path: './fonts/thin.woff2',
            weight: '100',
            style: 'normal',
        },
        {
            path: './fonts/extralight.woff2',
            weight: '200',
            style: 'normal',
        },
        {
            path: './fonts/light.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: './fonts/regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: './fonts/semibold.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: './fonts/bold.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: './fonts/extrabold.woff2',
            weight: '800',
            style: 'normal',
        },
        {
            path: './fonts/black.woff2',
            weight: '900',
            style: 'normal',
        },
    ],
});
