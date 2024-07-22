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
import NAPI from '@util/helpers/NAPI';
import LanguageHandler from '@util/handlers/LanguageHandler';
import Footer from './Footer';
import o from './Navigation.module.sass';
import pkg from '../package.json';
import { inter } from '@util/fonts/manager';
import { cookies, headers } from 'next/headers';
import { COOKIE_HOSTNAME, DONATE_LINK, ENABLE_REGISTER_PAGE, OFFICIAL_LANDING, SOURCE_CODE } from '@util/CONSTS';
import { redirect } from 'next/navigation';
import type { Metadata, Viewport } from 'next';

export const revalidate = 300;

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
    const user = await api.user().get({ caching: true });
    const nav = await new LanguageHandler('modules/navigation', user).init(headers());
    const foo = await new LanguageHandler('modules/footer', user).init(headers());

    const handleHideJs = async () => {
        'use server';
        cookies().set('hjs', 'true', {
            maxAge: 100 * 12 * 30 * 24 * 60 * 60,
            expires: 100 * 12 * 30 * 24 * 60 * 60 * 1000,
            domain: COOKIE_HOSTNAME,
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });
        redirect('');
    };

    return (
        <html lang="en">
            <body className={inter.className} style={inter.style}>
                <NextTopLoader color="#e74d5f" height={3} zIndex={9999999} showSpinner={false} />

                {!cookies().get('hjs')?.value && (
                    <noscript>
                        <form className={o.jsInfo} action={handleHideJs}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M 12 3.0292969 C 11.436813 3.0292969 10.873869 3.2917399 10.558594 3.8164062 L 1.7617188 18.451172 C 1.1134854 19.529186 1.94287 21 3.2011719 21 L 20.796875 21 C 22.054805 21 22.886515 19.529186 22.238281 18.451172 L 13.441406 3.8164062 C 13.126131 3.29174 12.563187 3.0292969 12 3.0292969 z M 12 5.2988281 L 20.236328 19 L 3.7636719 19 L 12 5.2988281 z M 11 9 L 11 14 L 13 14 L 13 9 L 11 9 z M 11 16 L 11 18 L 13 18 L 13 16 L 11 16 z"></path>
                            </svg>
                            {nav.getProp('no-javascript')}
                            <button type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M 19.28125 5.28125 L 9 15.5625 L 4.71875 11.28125 L 3.28125 12.71875 L 8.28125 17.71875 L 9 18.40625 L 9.71875 17.71875 L 20.71875 6.71875 Z"></path>
                                </svg>
                                {nav.getCustomProp('modules.actions.ok')}
                            </button>
                        </form>
                    </noscript>
                )}

                <Navigation
                    user={user}
                    registerPage={ENABLE_REGISTER_PAGE}
                    officialLanding={OFFICIAL_LANDING}
                    donateLink={DONATE_LINK}
                    lang={{
                        products: nav.getProp('ul-products'),
                        productsFiles: nav.getProp('products-files'),
                        productsCrm: nav.getProp('products-crm'),
                        productsPeekr: nav.getProp('products-peekr'),
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
                        license: foo.getProp('license', { license: pkg.license }),
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
