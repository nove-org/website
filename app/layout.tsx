import '~/globals.sass';

import Navigation from '@/navigation';
import Footer from '@/footer';
import CookiePrompt from '@/cookiePrompt';

export const metadata = {
    metadataBase: new URL('https://nove.team'),
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
    },
    title: 'Live. Laugh. Nove.',
    description:
        'An unexpected focus on privacy with all standard features or even more. Surprising emphasis on data security. Enjoy everything for free and open-source to everyone.',
    category: 'technology',
    assets: ['https://nove.team/cdn/assets'],
    colorScheme: 'dark',
    publisher: 'Nove Group',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    alternates: {
        canonical: '/',
    },
    openGraph: {
        locale: 'en_US',
        url: 'https://nove.team/',
        siteName: 'nove.team',
        title: 'Live. Laugh. Nove.',
        description:
            'An unexpected focus on privacy with all standard features or even more. Surprising emphasis on data security. Enjoy everything for free and open-source to everyone.',
        authors: ['Nove Group'],
        images: [
            {
                url: '/cdn/assets/banner.png',
                alt: 'Live. Laugh. Nove campaign banner',
                width: 1920,
                height: 1080,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Live. Laugh. Nove.',
        description:
            'An unexpected focus on privacy with all standard features or even more. Surprising emphasis on data security. Enjoy everything for free and open-source to everyone.',
        images: [
            {
                url: 'https://nove.team/cdn/assets/banner.png',
                alt: 'Live. Laugh. Nove campaign banner',
                width: 1920,
                height: 1080,
            },
        ],
    },
    authors: { name: 'Nove Group', url: 'https://nove.team' },
    keywords: ['nove', 'vave', 'vave bot', 'nove team', 'nove group'],
    robots: {
        index: true,
        follow: true,
    },
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#f2f3f5' },
        { media: '(prefers-color-scheme: dark)', color: '#2b2d31' },
    ],
    icons: {
        icon: 'https://nove.team/cdn/assets/logo.png',
        shortcut: 'https://nove.team/cdn/assets/banner.png',
        apple: 'https://nove.team/cdn/assets/logo.png',
        other: {
            rel: 'apple-touch-icon-precomposed',
            url: 'https://nove.team/cdn/assets/logo.png',
        },
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <CookiePrompt />

                <Navigation />

                {children}

                <Footer />
            </body>
        </html>
    );
}
