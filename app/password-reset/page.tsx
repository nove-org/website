export const dynamic = 'force-dynamic';
import Logo from '../Logo';
import o from '@sass/login.module.sass';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import ResetForm from './Form';
import { getUser } from '@util/helpers/User';

export async function generateMetadata() {
    const lang = await new LanguageHandler('main/password-reset', await getUser()).init(headers());
    const title: string = `${lang.getProp('hero-h1')} | Nove`;

    return {
        title,
        openGraph: { title },
        twitter: { title },
    };
}

export default async function PasswordReset() {
    const user = await getUser();
    if (user?.username) return redirect('/account');
    const lang = await new LanguageHandler('main/password-reset', user).init(headers());

    return (
        <section className={o.box}>
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
