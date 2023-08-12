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
import Navigation from '@app/Navigation';
import Footer from '@app/Footer';

export const metadata = {
    metadataBase: new URL('https://nove.team'),
    title: 'Meet the world where your privacy matters',
    description: 'Ditch Google, Facebook and other companies that sell data, profile and track you.',
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
    },
    category: 'technology',
    publisher: 'Nove Group',
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
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Live. Laugh. Nove.',
        description:
            'An unexpected focus on privacy with all standard features or even more. Surprising emphasis on data security. Enjoy everything for free and open-source to everyone.',
    },
    authors: { name: 'Nove Group', url: 'https://nove.team' },
    keywords: ['nove', 'vave', 'vave bot', 'nove team', 'nove group'],
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: '/logo.png',
        shortcut: '/logo.png',
        apple: '/logo.png',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Navigation />

                <main>{children}</main>

                <Footer />
            </body>
        </html>
    );
}
