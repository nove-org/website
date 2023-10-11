import { axiosClient } from '@util/axios';
import Logo from '../Logo';
import o from '@sass/login.module.sass';
import Lines from '@app/login/Lines';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import RegisterForm from './Form';
import { Response, User } from '@util/schema';

export const metadata = {
    title: 'Nove | Register',
    openGraph: {
        title: 'Nove | Register',
        images: [],
    },
    twitter: {
        title: 'Nove | Register',
        images: [],
    },
    keywords: ['nove', 'nove register', 'about'],
};

export default async function Register({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
    const redirectBack: string | undefined = searchParams['redirectBack'];
    const user: Response<User> = (
        await axiosClient
            .get('/v1/users/me', {
                headers: { Authorization: `Owner ${cookies()?.get('napiAuthorizationToken')?.value}` },
            })
            .catch((e) => e.response)
    )?.data;

    if (user?.body?.data?.username) return redirect(redirectBack ? redirectBack : '/account');

    const lang = await new LanguageHandler('main/register', user?.body?.data).init(headers());

    return (
        <section className={o.box}>
            {!user ? <p className="error">{lang.getProp('servers-down')}</p> : null}
            <title>{`Nove | ${lang.getProp('title')}`}</title>
            <Logo size={48} />
            <h1>{lang.getProp('hero-h1')}</h1>
            <p>{lang.getProp('hero-p')}</p>
            <RegisterForm
                lang={{
                    inputEmail: lang.getProp('input-email'),
                    inputUsername: lang.getProp('input-username'),
                    inputPassword: lang.getProp('input-password'),
                    inputBtn: lang.getProp('input-btn'),
                }}
                searchParam={redirectBack}
            />
            <Lines />
        </section>
    );
}
