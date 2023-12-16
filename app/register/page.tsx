import { axiosClient } from '@util/axios';
import Logo from '../Logo';
import o from '@sass/login.module.sass';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import RegisterForm from './Form';
import { Response, User } from '@util/schema';
import { DOMAIN_REGEX } from '@util/CONSTS';

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

    const lang = await new LanguageHandler('main/register', user?.body?.data).init(headers());

    return (
        <section className={o.box}>
            <title>{`Nove | ${lang.getCustomProp('modules.navigation.register-btn')}`}</title>
            <div className={o.content}>
                {!user ? <p className="error">{lang.getCustomProp('modules.errors.p-offline')}</p> : null}
                <Logo size={48} />
                <h1>{lang.getProp('hero-h1')}</h1>
                <p>{lang.getProp('hero-p')}</p>
                <RegisterForm
                    lang={{
                        inputEmail: lang.getProp('input-email'),
                        inputUsername: lang.getProp('input-username'),
                        inputPassword: lang.getProp('input-password'),
                        inputBtn: lang.getCustomProp('modules.actions.proceed'),
                    }}
                    searchParam={redirectBack}
                />
            </div>
        </section>
    );
}
