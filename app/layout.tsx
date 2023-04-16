import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

import '~/globals.sass';

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
                <Script id="border-nav" strategy="afterInteractive">
                    {`const el = document.querySelector(".navBox");
                    const observer = new IntersectionObserver(([e]) => e.target.classList.toggle("is-pinned", e.intersectionRatio < 1), { threshold: [1] });
                    observer.observe(el);`}
                </Script>
                <nav className="navBox">
                    <div className="container">
                        <Link href="/">
                            <header>
                                <Image src="/cdn/assets/logo.png" width={32} height={32} alt="Logo grayscale" />
                                <h1>Nove</h1>
                            </header>
                        </Link>
                        <ul>
                            <li>
                                <Link href="/">Projects</Link>
                            </li>
                            <li>
                                <Link href="/">Docs</Link>
                            </li>
                            <li>
                                <Link href="/">About</Link>
                            </li>
                            <li>
                                <Link href="/">GitHub</Link>
                            </li>
                            <li>
                                <Link href="/">Changelog</Link>
                            </li>
                            <li>
                                <Link href="/">Open source</Link>
                            </li>
                            <li>
                                <Link href="/">Legal</Link>
                            </li>
                        </ul>
                        <ul>
                            <li className="login">
                                <Link href="/">Login</Link>
                            </li>
                            <li className="button">
                                <Link href="/">Sign up</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                {children}

                <footer className="footerBox">
                    <div className="container">
                        <aside>
                            <header>
                                <div className="card">
                                    <Image src="/cdn/assets/logo.png" width={32} height={32} alt="Logo grayscale" />
                                    <h1>Nove</h1>
                                </div>
                                <p>&copy; 2020-{new Date().getFullYear()} Nove Group.</p>
                            </header>
                        </aside>
                        <section className="content">
                            <div className="card">
                                <header>Product</header>
                                <ul>
                                    <li>
                                        <Link href="/">Changelog</Link>
                                    </li>
                                    <li>
                                        <a href="https://beta.cheems.dog">Cheems</a>
                                    </li>
                                    <li>
                                        <Link href="/">Docs</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Developers</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="card">
                                <header>Company</header>
                                <ul>
                                    <li>
                                        <Link href="/">About</Link>
                                    </li>
                                    <li>
                                        <a href="https://github.com/orgs/nove-org/discussions">Community</a>
                                    </li>
                                    <li>
                                        <Link href="/">Open source</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Privacy Policy</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Terms of Service</Link>
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
