import { axiosClient } from '@util/axios';
import Logo from '../Logo';
import o from '@sass/login.module.sass';
import Lines from './Lines';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import LoginForm from './Form';

export const metadata = {
    title: 'Nove | Login',
    openGraph: {
        title: 'Nove | Login',
        images: [],
    },
    twitter: {
        title: 'Nove | Login',
        images: [],
    },
    keywords: ['nove', 'nove login', 'about'],
};

export default async function Login({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
    const redirectBack: string | undefined = searchParams['redirectBack'];
    const user = await axiosClient
        .get('/v1/users/me', {
            headers: { Authorization: `Owner ${cookies()?.get('napiAuthorizationToken')?.value}` },
        })
        .catch((e) => e.response);

    if (user?.data?.body?.data?.username) return redirect(redirectBack ? redirectBack : '/account');

    const browserLanguage: string | undefined = headers().get('Accept-Language')?.split(',')[0];
    const lang = await new LanguageHandler('main/login', user.data.body.data).init(browserLanguage);

    return (
        <section className={o.box}>
            <title>{`Nove | ${lang.getProp('title')}`}</title>
            <Logo size={48} />
            <h1>{lang.getProp('hero-h1')}</h1>
            <p>{lang.getProp('hero-p')}</p>
            <LoginForm
                lang={{
                    inputLogin: lang.getProp('input-login'),
                    inputPassword: lang.getProp('input-password'),
                    inputBtn: lang.getProp('input-btn'),
                }}
                searchParam={redirectBack}
            />
            <a className={o.passwordReset} href="/password-reset">
                {lang.getProp('password-reset')}
            </a>
            <Lines />
        </section>
    );
}
