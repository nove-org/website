export const dynamic = 'force-dynamic';
import Logo from '../Logo';
import o from '@sass/login.module.sass';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import RegisterForm from './Form';
import { DOMAIN_REGEX } from '@util/CONSTS';
import { getUser } from '@util/helpers/User';

export async function generateMetadata() {
    const user = await getUser();
    const lang = await new LanguageHandler('main/register', user).init(headers());

    return {
        title: `${lang.getCustomProp('modules.navigation.register-btn')} | Nove`,
        openGraph: {
            title: `${lang.getCustomProp('modules.navigation.register-btn')} | Nove`,
        },
        twitter: {
            title: `${lang.getCustomProp('modules.navigation.register-btn')} | Nove`,
        },
    };
}

export default async function Register({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
    let redirectBack: string | undefined = searchParams['redirectBack'];
    if (!redirectBack?.match(/^(?!(\/\/)).*$/g) || !redirectBack?.match(DOMAIN_REGEX)) redirectBack = '/account';
    const user = await getUser();
    if (user?.username) return redirect(redirectBack ? redirectBack : '/account');
    const lang = await new LanguageHandler('main/register', user).init(headers());

    return (
        <section className={o.box}>
            <div className={o.content}>
                {!user ? <p className="error">{lang.getCustomProp('modules.errors.offline')}</p> : null}
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
