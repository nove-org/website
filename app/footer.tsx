'use client';

import Image from 'next/image';
import Link from 'next/link';

import o from '~/footer.module.sass';

export default function Footer() {
    return (
        <footer className={o.box}>
            <div className={o.container}>
                <aside>
                    <header>
                        <div className={o.card}>
                            <Image src="/cdn/assets/watermark.png" width={22} height={22} alt="Logo grayscale" />
                            <h1>Nove</h1>
                        </div>
                        <p>&copy; 2019-{new Date().getFullYear()} Nove Group.</p>
                    </header>
                </aside>
                <section className={o.content}>
                    <div className={o.card}>
                        <header>Product</header>
                        <ul>
                            <li>
                                <Link href="/login">Login</Link>
                            </li>
                            <li>
                                <Link href="/docs">Docs</Link>
                            </li>
                            <li>
                                <Link href="/account/developers">Developers</Link>
                            </li>
                            <li>
                                <Link href="/privacy">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href="/terms">Terms of Service</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={o.card}>
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
                        </ul>
                    </div>
                </section>
            </div>
        </footer>
    );
}
