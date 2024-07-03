import NAPI from '@util/helpers/NAPI';
import Sidebar from './Sidebar';
import LanguageHandler from '@util/handlers/LanguageHandler';
import React from 'react';
import o from './AccountLayout.module.sass';
import { cookies, headers } from 'next/headers';
import { Post } from '@util/helpers/Schema';
import { FETCH_OFFICIAL_BLOG } from '@util/CONSTS';
import Image from 'next/image';
import Link from 'next/link';

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const nav = await new LanguageHandler('modules/navigation', user).init(headers());
    const lang = await new LanguageHandler('dashboard/layout', user).init(headers());

    let blog: Post[] = [];
    if (FETCH_OFFICIAL_BLOG) blog = await api.blog().getPosts({ caching: true });

    return (
        <section className={o.account}>
            <Sidebar
                user={user}
                blog={blog}
                lang={{
                    header: lang.getProp('header'),
                    headerAdmin: lang.getProp('header-admin'),
                    overview: lang.getProp('ul-overview'),
                    oauth2: lang.getProp('ul-oauth2'),
                    security: lang.getProp('ul-security'),
                    profile: lang.getProp('ul-profile'),
                    language: lang.getProp('ul-language'),
                    users: lang.getProp('ul-users'),
                    posts: lang.getProp('ul-posts'),
                    logs: lang.getProp('ul-logs'),
                    latestNews: lang.getProp('latest-news'),
                    logout: lang.getCustomProp('modules.navigation.switcher-logout'),
                }}
            />

            {user && (
                <article className={o.dashboard}>
                    <aside className={o.topbar}>
                        <details className={o.profile}>
                            <summary>
                                <img src={user.avatar} width={28} height={28} alt="User's avatar" />
                            </summary>
                            <div className={o.options}>
                                <Link href="/account">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M 12 3 A 4 4 0 0 0 8 7 A 4 4 0 0 0 12 11 A 4 4 0 0 0 16 7 A 4 4 0 0 0 12 3 z M 12 14 C 8.996 14 3 15.508 3 18.5 L 3 20 C 3 20.552 3.448 21 4 21 L 20 21 C 20.552 21 21 20.552 21 20 L 21 18.5 C 21 15.508 15.004 14 12 14 z"></path>
                                    </svg>
                                    {nav.getProp('switcher-profile')}
                                </Link>
                                <Link href="/account/security">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M11.188,1.361l-7,3.111C3.465,4.793,3,5.509,3,6.3V11c0,7.83,6.439,11.486,9,12c2.561-0.514,9-4.17,9-12V6.3 c0-0.79-0.465-1.507-1.188-1.828l-7-3.111C12.295,1.131,11.705,1.131,11.188,1.361z M10.293,15.707l-2.77-2.77 c-0.39-0.39-0.39-1.024,0-1.414l0,0c0.39-0.39,1.024-0.39,1.414,0L11,13.586l5.085-5.085c0.39-0.39,1.024-0.39,1.414,0v0 c0.39,0.39,0.39,1.024,0,1.414l-5.792,5.792C11.317,16.097,10.683,16.097,10.293,15.707z"></path>
                                    </svg>
                                    {nav.getProp('switcher-security')}
                                </Link>
                                <a href="/logout">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M19.707,12.707 l-3.3,3.3C16.212,16.202,15.956,16.3,15.7,16.3s-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414L16.586,13H9 c-0.553,0-1-0.447-1-1s0.447-1,1-1h7.586l-1.593-1.593c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0l3.3,3.3 C20.098,11.684,20.098,12.316,19.707,12.707z"></path>
                                    </svg>
                                    {nav.getProp('switcher-logout')}
                                </a>
                            </div>
                        </details>
                        <Link className={o.title} href={`/account`}>
                            {user.username}
                        </Link>
                    </aside>
                    {children}
                </article>
            )}
        </section>
    );
}
