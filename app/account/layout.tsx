import Link from 'next/link';
import Loader from '@app/Loader';
import o from '@sass/account/layout.module.sass';
import { axiosClient } from '@util/axios';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Response, User } from '@util/schema';
import LanguageHandler from '@util/handlers/LanguageHandler';

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
    const sidebar = [
        { label: lang.getProp('ul-overview'), path: '/account/', target: null },
        { label: lang.getProp('ul-security'), path: '/account/security', target: 'security' },
        { label: lang.getProp('ul-profile'), path: '/account/profile', target: 'profile' },
        { label: lang.getProp('ul-language'), path: '/account/language', target: 'language' },
    ];

    if (!cookies().get('napiAuthorizationToken')?.value) return redirect(`/login?redirectBack=/account`);

    if (!user || user.body.error?.code === 'invalid_authorization_token') return redirect('/login?redirectBack=/account');

    return user.body.data ? (
        <section className={o.box}>
            <aside>
                <h1>{lang.getProp('header')}</h1>
                <ul>
                    {sidebar.map((list) => (
                        <li key={list.target}>
                            <Link href={list.path}>
                                {list.target === 'language' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M 12 2 C 8.741068 2 5.8486894 3.5773875 4.0214844 6 L 4 6 L 4 6.0273438 C 2.7499527 7.6966931 2 9.7603852 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 15 4.5839844 C 17.935098 5.7673596 20 8.6326468 20 12 C 20 14.087831 19.200587 15.978318 17.898438 17.400391 C 17.642583 16.590687 16.894567 16 16 16 C 15.448 16 15 15.552 15 15 L 15 13 C 15 12.448 14.552 12 14 12 L 10 12 C 9.448 12 9 11.552 9 11 C 9 10.448 9.448 10 10 10 C 10.552 10 11 9.552 11 9 L 11 8 C 11 7.448 11.448 7 12 7 L 13 7 C 14.105 7 15 6.105 15 5 L 15 4.5839844 z M 4.2070312 10.207031 L 9 15 L 9 16 C 9 17.105 9.895 18 11 18 L 11 19.931641 C 7.0457719 19.441154 4 16.090654 4 12 C 4 11.382188 4.0755242 10.784034 4.2070312 10.207031 z"></path>
                                    </svg>
                                ) : list.target === 'security' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M11.188,1.361l-7,3.111C3.465,4.793,3,5.509,3,6.3V11c0,7.83,6.439,11.486,9,12c2.561-0.514,9-4.17,9-12V6.3 c0-0.79-0.465-1.507-1.188-1.828l-7-3.111C12.295,1.131,11.705,1.131,11.188,1.361z M10.293,15.707l-2.77-2.77 c-0.39-0.39-0.39-1.024,0-1.414l0,0c0.39-0.39,1.024-0.39,1.414,0L11,13.586l5.085-5.085c0.39-0.39,1.024-0.39,1.414,0v0 c0.39,0.39,0.39,1.024,0,1.414l-5.792,5.792C11.317,16.097,10.683,16.097,10.293,15.707z"></path>
                                    </svg>
                                ) : list.target === 'personal' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M12,2C6.477,2,2,6.477,2,12c0,5.523,4.477,10,10,10s10-4.477,10-10C22,6.477,17.523,2,12,2z M15.5,8 C16.33,8,17,8.67,17,9.5c0,0.83-0.67,1.5-1.5,1.5S14,10.33,14,9.5C14,8.67,14.67,8,15.5,8z M8.5,8C9.33,8,10,8.67,10,9.5 c0,0.83-0.67,1.5-1.5,1.5S7,10.33,7,9.5C7,8.67,7.67,8,8.5,8z M12,17.5c-2.032,0-3.798-1.11-4.747-2.747 C7.06,14.42,7.308,14,7.692,14h8.615c0.385,0,0.632,0.42,0.439,0.753C15.798,16.39,14.032,17.5,12,17.5z"></path>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 30 30">
                                        <path
                                            fill="currentColor"
                                            d="M 5 3 C 3.895 3 3 3.895 3 5 L 3 25 C 3 26.105 3.895 27 5 27 L 19 27 C 20.105 27 21 26.105 21 25 L 21 5 C 21 3.895 20.105 3 19 3 L 5 3 z M 22.757812 3.6777344 C 22.904812 4.0937344 23 4.534 23 5 L 23 25 C 23 26.103 22.551172 27.104125 21.826172 27.828125 L 22.566406 27.945312 C 23.657406 28.117313 24.682469 27.37225 24.855469 26.28125 L 27.974609 6.5273438 C 28.147609 5.4363437 27.4035 4.4102813 26.3125 4.2382812 L 22.757812 3.6777344 z M 12 8 C 12.206 8 12.387875 8.0765937 12.546875 8.1835938 L 12.59375 8.1953125 C 14.36875 9.6403125 18 13.221 18 15.5 C 18 17.433 16.433 19 14.5 19 C 13.693 19 12.960141 18.714859 12.369141 18.255859 C 12.883141 19.626859 13.6935 20.471156 14.6875 21.035156 L 14.6875 21.037109 C 14.8705 21.111109 15 21.29 15 21.5 C 15 21.776 14.776 22 14.5 22 L 12 22 L 9.5 22 C 9.224 22 9 21.776 9 21.5 C 9 21.29 9.1295 21.111109 9.3125 21.037109 L 9.3125 21.035156 C 10.3065 20.472156 11.116859 19.626859 11.630859 18.255859 C 11.039859 18.714859 10.307 19 9.5 19 C 7.567 19 6 17.433 6 15.5 C 6 13.221 9.63125 9.6403125 11.40625 8.1953125 L 11.453125 8.1835938 C 11.612125 8.0765937 11.794 8 12 8 z"></path>
                                    </svg>
                                )}
                                {list.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                {user.body.data?.permissionLevel ? (
                    <>
                        <h1>Moderation</h1>
                        <ul>
                            <li>
                                <Link href="/account/admin/users">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M 4 4 C 2.9 4 2 4.9 2 6 L 2 18 C 2 19.1 2.9 20 4 20 L 11.294922 20 C 11.105922 19.366 11 18.695 11 18 C 11 14.134 14.134 11 18 11 C 19.488 11 20.866 11.467766 22 12.259766 L 22 8 C 22 6.9 21.1 6 20 6 L 12 6 L 10 4 L 4 4 z M 18 13 C 15.2 13 13 15.2 13 18 C 13 20.8 15.2 23 18 23 C 19 23 20.000781 22.699219 20.800781 22.199219 L 22.599609 24 L 24 22.599609 L 22.199219 20.800781 C 22.699219 20.000781 23 19 23 18 C 23 15.2 20.8 13 18 13 z M 18 15 C 19.7 15 21 16.3 21 18 C 21 19.7 19.7 21 18 21 C 16.3 21 15 19.7 15 18 C 15 16.3 16.3 15 18 15 z"></path>
                                    </svg>
                                    Users
                                </Link>
                            </li>
                            <li>
                                <Link href="/account/admin/posts">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M 4 4 C 3.07 4 2.2923125 4.6429063 2.0703125 5.5039062 L 12 11.726562 L 21.935547 5.5214844 C 21.719547 4.6504844 20.937 4 20 4 L 4 4 z M 2 7.734375 L 2 18 C 2 19.103 2.897 20 4 20 L 20 20 C 21.103 20 22 19.103 22 18 L 22 7.7558594 L 12 14 L 2 7.734375 z"></path>
                                    </svg>
                                    Posts
                                </Link>
                            </li>
                            <li>
                                <Link href="/account/admin/logs">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M 6 3 C 3.8027056 3 2 4.8027056 2 7 C 2 8.8503017 3.2842135 10.405592 5 10.855469 L 5 21 L 10 21 L 10 19 L 7 19 L 7 17 L 9 17 L 9 15 L 7 15 L 7 10.855469 C 8.7157865 10.405592 10 8.8503017 10 7 C 10 4.8027056 8.1972944 3 6 3 z M 6 5 C 7.1164141 5 8 5.8835859 8 7 C 8 8.1164141 7.1164141 9 6 9 C 4.8835859 9 4 8.1164141 4 7 C 4 5.8835859 4.8835859 5 6 5 z M 12 6 L 12 11 L 22 11 L 22 6 L 12 6 z M 12 13 L 12 18 L 22 18 L 22 13 L 12 13 z"></path>
                                    </svg>
                                    Audit log
                                </Link>
                            </li>
                        </ul>
                    </>
                ) : null}
            </aside>
            {children}
        </section>
    ) : (
        <section className={o.box}>
            <title>{`Nove | ${lang.getProp('title')}`}</title>
            <Loader type="hidden" text={user.body.error?.code === 'verify_email' ? lang.getProp('verify-email') : user.body.error?.message || lang.getProp('api-down')} />
        </section>
    );
}
