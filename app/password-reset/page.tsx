import LanguageHandler from '@util/handlers/LanguageHandler';
import NAPI from '@util/helpers/NAPI';
import ObjectHelper from '@util/helpers/Object';
import o from '../login/Login.module.sass';
import b from '../aeh/AccountErrorHandler.module.sass';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import FormError from '@app/account/FormError';
import Databox from '@app/Databox';
import Link from 'next/link';
import { COOKIE_HOSTNAME } from '@util/CONSTS';

export async function generateMetadata() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const lang = await new LanguageHandler('main/password-reset', user).init(headers());
    const title: string = `${lang.getProp('hero-h1')} | Nove`;
    const description: string = lang.getProp('hero-p');

    return {
        title,
        description,
        openGraph: { title, description },
        twitter: { card: 'summary_large_image', title, description },
    };
}

export default async function PasswordReset({ searchParams }: { searchParams: [key: string | string[]] | undefined }) {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    if (user) redirect('/account');

    const key = ObjectHelper.getValueByStringPath(searchParams, 'key');
    const userId = ObjectHelper.getValueByStringPath(searchParams, 'ref');
    const s = ObjectHelper.getValueByStringPath(searchParams, 's');
    const error = ObjectHelper.getValueByStringPath(searchParams, 'et');
    const lang = await new LanguageHandler('main/password-reset', user).init(headers());

    const sendEmail = async (e: FormData) => {
        'use server';

        const email = e.get('email')?.toString();
        const newPassword = e.get('newPassword')?.toString();
        if (!email || !newPassword) redirect('?et=nd');

        const api = new NAPI();
        const reset = await api.user().resetPassword({
            body: {
                email,
                newPassword,
            },
        });

        if (reset?.code) {
            switch (reset.code) {
                case 'weak_password':
                    redirect('?et=wp');
                case 'rate_limit':
                    redirect('?et=rl');
                case 'could_not_send_mail':
                    redirect('?et=ee');
                default:
                    redirect('?et=u');
            }
        } else redirect(`?s=${new Date().getTime()}`);
    };

    const confirmReset = async (e: FormData) => {
        'use server';

        const password = e.get('newPassword')?.toString();
        if (!password || !key || !userId) redirect(`?et=nd&key=${key}&ref=${userId}`);

        const api = new NAPI();
        const reset = await api.user().confirmResetPassword({
            body: {
                code: key,
                password,
                userId,
            },
        });

        if (reset?.code) {
            switch (reset.code) {
                case 'invalid_code':
                    redirect('?et=ic');
                case 'invalid_password':
                    redirect('?et=ip');
                case 'invalid_user':
                    redirect('?et=iu');
                case 'rate_limit':
                    redirect('?et=rl');
                default:
                    redirect('?et=u');
            }
        } else {
            cookies().set('napiAuthorizationToken', `${reset.token} ${reset.id}`, {
                maxAge: 3 * 30 * 24 * 60 * 60,
                expires: 3 * 30 * 24 * 60 * 60 * 1000,
                domain: COOKIE_HOSTNAME,
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });
            redirect(`/account`);
        }
    };

    return !s && (!key || !userId) ? (
        <section className={o.login}>
            <div className={o.center}>
                <aside>
                    <img src="/logo_w.png" width={50} height={50} alt="Nove logo" />
                    <h1>{lang.getProp('hero-h1')}</h1>
                    <p>{lang.getProp('hero-p')}</p>
                </aside>
                <form action={sendEmail}>
                    {error === 'nd' && <FormError text={lang.getCustomProp('modules.errors.no-data')} />}
                    {error === 'rl' && <FormError text={lang.getCustomProp('modules.errors.rate-limit')} />}
                    {error === 'u' && <FormError text={lang.getCustomProp('modules.errors.other')} />}
                    <Databox
                        id="email"
                        title={lang.getCustomProp('main.register.input-email')}
                        placeholder={lang.getCustomProp('main.register.input-email-placeholder')}
                        type="email"
                        required={true}
                    />
                    {error === 'ee' && <FormError text={lang.getCustomProp('main.register.email-error')} />}
                    <Databox
                        id="newPassword"
                        title={lang.getCustomProp('dashboard.security.hds-password-label-2')}
                        placeholder={lang.getCustomProp('dashboard.security.hds-password-placeholder-2')}
                        type="password"
                        required={true}
                    />
                    {error === 'wp' && <FormError text={lang.getCustomProp('main.register.weak-password')} />}
                    <div className={o.buttons}>
                        <Link className="btn" href="/login">
                            {lang.getProp('login')}
                        </Link>
                        <button type="submit" className={'btn ' + o.highlight}>
                            {lang.getCustomProp('modules.actions.next')}
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M 14 4.9296875 L 12.5 6.4296875 L 17.070312 11 L 3 11 L 3 13 L 17.070312 13 L 12.5 17.570312 L 14 19.070312 L 21.070312 12 L 14 4.9296875 z"></path>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </section>
    ) : s ? (
        <section className={b.information}>
            <svg className={b.header} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M 4 4 C 2.895 4 2 4.895 2 6 L 2 18 C 2 19.105 2.895 20 4 20 L 20 20 C 21.105 20 22 19.105 22 18 L 22 6 C 22 4.895 21.105 4 20 4 L 4 4 z M 4 6 L 20 6 L 20 7.0019531 L 12 12 L 4 7.0019531 L 4 6 z M 4 9.0019531 L 12 14 L 20 9.0019531 L 20 18 L 4 18 L 4 9.0019531 z"></path>
            </svg>
            <h1>{lang.getProp('request-success-h1')}</h1>
            <p>{lang.getProp('request-success-p')}</p>
        </section>
    ) : (
        <section className={o.login}>
            <div className={o.center}>
                <aside>
                    <img src="/logo_w.png" width={50} height={50} alt="Nove logo" />
                    <h1>{lang.getProp('confirm-h1')}</h1>
                    <p>{lang.getProp('confirm-p')}</p>
                </aside>
                <form action={confirmReset}>
                    {error === 'nd' && <FormError text={lang.getCustomProp('modules.errors.no-data')} />}
                    {error === 'rl' && <FormError text={lang.getCustomProp('modules.errors.rate-limit')} />}
                    {error === 'ic' && <FormError text={lang.getProp('invalid-code')} />}
                    {error === 'iu' && <FormError text={lang.getProp('invalid-user')} />}
                    {error === 'u' && <FormError text={lang.getCustomProp('modules.errors.other')} />}
                    <Databox
                        id="newPassword"
                        title={lang.getCustomProp('dashboard.security.hds-password-label-2')}
                        placeholder={lang.getCustomProp('dashboard.security.hds-password-placeholder-2')}
                        type="password"
                        required={true}
                    />
                    {error === 'ip' && <FormError text={lang.getCustomProp('dashboard.security.invalid-password')} />}
                    <div className={o.buttons}>
                        <Link className="btn" href="/login">
                            {lang.getProp('login')}
                        </Link>
                        <button type="submit" className={'btn ' + o.highlight}>
                            {lang.getCustomProp('modules.actions.proceed')}
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M 14 4.9296875 L 12.5 6.4296875 L 17.070312 11 L 3 11 L 3 13 L 17.070312 13 L 12.5 17.570312 L 14 19.070312 L 21.070312 12 L 14 4.9296875 z"></path>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
