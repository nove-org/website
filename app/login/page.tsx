import Databox from '@app/Databox';
import o from './Login.module.sass';
import Link from 'next/link';
import NAPI from '@util/helpers/NAPI';
import { cookies, headers } from 'next/headers';
import LanguageHandler from '@util/handlers/LanguageHandler';
import ObjectHelper from '@util/helpers/Object';
import { redirect } from 'next/navigation';
import { axiosClient } from '@util/helpers/Axios';
import { Response, User } from '@util/helpers/Schema';
import { AxiosError, AxiosResponse } from 'axios';
import { COOKIE_HOSTNAME } from '@util/CONSTS';
import Encryption from '@util/helpers/Encryption';

export async function generateMetadata() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const lang = await new LanguageHandler('main/login', user).init(headers());
    const title: string = `${lang.getProp('hero-h1')} | Nove`;
    const description: string = lang.getProp('hero-p');

    return {
        title,
        description,
        openGraph: { title, description },
        twitter: { card: 'summary_large_image', title, description },
    };
}

export default async function Login({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({});
    const lang = await new LanguageHandler('main/login', user).init(headers());
    const handle: string | undefined = ObjectHelper.getValueByStringPath(searchParams, 'h');
    const error: string | undefined = ObjectHelper.getValueByStringPath(searchParams, 'et');
    const mfa: string | undefined = ObjectHelper.getValueByStringPath(searchParams, 'mfa');

    if (user?.id) redirect('/');
    if (handle && handle.split('@').length === 3) redirect(`https://${handle.split('@')[2]}/login?h=${handle.split('@')[1]}`);
    if (mfa && (!handle || !cookies().get('tempAuthId')?.value)) return redirect('/login?et=ci');

    const handleLogin = async (e: FormData) => {
        'use server';

        if (!handle) {
            const username = e.get('username')?.toString();
            if (!username) return redirect('/login?et=ne');

            return redirect('/login?h=' + username);
        }

        const password = e.get('password')?.toString() || cookies().get('tempAuthId')?.value,
            code = e.get('mfa')?.toString();
        if (!password) return redirect('/login?et=ne');
        if (cookies().get('napiAuthorizationToken')?.value) return;

        await axiosClient
            .post(
                '/v1/users/login',
                {
                    username: handle,
                    password: mfa ? Encryption.read(password, handle) : password,
                },
                { headers: mfa ? { 'x-mfa': code } : undefined },
            )
            .then((r: AxiosResponse) => {
                const user = r.data as Response<User>;
                cookies().set('napiAuthorizationToken', `${user.body.data.token} ${user.body.data.id}`, {
                    maxAge: 3 * 30 * 24 * 60 * 60,
                    expires: 3 * 30 * 24 * 60 * 60 * 1000,
                    domain: COOKIE_HOSTNAME,
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                });
                cookies().set('tempAuthId', '', {
                    maxAge: 1,
                    expires: 1,
                });
                redirect('/');
            })
            .catch((e: AxiosError) => {
                const user = e.response?.data as Response<null>;
                switch (user?.body?.error?.code) {
                    case 'invalid_user':
                    case 'invalid_password':
                        redirect('/login?et=ne' + (mfa ? '&mfa=y' : '') + (handle ? `&h=${handle}` : ''));
                    case 'rate_limit':
                        redirect('/login?et=rl' + (mfa ? '&mfa=y' : '') + (handle ? `&h=${handle}` : ''));
                    case 'mfa_required':
                        cookies().set('tempAuthId', Encryption.create(password, handle), {
                            maxAge: 180,
                            domain: COOKIE_HOSTNAME,
                            httpOnly: true,
                            secure: true,
                            sameSite: 'strict',
                        });
                        redirect('/login?mfa=y' + (handle ? `&h=${handle}` : ''));
                    case 'invalid_mfa_token':
                        redirect('/login?et=m&mfa=y' + (handle ? `&h=${handle}` : ''));
                    default:
                        redirect('/login?et=u' + (mfa ? '&mfa=y' : '') + (handle ? `&h=${handle}` : ''));
                }
            });
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
                            {error === 'ne'
                                ? lang.getProp('invalid-password')
                                : error === 'rl'
                                  ? lang.getCustomProp('modules.errors.rate-limit')
                                  : error === 'm'
                                    ? lang.getProp('invalid-mfa')
                                    : error === 'ci'
                                      ? lang.getProp('invalid-cipher')
                                      : lang.getCustomProp('modules.errors.other')}
                        </div>
                    )}
                    <div className={handle ? o.hidden : o.shown}>
                        <Databox id="username" title={lang.getProp('input-email')} type="text" required={!handle} placeholder={lang.getProp('input-email-placeholder')} />
                        <Link className={o.link} href="/blog/">
                            {lang.getProp('handle-faq')}
                        </Link>
                    </div>
                    {handle && (
                        <>
                            <h2 className={o.userInfo}>
                                <span>{handle.charAt(0)}</span> {handle}
                                <Link href="/login">Not you?</Link>
                            </h2>
                            {mfa ? (
                                <Databox id="mfa" title={lang.getProp('input-mfa')} description={lang.getProp('input-mfa-p')} type="text" required={true} placeholder="123456" />
                            ) : (
                                <>
                                    <Databox
                                        id="password"
                                        title={lang.getProp('input-password')}
                                        type="password"
                                        required={true}
                                        placeholder={lang.getProp('input-password-placeholder')}
                                    />
                                    <Link className={o.link} href="/password-reset">
                                        {lang.getProp('password-reset')}
                                    </Link>
                                </>
                            )}
                        </>
                    )}
                    <div className={o.buttons}>
                        <Link className="btn" href="/register">
                            {lang.getProp('input-new')}
                        </Link>
                        <button className={'btn ' + o.highlight} type="submit">
                            {handle ? lang.getProp('input-login') : lang.getProp('input-next')}
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
