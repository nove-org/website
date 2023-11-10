import { axiosClient } from '@util/axios';
import Logo from '../Logo';
import o from '@sass/login.module.sass';
import Lines from '@app/login/Lines';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { User, Response } from '@util/schema';
import ResetForm from './Form';

export const metadata = {
    title: 'Nove | Reset your password',
    openGraph: {
        title: 'Nove | Reset your password',
        images: [],
    },
    twitter: {
        title: 'Nove | Reset your password',
        images: [],
    },
    keywords: ['nove', 'nove password reset', 'about'],
};

export default async function PasswordReset() {
    const user: Response<User> = (
        await axiosClient
            .get('/v1/users/me', {
                headers: { Authorization: `Owner ${cookies()?.get('napiAuthorizationToken')?.value}` },
            })
            .catch((e) => e.response)
    )?.data;

    if (user?.body?.data?.username) return redirect('/account');

    const lang = await new LanguageHandler('main/password-reset', user?.body?.data).init(headers());

    return (
        <section className={o.box}>
            <title>{`Nove | ${lang.getProp('hero-h1')}`}</title>
            <Logo size={48} />
            <h1>{lang.getProp('hero-h1')}</h1>
            <p>{lang.getProp('hero-p')}</p>
            <ResetForm
                lang={{
                    inputBtn: lang.getCustomProp('modules.actions.proceed'),
                    inputEmail: lang.getProp('input-email'),
                    inputNewPassword: lang.getProp('input-new-password'),
                    success: lang.getProp('request-success'),
                }}
            />
            <Lines />
        </section>
    );
}
