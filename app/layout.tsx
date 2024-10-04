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
import Navigation from './Navigation';
import NextTopLoader from 'nextjs-toploader';
import NAPI from '@util/NAPI';
import LanguageHandler from '@util/languages';
import Footer from './Footer';
import o from './Navigation.module.sass';
import pkg from '../package.json';
import { inter } from '@util/fonts/manager';
import { cookies, headers } from 'next/headers';
import { COOKIE_HOSTNAME, SOURCE_CODE } from '@util/CONSTS';
import { redirect } from 'next/navigation';
import type { Metadata, Viewport } from 'next';

export const revalidate = 0;

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
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: false });
    const nav = await new LanguageHandler('modules/navigation', user).init(headers());
    const foo = await new LanguageHandler('modules/footer', user).init(headers());

    return (
        <html lang="en">
            <body className={inter.className} style={inter.style}>
                <NextTopLoader color="#e74d5f" height={3} zIndex={9999999} showSpinner={false} />

                <Navigation
                    user={user}
                    lang={{
                        applications: nav.getProp('ul-applications'),
                        about: nav.getProp('ul-about'),
                        blog: nav.getProp('ul-blog'),
                        donate: nav.getProp('ul-donate'),
                        login: nav.getProp('login-btn'),
                        register: nav.getProp('register-btn'),
                        profile: nav.getProp('switcher-profile'),
                        security: nav.getProp('switcher-security'),
                        logout: nav.getProp('switcher-logout'),
                    }}
                />

                <main style={inter.style}>{children}</main>

                <Footer
                    lang={{
                        sourceLicense: foo.getProp('source-license', {
                            license: `<a href="https://www.gnu.org/licenses/agpl-3.0.html" rel="noreferrer noopener nofollow">${pkg.license}</a>`,
                        }),
                        contentLicense: foo.getProp('content-license', {
                            license: '<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" rel="noreferrer noopener nofollow">CC BY-NC-SA 4.0</a>',
                        }),
                        madeWithLove: foo.getProp('made-with-love', {
                            contributors: `<a href="${SOURCE_CODE}" rel="noreferrer noopener nofollow">${foo.getProp('contributors')}</a>`,
                        }),
                        general: foo.getProp('ul-general'),
                        about: nav.getProp('ul-about'),
                        blog: nav.getProp('ul-blog'),
                        donate: nav.getProp('ul-donate'),
                        login: nav.getProp('login-btn'),
                        support: foo.getProp('ul-support'),
                        documents: foo.getProp('ul-documents'),
                        src: foo.getProp('ul-src'),
                        privacy: foo.getProp('ul-privacy'),
                        terms: foo.getProp('ul-terms'),
                        docs: foo.getProp('ul-docs'),
                    }}
                />
            </body>
        </html>
    );
}
