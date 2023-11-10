/* 
 Tool to manage your Nove account through NAPI
 Copyright (C) 2019 Nove Group

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import '@sass/globals.sass';
import localFont from 'next/font/local';
import Navigation from '@app/Navigation';
import Footer from '@app/Footer';
import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

export const metadata: Metadata = {
    metadataBase: new URL('https://nove.team'),
    title: 'Nove | Meet the world where your privacy matters',
    description: 'Ditch the government, Google, Facebook and others that share data, profile and track you. Take back control over this.',
    category: 'technology',
    publisher: 'Nove Group',
    alternates: {
        canonical: '/',
    },
    openGraph: {
        locale: 'en_US',
        url: 'https://nove.team/',
        siteName: 'nove.team',
        title: 'Nove | Meet the world where your privacy matters',
        description: 'Ditch the government, Google, Facebook and others that share data, profile and track you. Take back control over this.',
        authors: ['Nove Group', 'Contributors'],
        images: [
            {
                url: '/banner.png',
                alt: 'Campaign banner filled with text from title and description. "your privacy" highlighted in brand color (gradient pink-red).',
                width: 860,
                height: 470,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Nove | Meet the world where your privacy matters',
        description: 'Ditch the government, Google, Facebook and others that share data, profile and track you. Take back control over this.',
        images: [
            {
                url: '/banner.png',
                alt: 'Campaign banner filled with text from title and description. "your privacy" highlighted in brand color (gradient pink-red).',
                width: 860,
                height: 470,
            },
        ],
    },
    authors: [{ name: 'Nove Group', url: 'https://nove.team' }],
    keywords: ['nove', 'vave', 'vave bot', 'nove team', 'nove group'],
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: '/logo.png',
        shortcut: '/banner.png',
        apple: '/logo.png',
    },
};

const inter = localFont({
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className} style={inter.style}>
                <Navigation />

                <main style={inter.style}>{children}</main>

                <Footer />
            </body>
        </html>
    );
}
