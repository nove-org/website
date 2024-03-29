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
import { usePathname } from 'next/navigation';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { headers } from 'next/headers';
import NextTopLoader from 'nextjs-toploader';

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
    const lang = await new LanguageHandler('modules/footer', user).init(headers());

    return (
        <html lang="en">
            <body className={inter.className} style={inter.style}>
                <NextTopLoader color="#e74d5f" height={3} zIndex={999999} showSpinner={false} />
                <Navigation user={user} />

                <main style={inter.style}>{children}</main>

                <Footer
                    lang={{
                        license: lang.getProp('license'),
                        made_with: lang.getProp('made-with-love'),
                        contributors: lang.getProp('contributors'),
                        about: lang.getProp('ul-about'),
                        blog: lang.getProp('ul-blog'),
                        docs: lang.getProp('ul-docs'),
                        donate: lang.getProp('ul-donate'),
                        login: lang.getProp('ul-login'),
                        register: lang.getProp('ul-register'),
                        support: lang.getProp('ul-support'),
                        src: lang.getProp('ul-src'),
                        privacy: lang.getProp('ul-privacy'),
                        terms: lang.getProp('ul-terms'),
                        developers: lang.getProp('ul-developers'),
                    }}
                />
            </body>
        </html>
    );
}
