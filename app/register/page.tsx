import NAPI from '@util/helpers/NAPI';
import LanguageHandler from '@util/handlers/LanguageHandler';
import ObjectHelper from '@util/helpers/Object';
import o from '../login/Login.module.sass';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { COOKIE_HOSTNAME } from '@util/CONSTS';
import Form from './Form';
import { Error } from '@util/helpers/Schema';
import FormError from '@app/account/FormError';

export async function generateMetadata() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: false });
    const lang = await new LanguageHandler('main/register', user).init(headers());
    const title: string = `${lang.getProp('hero-h1')} | Nove`;
    const description: string = lang.getProp('hero-p');

    return {
        title,
        description,
        openGraph: { title, description },
        twitter: { card: 'summary_large_image', title, description },
    };
}

export default async function Register({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: false });
    const lang = await new LanguageHandler('main/register', user).init(headers());
    const next: string | undefined = ObjectHelper.getValueByStringPath(searchParams, 'next');
    const error: string | undefined = ObjectHelper.getValueByStringPath(searchParams, 'et');

    if (user?.id) redirect(`/aeh` + (next ? `?next=${encodeURIComponent(next)}` : ''));

    const handleRegister = async (e: FormData) => {
        'use server';

        function link(url: string, keepQuery?: boolean) {
            if (!keepQuery) keepQuery = true;
            const existingQuery = url.match(/\?\w{0,32}=/g);

            const queries = [];
            if (next) queries.push(`next=${encodeURIComponent(next)}`);

            const formatted = queries.map((q, i) => {
                if (i === 0) return (existingQuery ? '&' : '?') + q;
                else return `&${q}`;
            });

            return url + formatted.join('');
        }

        const email = e.get('email')?.toString();
        const username = e.get('username')?.toString();
        const password = e.get('password')?.toString();
        if (cookies().get('napiAuthorizationToken')?.value) return;
        if (!email || !username || !password) redirect(link('/register?et=nd'));

        const authorization = await new NAPI(undefined, headers().get('User-Agent')?.toString()).user().register({
            body: {
                email,
                username,
                password,
            },
        });

        if (authorization?.code) {
            switch (authorization.code) {
                case 'invalid_request':
                    if ((authorization as any as Error).details?.find((d) => d.path.join('') === 'username')) redirect(link('/register?et=iu'));
                    else if ((authorization as any as Error).details?.find((d) => d.path.toString() === 'password')) redirect(link('/register?et=wp'));
                    else redirect(link('/register?et=u'));
                case 'email_taken':
                case 'username_taken':
                    redirect(link('/register?et=at'));
                case 'weak_password':
                    redirect(link('/register?et=wp'));
                case 'could_not_send_mail':
                    redirect(link('/register?et=ee'));
                case 'rate_limit':
                    redirect(link('/register?et=rl'));
                default:
                    redirect(link('/register?et=u'));
            }
        } else {
            cookies().set('napiAuthorizationToken', `${authorization.token} ${authorization.id}`, {
                maxAge: 3 * 30 * 24 * 60 * 60,
                domain: COOKIE_HOSTNAME,
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
            });
            redirect(link('/aeh'));
        }
    };

    return (
        <section className={o.login}>
            <div className={o.center}>
                <aside>
                    <img src="/logo_w.png" width={50} height={50} alt="Nove logo" />
                    <h1>{lang.getProp('hero-h1')}</h1>
                    <p>{lang.getProp('hero-p')}</p>
                </aside>
                <form action={handleRegister}>
                    {error === 'nd' && <FormError text={lang.getCustomProp('modules.errors.no-data')} />}
                    {error === 'at' && <FormError text={lang.getProp('account-taken')} />}
                    {error === 'rl' && <FormError text={lang.getCustomProp('modules.errors.rate-limit')} />}
                    {error === 'wp' && <FormError text={lang.getProp('weak-password')} />}
                    {error === 'iu' && <FormError text={lang.getProp('invalid-username')} />}
                    {error === 'ee' && <FormError text={lang.getProp('email-error')} />}
                    {error === 'u' && <FormError text={lang.getCustomProp('modules.errors.other')} />}
                    <Form
                        lang={{
                            username: lang.getProp('input-username'),
                            email: lang.getProp('input-email'),
                            password: lang.getProp('input-password'),
                            usernameP: lang.getProp('input-username-placeholder'),
                            emailP: lang.getProp('input-email-placeholder'),
                            passwordP: lang.getProp('input-password-placeholder'),
                            usernameD: lang.getProp('input-usernameD'),
                            emailD: lang.getProp('input-emailD'),
                            passwordD: lang.getProp('input-passwordD'),
                            login: lang.getProp('input-login'),
                            register: lang.getProp('input-register'),
                        }}
                        login={'/login' + (next ? `?next=${encodeURIComponent(next)}` : '')}
                        et={error}
                    />
                </form>
            </div>
        </section>
    );
}
