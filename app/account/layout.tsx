export const dynamic = 'force-dynamic';
import Loader from '@app/Loader';
import o from '@sass/account/layout.module.sass';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Response, User } from '@util/schema';
import LanguageHandler from '@util/handlers/LanguageHandler';
import Sidebar from './Sidebar';
import { getUser } from '@util/helpers/User';
import { AxiosError } from 'axios';

export async function generateMetadata() {
    const lang = await new LanguageHandler('dashboard/layout', await getUser()).init(headers());
    const title: string = `${lang.getProp('ul-profile')} | Nove`;
    const description: string = "Log in to gain access to the dashboard. Register today if you haven't already.";

    return {
        title,
        description,
        openGraph: { title, description },
        twitter: { title, description },
    };
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const user = await getUser().catch((err: AxiosError) => {
        if ((err.response?.data as Response<null>).body.error.code !== 'verify_email') redirect('/login?redirectBack=/account');
        else return undefined;
    });
    const lang = await new LanguageHandler('dashboard/layout', user).init(headers());

    if (!cookies().get('napiAuthorizationToken')?.value || !user) return redirect(`/login?redirectBack=/account`);

    return user ? (
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
                {user.permissionLevel ? (
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
            <Loader type="hidden" text={lang.getCustomProp('modules.errors.verify-email')} />
        </section>
    );
}
