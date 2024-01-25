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

export const dynamic = 'force-dynamic';
import '@sass/globals.sass';
import Navigation from '@app/Navigation';
import Footer from '@app/Footer';
import type { Metadata, Viewport } from 'next';
import { inter } from '@util/fonts';
import { getUser } from '@util/helpers/User';

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const user = await getUser();

    return (
        <html lang="en">
            <body className={inter.className} style={inter.style}>
                <Navigation user={user} />

                <main style={inter.style}>{children}</main>

                <Footer user={user} />
            </body>
        </html>
    );
}
