import { axiosClient } from '@util/axios';
import Logo from '../Logo';
import o from '@sass/login.module.sass';
import Lines from './Lines';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import LoginForm from './Form';
import { Response, User } from '@util/schema';
import { DOMAIN_REGEX } from '@util/CONSTS';

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
    let redirectBack: string | undefined = searchParams['redirectBack'];
    if (!redirectBack?.match(/^(?!(\/\/)).*$/g) || !redirectBack?.match(DOMAIN_REGEX)) redirectBack = '/account';
    const user: Response<User> = (
        await axiosClient
            .get('/v1/users/me', {
                headers: { Authorization: `Owner ${cookies()?.get('napiAuthorizationToken')?.value}` },
            })
            .catch((e) => e.response)
    )?.data;

    if (user?.body?.data?.username) return redirect(redirectBack ? redirectBack : '/account');

    const lang = await new LanguageHandler('main/login', user?.body?.data).init(headers());

    return (
        <section className={o.box}>
            {!user ? <p className="error">{lang.getCustomProp('modules.errors.p-offline')}</p> : null}
            <title>{`Nove | ${lang.getCustomProp('modules.navigation.login-btn')}`}</title>
            <Logo size={48} />
            <h1>{lang.getProp('hero-h1')}</h1>
            <p>{lang.getProp('hero-p')}</p>
            <LoginForm
                lang={{
                    inputLogin: lang.getProp('input-login'),
                    inputPassword: lang.getProp('input-password'),
                    inputBtn: lang.getCustomProp('modules.actions.proceed'),
                    mfaTitle: lang.getProp('mfa-h1'),
                    mfaDescription: lang.getProp('mfa-p'),
                    mfaLabel: lang.getProp('mfa-label'),
                    mfaCancel: lang.getCustomProp('modules.actions.cancel'),
                    mfaSubmit: lang.getCustomProp('modules.navigation.login-btn'),
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
