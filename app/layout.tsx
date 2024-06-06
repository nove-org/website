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

import './globals.sass';
import NextTopLoader from 'nextjs-toploader';
import { inter } from '@util/fonts/manager';
import type { Metadata, Viewport } from 'next';
import Navigation from './Navigation';

export const revalidate = 60;

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
};

export const metadata: Metadata = {
    metadataBase: new URL('https://nove.team'),
    category: 'technology',
    publisher: 'Nove Group',
    openGraph: {
        locale: 'en_US',
        url: 'https://nove.team/',
        siteName: 'nove.team',
        authors: ['Nove Group', 'Contributors'],
    },
    authors: [{ name: 'Nove Group', url: 'https://nove.team' }],
    keywords: ['nove', 'nove team', 'nove group'],
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: '/logo.png',
        apple: '/logo.png',
    },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className} style={inter.style}>
                <NextTopLoader color="#e74d5f" height={3} zIndex={999999} showSpinner={false} />
                <main style={inter.style}>
                    <Navigation />

                    {children}
                </main>
            </body>
        </html>
    );
}
