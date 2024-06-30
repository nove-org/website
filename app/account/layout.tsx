import NAPI from '@util/helpers/NAPI';
import Sidebar from './Sidebar';
import LanguageHandler from '@util/handlers/LanguageHandler';
import React from 'react';
import o from './AccountLayout.module.sass';
import { cookies, headers } from 'next/headers';
import { Post } from '@util/helpers/Schema';
import { FETCH_OFFICIAL_BLOG } from '@util/CONSTS';

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
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
            {user ? children : null}
        </section>
    );
}
