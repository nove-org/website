import NAPI from '@util/helpers/NAPI';
import o from './Navigation.module.sass';
import { cookies, headers } from 'next/headers';
import Link from 'next/link';
import LanguageHandler from '@util/handlers/LanguageHandler';
const { DONATE_LINK } = process.env;

export default async function Navigation() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const lang = await new LanguageHandler('modules/navigation', user).init(headers());

    return (
        <nav className={o.box}>
            <header>
                <img src="/logo_w.png" width={20} height={20} alt="Logo: N letter" />
                Nove
            </header>
            <section className={o.links}>
                <details className={o.link}>
                    <summary>{lang.getProp('ul-products')}</summary>
                    <div className={o.modules}>
                        <div className={o.module}>
                            <h1>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M 12 4 A 7.5 7.5 0 0 0 5.3515625 8.0429688 A 6 6 0 0 0 0 14 A 6 6 0 0 0 6 20 L 19 20 A 5 5 0 0 0 24 15 A 5 5 0 0 0 19.34375 10.017578 A 7.5 7.5 0 0 0 12 4 z"></path>
                                </svg>
                                Files
                            </h1>
                            <p>{lang.getProp('products-files')}</p>
                        </div>
                        <div className={o.module}>
                            <h1>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M 3 3 C 1.895 3 1 3.895 1 5 L 1 17 C 1 18.105 1.895 19 3 19 L 4.6523438 19 C 5.1993437 18.197 6.073875 17.514 7.171875 17 L 3 17 L 3 5 L 21 5 L 21 17 L 16.828125 17 C 17.926125 17.514 18.800656 18.197 19.347656 19 L 21 19 C 22.105 19 23 18.105 23 17 L 23 5 C 23 3.895 22.105 3 21 3 L 3 3 z M 12 10 C 10.3 10 9 11.3 9 13 C 9 14.7 10.3 16 12 16 C 13.7 16 15 14.7 15 13 C 15 11.3 13.7 10 12 10 z M 12 18 C 8.722 18 6 19.429 6 21 L 6 22 L 18 22 L 18 21 C 18 19.429 15.278 18 12 18 z"></path>
                                </svg>
                                Procurel
                            </h1>
                            <p>{lang.getProp('products-crm')}</p>
                        </div>
                        <div className={o.module}>
                            <h1>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 19.585938 21.585938 C 20.137937 22.137937 21.033938 22.137938 21.585938 21.585938 C 22.137938 21.033938 22.137938 20.137938 21.585938 19.585938 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path>
                                </svg>
                                Peekr
                            </h1>
                            <p>{lang.getProp('products-peekr')}</p>
                        </div>
                    </div>
                </details>
                <Link href="/about">{lang.getProp('ul-about')}</Link>
                <Link href="/blog">{lang.getProp('ul-blog')}</Link>
                {DONATE_LINK && <Link href={DONATE_LINK}>{lang.getProp('ul-donate')}</Link>}
            </section>
            <section className={o.account}>
                {user ? (
                    <details className={o.profile}>
                        <summary>
                            <img src={user.avatar} width={28} height={28} alt="User's avatar" />
                        </summary>
                        <div className={o.options}>
                            <Link href="/account">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M 12 3 A 4 4 0 0 0 8 7 A 4 4 0 0 0 12 11 A 4 4 0 0 0 16 7 A 4 4 0 0 0 12 3 z M 12 14 C 8.996 14 3 15.508 3 18.5 L 3 20 C 3 20.552 3.448 21 4 21 L 20 21 C 20.552 21 21 20.552 21 20 L 21 18.5 C 21 15.508 15.004 14 12 14 z"></path>
                                </svg>
                                {lang.getProp('switcher-profile')}
                            </Link>
                            <Link href="/account/security">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M11.188,1.361l-7,3.111C3.465,4.793,3,5.509,3,6.3V11c0,7.83,6.439,11.486,9,12c2.561-0.514,9-4.17,9-12V6.3 c0-0.79-0.465-1.507-1.188-1.828l-7-3.111C12.295,1.131,11.705,1.131,11.188,1.361z M10.293,15.707l-2.77-2.77 c-0.39-0.39-0.39-1.024,0-1.414l0,0c0.39-0.39,1.024-0.39,1.414,0L11,13.586l5.085-5.085c0.39-0.39,1.024-0.39,1.414,0v0 c0.39,0.39,0.39,1.024,0,1.414l-5.792,5.792C11.317,16.097,10.683,16.097,10.293,15.707z"></path>
                                </svg>
                                {lang.getProp('switcher-security')}
                            </Link>
                            <Link href="/logout">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M19.707,12.707 l-3.3,3.3C16.212,16.202,15.956,16.3,15.7,16.3s-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414L16.586,13H9 c-0.553,0-1-0.447-1-1s0.447-1,1-1h7.586l-1.593-1.593c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0l3.3,3.3 C20.098,11.684,20.098,12.316,19.707,12.707z"></path>
                                </svg>
                                {lang.getProp('switcher-logout')}
                            </Link>
                        </div>
                    </details>
                ) : (
                    <div className={o.buttons}>
                        <Link href="/login">{lang.getProp('login-btn')}</Link>
                        <Link
                            href="/register
                        ">
                            {lang.getProp('register-btn')}
                        </Link>
                    </div>
                )}
            </section>
        </nav>
    );
}
