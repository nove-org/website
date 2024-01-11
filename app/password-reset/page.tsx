export const dynamic = 'force-dynamic';
import Logo from '../Logo';
import o from '@sass/login.module.sass';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import ResetForm from './Form';
import { getUser } from '@util/helpers/User';

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
    const user = await getUser();
    if (user?.username) return redirect('/account');
    const lang = await new LanguageHandler('main/password-reset', user).init(headers());

    return (
        <section className={o.box}>
            <title>{`Nove | ${lang.getProp('hero-h1')}`}</title>
            <div className={o.content}>
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
            </div>
        </section>
    );
}
