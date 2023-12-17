import Link from 'next/link';
import Logo from '@app/Logo';
import Image from 'next/image';
import o from '@sass/Navigation.module.sass';
import { axiosClient } from '@util/axios';
import { cookies, headers } from 'next/headers';
import { DONATE_LINK, REPOSITORY } from '@util/CONSTS';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { Response, User } from '@util/schema';

export default async function Navigation() {
    const user: Response<User> = (
        await axiosClient
            .get('/v1/users/me', {
                headers: { Authorization: `Owner ${cookies()?.get('napiAuthorizationToken')?.value}` },
            })
            .catch((e) => e.response)
    )?.data;

    const lang = await new LanguageHandler('modules/navigation', user?.body?.data).init(headers());

    return (
        <nav className={o.box + ' ' + o.account}>
            <div className={o.padding}>
                <div className={o.flex}>
                    <a href="/">
                        <header className={o.logo}>
                            <Logo size={20} />
                            <p>Nove</p>
                        </header>
                    </a>
                    <ul>
                        <li>
                            <details className={o.projects}>
                                <summary>
                                    <a>{lang.getProp('ul-products')}</a>
                                </summary>
                                <div className={o.menu}>
                                    <a href="https://files.nove.team">
                                        <h1>
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                                <path
                                                    fill="currentColor"
                                                    d="M 12 4 A 7.5 7.5 0 0 0 5.3515625 8.0429688 A 6 6 0 0 0 0 14 A 6 6 0 0 0 6 20 L 19 20 A 5 5 0 0 0 24 15 A 5 5 0 0 0 19.34375 10.017578 A 7.5 7.5 0 0 0 12 4 z"></path>
                                            </svg>
                                            Files
                                        </h1>
                                        <p>{lang.getProp('products-files')}</p>
                                    </a>
                                    <a href="https://git.nove.team/nove-org/NAPI">
                                        <h1>
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                                <path
                                                    fill="currentColor"
                                                    d="M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 19 21 C 20.093063 21 21 20.093063 21 19 L 21 5 C 21 3.9069372 20.093063 3 19 3 L 5 3 z M 6 5 C 6.552 5 7 5.448 7 6 C 7 6.552 6.552 7 6 7 C 5.448 7 5 6.552 5 6 C 5 5.448 5.448 5 6 5 z M 9 5 L 13 5 L 13 19 L 9 19 L 9 5 z M 15 5 L 19 5 L 19 19 L 15 19 L 15 5 z M 11 7 A 1 1 0 0 0 10 8 A 1 1 0 0 0 11 9 A 1 1 0 0 0 12 8 A 1 1 0 0 0 11 7 z M 17 7 A 1 1 0 0 0 16 8 A 1 1 0 0 0 17 9 A 1 1 0 0 0 18 8 A 1 1 0 0 0 17 7 z M 6 8 C 6.552 8 7 8.448 7 9 C 7 9.552 6.552 10 6 10 C 5.448 10 5 9.552 5 9 C 5 8.448 5.448 8 6 8 z M 6 17 C 6.552 17 7 17.448 7 18 C 7 18.552 6.552 19 6 19 C 5.448 19 5 18.552 5 18 C 5 17.448 5.448 17 6 17 z"></path>
                                            </svg>
                                            NAPI
                                        </h1>
                                        <p>{lang.getProp('products-napi')}</p>
                                    </a>
                                    <a>
                                        <h1>
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                                <path
                                                    fill="currentColor"
                                                    d="M 3 3 C 1.895 3 1 3.895 1 5 L 1 17 C 1 18.105 1.895 19 3 19 L 4.6523438 19 C 5.1993437 18.197 6.073875 17.514 7.171875 17 L 3 17 L 3 5 L 21 5 L 21 17 L 16.828125 17 C 17.926125 17.514 18.800656 18.197 19.347656 19 L 21 19 C 22.105 19 23 18.105 23 17 L 23 5 C 23 3.895 22.105 3 21 3 L 3 3 z M 12 10 C 10.3 10 9 11.3 9 13 C 9 14.7 10.3 16 12 16 C 13.7 16 15 14.7 15 13 C 15 11.3 13.7 10 12 10 z M 12 18 C 8.722 18 6 19.429 6 21 L 6 22 L 18 22 L 18 21 C 18 19.429 15.278 18 12 18 z"></path>
                                            </svg>
                                            CRM
                                        </h1>
                                        <p>{lang.getProp('products-crm')}</p>
                                    </a>
                                </div>
                            </details>
                        </li>
                        <li>
                            <a href="/about">{lang.getProp('ul-about')}</a>
                        </li>
                        <li>
                            <a href="/blog">{lang.getProp('ul-blog')}</a>
                        </li>
                        <li>
                            <a target="_blank" rel="noopener noreferrer" href={DONATE_LINK}>
                                {lang.getProp('ul-donate')}
                            </a>
                        </li>
                    </ul>
                </div>
                {user?.body?.data ? (
                    <details open={false} id="navbarMenu" className={o.user}>
                        <summary>
                            <header>
                                <Image src={user.body.data.avatar} width="28" height="28" alt="Avatar" />
                                <p>{user.body.data.username}</p>
                            </header>
                        </summary>
                        <div className={o.module}>
                            <a href="/account">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M 12 3 A 4 4 0 0 0 8 7 A 4 4 0 0 0 12 11 A 4 4 0 0 0 16 7 A 4 4 0 0 0 12 3 z M 12 14 C 8.996 14 3 15.508 3 18.5 L 3 20 C 3 20.552 3.448 21 4 21 L 20 21 C 20.552 21 21 20.552 21 20 L 21 18.5 C 21 15.508 15.004 14 12 14 z"></path>
                                </svg>
                                {lang.getProp('switcher-profile')}
                            </a>
                            <a href="/account/security">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M11.188,1.361l-7,3.111C3.465,4.793,3,5.509,3,6.3V11c0,7.83,6.439,11.486,9,12c2.561-0.514,9-4.17,9-12V6.3 c0-0.79-0.465-1.507-1.188-1.828l-7-3.111C12.295,1.131,11.705,1.131,11.188,1.361z M10.293,15.707l-2.77-2.77 c-0.39-0.39-0.39-1.024,0-1.414l0,0c0.39-0.39,1.024-0.39,1.414,0L11,13.586l5.085-5.085c0.39-0.39,1.024-0.39,1.414,0v0 c0.39,0.39,0.39,1.024,0,1.414l-5.792,5.792C11.317,16.097,10.683,16.097,10.293,15.707z"></path>
                                </svg>
                                {lang.getProp('switcher-security')}
                            </a>
                            <a href="/logout">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M19.707,12.707 l-3.3,3.3C16.212,16.202,15.956,16.3,15.7,16.3s-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414L16.586,13H9 c-0.553,0-1-0.447-1-1s0.447-1,1-1h7.586l-1.593-1.593c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0l3.3,3.3 C20.098,11.684,20.098,12.316,19.707,12.707z"></path>
                                </svg>
                                {lang.getProp('switcher-logout')}
                            </a>
                        </div>
                    </details>
                ) : (
                    <div className={o.buttons}>
                        <Link className={o.login} href="/login">
                            {lang.getProp('login-btn')}
                        </Link>
                        <Link href="/register">{lang.getProp('register-btn')}</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
