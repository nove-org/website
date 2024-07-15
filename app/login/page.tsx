import Databox from '@app/Databox';
import Link from 'next/link';
import MFA from './MFA';
import Password from './Password';
import NAPI from '@util/helpers/NAPI';
import Encryption from '@util/helpers/Encryption';
import LanguageHandler from '@util/handlers/LanguageHandler';
import ObjectHelper from '@util/helpers/Object';
import o from './Login.module.sass';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { COOKIE_HOSTNAME } from '@util/CONSTS';
import FormError from '@app/account/FormError';

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
    const next: string | undefined = ObjectHelper.getValueByStringPath(searchParams, 'next');
    const handle: string | undefined = ObjectHelper.getValueByStringPath(searchParams, 'h');
    const error: string | undefined = ObjectHelper.getValueByStringPath(searchParams, 'et');
    const mfa: string | undefined = ObjectHelper.getValueByStringPath(searchParams, 'mfa');

    if (user?.id) redirect(next ? next : '/account');
    if (handle && handle.split('/').length === 2 && handle.startsWith('@')) redirect(`https://${handle.split('/')[1]}/login?h=${handle.split('/')[0].slice(1)}`);
    if (mfa && (!handle || !cookies().get('tempAuthId')?.value)) return redirect('/login?et=ci');

    const handleLogin = async (e: FormData) => {
        'use server';

        if (!handle) {
            const username = e.get('username')?.toString();
            if (!username) return redirect('/login?et=ne' + (next ? `&next=${next}` : ''));

            return redirect('/login?h=' + username + (next ? `&next=${next}` : ''));
        }

        const password = e.get('password')?.toString() || cookies().get('tempAuthId')?.value,
            code = e.get('mfa')?.toString();
        if (!password) return redirect('/login?et=ne&h=' + handle + (next ? `&next=${next}` : ''));
        if (cookies().get('napiAuthorizationToken')?.value) return;

        const authorization = await new NAPI(undefined, headers().get('User-Agent')?.toString()).user().authorize({
            body: {
                username: handle,
                password: mfa ? Encryption.read(password, handle) : password,
            },
            mfa: code,
        });

        if (authorization?.code) {
            switch (authorization.code) {
                case 'invalid_user':
                case 'invalid_password':
                    redirect('/login?et=ne' + (mfa ? '&mfa=y' : '') + (handle ? `&h=${handle}` : '') + (next ? `&next=${next}` : ''));
                case 'rate_limit':
                    redirect('/login?et=rl' + (mfa ? '&mfa=y' : '') + (handle ? `&h=${handle}` : '') + (next ? `&next=${next}` : ''));
                case 'mfa_required':
                    cookies().set('tempAuthId', Encryption.create(password, handle), {
                        maxAge: 180,
                        domain: COOKIE_HOSTNAME,
                        httpOnly: true,
                        secure: true,
                        sameSite: 'strict',
                    });
                    redirect('/login?mfa=y' + (handle ? `&h=${handle}` : '') + (next ? `&next=${next}` : ''));
                case 'invalid_mfa_token':
                    redirect('/login?et=m&mfa=y' + (handle ? `&h=${handle}` : '') + (next ? `&next=${next}` : ''));
                default:
                    redirect('/login?et=u' + (mfa ? '&mfa=y' : '') + (handle ? `&h=${handle}` : '') + (next ? `&next=${next}` : ''));
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
            cookies().set('tempAuthId', '', {
                maxAge: 1,
                expires: 1,
            });
            redirect(next ? next : '/account');
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
                        <FormError
                            text={
                                error === 'ne'
                                    ? lang.getProp('invalid-password')
                                    : error === 'rl'
                                      ? lang.getCustomProp('modules.errors.rate-limit')
                                      : error === 'm'
                                        ? lang.getProp('invalid-mfa')
                                        : error === 'ci'
                                          ? lang.getProp('invalid-cipher')
                                          : lang.getCustomProp('modules.errors.other')
                            }
                        />
                    )}
                    <div className={handle ? o.hidden : o.shown}>
                        <Databox id="username" title={lang.getProp('input-email')} type="text" required={!handle} placeholder={lang.getProp('input-email-placeholder')} />
                        <Link className={o.link} href="/blog/">
                            {lang.getProp('handle-faq')}
                        </Link>
                    </div>
                    {handle ? (
                        <>
                            <h2 className={o.userInfo}>
                                <span>{handle.charAt(0)}</span> {handle}
                                <a href="/login">Not you?</a>
                            </h2>
                            {mfa ? (
                                <MFA
                                    et={error}
                                    lang={{
                                        mfa: lang.getProp('input-mfa'),
                                        mfaP: lang.getProp('input-mfa-p'),
                                        new: lang.getProp('input-new'),
                                        login: lang.getProp('input-login'),
                                    }}
                                />
                            ) : (
                                <Password
                                    et={error}
                                    lang={{
                                        password: lang.getProp('input-password'),
                                        passwordP: lang.getProp('input-password-placeholder'),
                                        reset: lang.getProp('password-reset'),
                                        new: lang.getProp('input-new'),
                                        login: lang.getProp('input-login'),
                                    }}
                                />
                            )}
                        </>
                    ) : (
                        <div className={o.buttons}>
                            <Link className="btn" href={`/register` + (next ? `?next=${next}` : '')}>
                                {lang.getProp('input-new')}
                            </Link>
                            <button className={'btn ' + o.highlight} type="submit">
                                {lang.getProp('input-next')}
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M 14 4.9296875 L 12.5 6.4296875 L 17.070312 11 L 3 11 L 3 13 L 17.070312 13 L 12.5 17.570312 L 14 19.070312 L 21.070312 12 L 14 4.9296875 z"></path>
                                </svg>
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
}
