import NAPI from '@util/helpers/NAPI';
import Sidebar from './Sidebar';
import LanguageHandler from '@util/handlers/LanguageHandler';
import React from 'react';
import o from './AccountLayout.module.sass';
import { cookies, headers } from 'next/headers';

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const blog = await api.blog().getPosts({ caching: true });
    const user = await api.user().get({ caching: true });
    const lang = await new LanguageHandler('dashboard/main', user).init(headers());

    return (
        user && (
            <section className={o.account}>
                <Sidebar user={user} blog={blog} />
                {children}
            </section>
        )
    );
}
