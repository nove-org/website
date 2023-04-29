import '~/globals.sass';

import Image from 'next/image';
import Link from 'next/link';
import Navigation from './navigation';

export const metadata = {
    metadataBase: new URL('https://nove.team'),
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
    },
    title: 'Live. Laugh. Nove.',
    description: 'An unexpected focus on privacy with all standard features or even more. Surprising emphasis on data security. Enjoy everything for free and open-source to everyone.',
    category: 'technology',
    assets: ['/cdn/assets'],
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
        description: 'An unexpected focus on privacy with all standard features or even more. Surprising emphasis on data security. Enjoy everything for free and open-source to everyone.',
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
        description: 'An unexpected focus on privacy with all standard features or even more. Surprising emphasis on data security. Enjoy everything for free and open-source to everyone.',
        images: [
            {
                url: '/cdn/assets/banner.png',
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
        icon: '/cdn/assets/logo.png',
        shortcut: '//cdn/assets/banner.png',
        apple: '//cdn/assets/logo.png',
        other: {
            rel: 'apple-touch-icon-precomposed',
            url: '//cdn/assets/logo.png',
        },
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Navigation />

                {children}

                <footer className="footerBox">
                    <div className="container">
                        <aside>
                            <header>
                                <div className="card">
                                    <Image src="/cdn/assets/watermark.png" width={22} height={22} alt="Logo grayscale" />
                                    <h1>Nove</h1>
                                </div>
                                <p>&copy; 2019-{new Date().getFullYear()} Nove Group.</p>
                            </header>
                        </aside>
                        <section className="content">
                            <div className="card">
                                <header>Product</header>
                                <ul>
                                    <li>
                                        <Link href="/login">Login</Link>
                                    </li>
                                    <li>
                                        <a href="https://beta.cheems.dog" target="_blank">
                                            Cheems
                                        </a>
                                    </li>
                                    <li>
                                        <Link href="/docs">Docs</Link>
                                    </li>
                                    <li>
                                        <Link href="/account/developers">Developers</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="card">
                                <header>Company</header>
                                <ul>
                                    <li>
                                        <Link href="/about">About</Link>
                                    </li>
                                    <li>
                                        <a href="https://github.com/orgs/nove-org/discussions" target="_blank">
                                            Community
                                        </a>
                                    </li>
                                    <li>
                                        <Link href="/open-source">Open source</Link>
                                    </li>
                                    <li>
                                        <Link href="/privacy">Privacy Policy</Link>
                                    </li>
                                    <li>
                                        <Link href="/terms">Terms of Service</Link>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </div>
                </footer>
            </body>
        </html>
    );
}
