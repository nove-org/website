'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import Link from 'next/link';

import o from '~/docs/page.module.sass';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    const active = useSelectedLayoutSegment();

    const sidebar = [
        { label: 'Getting started', description: 'All the requirements, important notes and the getting started itself', path: '/docs/', target: null },
        { label: 'Hello, World', description: 'As it says, Hello World. For testing purposes.', path: '/docs/hello-world', target: 'hello-world' },
    ];

    return (
        <main>
            <title>Documentation — Nove</title>
            <section className={o.docs}>
                <h1>Documentation</h1>
                <div className={o.container}>
                    <aside>
                        <label htmlFor="search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                                <path
                                    fill="currentColor"
                                    d="M 10.5 1 C 8.019531 1 6 3.019531 6 5.5 C 6 6.558594 6.382813 7.523438 7 8.292969 L 2.023438 13.269531 L 2.726563 13.980469 L 7.707031 9 C 8.476563 9.617188 9.441406 10 10.5 10 C 12.980469 10 15 7.980469 15 5.5 C 15 3.019531 12.980469 1 10.5 1 Z M 10.5 2 C 12.4375 2 14 3.5625 14 5.5 C 14 7.4375 12.4375 9 10.5 9 C 8.5625 9 7 7.4375 7 5.5 C 7 3.5625 8.5625 2 10.5 2 Z"></path>
                            </svg>
                            <input type="text" id="search" placeholder="Search documentation..." />
                        </label>
                        <ul>
                            {sidebar.map((list) => (
                                <Link key={list.target} href={list.path}>
                                    <li className={active === list.target ? o.active : ''}>
                                        <h1>{list.label}</h1>
                                        <p>{list.description}</p>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </aside>
                    {children}
                </div>
            </section>
        </main>
    );
}
