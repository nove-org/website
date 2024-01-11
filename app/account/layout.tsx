import Loader from '@app/Loader';
import o from '@sass/account/layout.module.sass';
import { axiosClient } from '@util/axios';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Response, User } from '@util/schema';
import LanguageHandler from '@util/handlers/LanguageHandler';
import Sidebar from './Sidebar';

export const metadata = {
    title: 'Nove | Account',
    description: "Log in to gain access to the dashboard. Register today if you haven't already.",
    openGraph: {
        title: 'Nove | Account',
        description: "Log in to gain access to the dashboard. Register today if you haven't already.",
        images: [],
    },
    twitter: {
        title: 'Nove | Account',
        description: "Log in to gain access to the dashboard. Register today if you haven't already.",
        images: [],
    },
    keywords: ['nove', 'nove account', 'account'],
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const user: Response<User> = (
        await axiosClient
            .get('/v1/users/me', {
                headers: { Authorization: `Owner ${cookies()?.get('napiAuthorizationToken')?.value}` },
            })
            .catch((e) => e.response)
    )?.data;
    const lang = await new LanguageHandler('dashboard/layout', user?.body?.data).init(headers());

    if (!cookies().get('napiAuthorizationToken')?.value) return redirect(`/login?redirectBack=/account`);

    if (!user || user?.body?.error?.code === 'invalid_authorization_token') return redirect('/login?redirectBack=/account');

    return user?.body?.data ? (
        <section className={o.box}>
            <aside>
                <h1>{lang.getProp('header')}</h1>
                <Sidebar
                    type="normal"
                    lang={{
                        overview: lang.getProp('ul-overview'),
                        security: lang.getProp('ul-security'),
                        language: lang.getProp('ul-language'),
                        profile: lang.getProp('ul-profile'),
                    }}
                />
                {user.body.data?.permissionLevel ? (
                    <>
                        <h1>{lang.getProp('header-admin')}</h1>
                        <Sidebar
                            type="admin"
                            lang={{
                                users: lang.getProp('ul-users'),
                                posts: lang.getProp('ul-posts'),
                                logs: lang.getProp('ul-logs'),
                            }}
                        />
                    </>
                ) : null}
            </aside>
            {children}
        </section>
    ) : (
        <section className={o.box}>
            <title>{`Nove | ${lang.getProp('title')}`}</title>
            <Loader
                type="hidden"
                text={
                    user?.body?.error?.code === 'verify_email'
                        ? lang.getCustomProp('modules.errors.verify-email')
                        : user?.body?.error?.message || lang.getCustomProp('modules.errors.offline')
                }
            />
        </section>
    );
}
