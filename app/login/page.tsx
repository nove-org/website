export const dynamic = 'force-dynamic';
import Logo from '../Logo';
import o from '@sass/login.module.sass';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import LoginForm from './Form';
import { DOMAIN_REGEX } from '@util/CONSTS';
import { getUser } from '@util/helpers/User';
import { axiosClient } from '@util/axios';

export async function generateMetadata() {
    const lang = await new LanguageHandler('main/login', await getUser()).init(headers());
    const title: string = `${lang.getCustomProp('modules.navigation.login-btn')} | Nove`;

    return {
        title,
        openGraph: { title },
        twitter: { title },
    };
}

export default async function Login({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
    let redirectBack: string | undefined = searchParams['redirectBack'];
    if (!redirectBack?.match(/^(?!(\/\/)).*$/g) || !redirectBack?.match(DOMAIN_REGEX)) redirectBack = '/account';
    const user = await getUser();
    if (user?.username) return redirect(redirectBack ? redirectBack : '/account');
    const status = await (await axiosClient.get('/').catch((e) => e))?.data;
    const lang = await new LanguageHandler('main/login', user).init(headers());

    return (
        <section className={o.box}>
            <div className={o.content}>
                {!status ? <p className="error">{lang.getCustomProp('modules.errors.offline')}</p> : null}
                <Logo size={48} />
                <div className={o.flex}>
                    <aside>
                        <h1>{lang.getProp('hero-h1')}</h1>
                        <p>{lang.getProp('hero-p')}</p>
                    </aside>
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
                            forgor: lang.getProp('password-reset'),
                        }}
                        searchParam={redirectBack}
                    />
                </div>
            </div>
        </section>
    );
}
