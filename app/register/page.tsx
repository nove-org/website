import NAPI from '@util/helpers/NAPI';
import LanguageHandler from '@util/handlers/LanguageHandler';
import ObjectHelper from '@util/helpers/Object';
import o from './Login.module.sass';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { COOKIE_HOSTNAME } from '@util/CONSTS';
import Form from './Form';
import { Error } from '@util/helpers/Schema';

export async function generateMetadata() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
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
    const user = await api.user().get({});
    const lang = await new LanguageHandler('main/register', user).init(headers());
    const next: string | undefined = ObjectHelper.getValueByStringPath(searchParams, 'next');
    const error: string | undefined = ObjectHelper.getValueByStringPath(searchParams, 'et');

    if (user?.id) redirect(`/aeh` + (next ? `?next=${next}` : ''));

    const handleLogin = async (e: FormData) => {
        'use server';

        function link(url: string, keepQuery?: boolean) {
            if (!keepQuery) keepQuery = true;
            const existingQuery = url.match(/\?\w{0,32}=/g);

            const queries = [];
            if (next) queries.push(`next=${next}`);

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
        if (!email || !username || !password) redirect(link('/register?et=nf'));

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
                expires: 3 * 30 * 24 * 60 * 60 * 1000,
                domain: COOKIE_HOSTNAME,
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
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
                <form action={handleLogin}>
                    {error && (
                        <div className={o.error}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M 12 3.0292969 C 11.436813 3.0292969 10.873869 3.2917399 10.558594 3.8164062 L 1.7617188 18.451172 C 1.1134854 19.529186 1.94287 21 3.2011719 21 L 20.796875 21 C 22.054805 21 22.886515 19.529186 22.238281 18.451172 L 13.441406 3.8164062 C 13.126131 3.29174 12.563187 3.0292969 12 3.0292969 z M 12 5.2988281 L 20.236328 19 L 3.7636719 19 L 12 5.2988281 z M 11 9 L 11 14 L 13 14 L 13 9 L 11 9 z M 11 16 L 11 18 L 13 18 L 13 16 L 11 16 z"></path>
                            </svg>
                            {error === 'at'
                                ? lang.getProp('account-taken')
                                : error === 'rl'
                                  ? lang.getCustomProp('modules.errors.rate-limit')
                                  : error === 'wp'
                                    ? lang.getProp('weak-password')
                                    : error === 'iu'
                                      ? lang.getProp('invalid-username')
                                      : error === 'ee'
                                        ? lang.getProp('email-error')
                                        : lang.getCustomProp('modules.errors.other')}
                        </div>
                    )}
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
                        login={'/login' + (next ? `?next=${next}` : '')}
                        et={error}
                    />
                </form>
            </div>
        </section>
    );
}
