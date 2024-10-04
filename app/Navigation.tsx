'use client';

import Link from 'next/link';
import Image from 'next/image';
import o from './Navigation.module.sass';
import { usePathname } from 'next/navigation';
import { User } from '@util/schema';
import { ENABLE_REGISTER_PAGE, OFFICIAL_LANDING, DONATE_LINK } from '@util/CONSTS';

export default function Navigation({
    user,
    lang,
}: {
    user?: User;
    lang: {
        applications: string;
        about: string;
        blog: string;
        donate: string;
        login: string;
        register: string;
        profile: string;
        security: string;
        logout: string;
    };
}) {
    const pathname = usePathname();

    return (
        <nav className={o.box + ` ${pathname.startsWith('/account') ? o.hide : ''}`}>
            <section className={o.main}>
                <Link href="/" className={o.header}>
                    <Image src="/logo_w.png" width={20} height={20} alt="Logo: N letter" />
                    Nove
                </Link>
                <div className={o.links}>
                    {OFFICIAL_LANDING && (
                        <details className={o.link}>
                            <summary>
                                {lang.applications}{' '}
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M 7.4296875 9.5 L 5.9296875 11 L 12 17.070312 L 18.070312 11 L 16.570312 9.5 L 12 14.070312 L 7.4296875 9.5 z"></path>
                                </svg>
                            </summary>
                            <div className={o.modules}>
                                <Link href="https://procurel.com" className={o.blue}>
                                    <Image src="/crm.png" width={30} height={30} alt="Procurel" />
                                    Procurel
                                </Link>
                                <Link href="https://peekr.org" className={o.green}>
                                    <Image src="/peekr.png" width={30} height={30} alt="Procurel" />
                                    Peekr
                                </Link>
                                <div className={o.more}>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M15.5 5L13 11 7 13.5 13 16 15.5 22 18 16 24 13.5 18 11 15.5 5zM4.125 7.875L5.5 12 6.875 7.875 11 6.5 6.875 5.125 5.5 1 4.125 5.125 0 6.5zM6.375 18.625L5.5 16 4.625 18.625 2 19.5 4.625 20.375 5.5 23 6.375 20.375 9 19.5z"></path>
                                    </svg>
                                    More coming soon...
                                </div>
                            </div>
                        </details>
                    )}
                    <Link className={o.link} href="/about">
                        {lang.about}
                    </Link>
                    <Link className={o.link} href="/blog">
                        {lang.blog}
                    </Link>
                    {DONATE_LINK && (
                        <Link className={o.link} href={DONATE_LINK}>
                            {lang.donate}
                        </Link>
                    )}
                </div>
            </section>
            <section className={o.account}>
                {user?.id ? (
                    <details className={o.profile}>
                        <summary>
                            <Image src={user.avatar} width={28} height={28} alt="User's avatar" />
                        </summary>
                        <div className={o.options}>
                            <Link href="/account">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M 12 3 A 4 4 0 0 0 8 7 A 4 4 0 0 0 12 11 A 4 4 0 0 0 16 7 A 4 4 0 0 0 12 3 z M 12 14 C 8.996 14 3 15.508 3 18.5 L 3 20 C 3 20.552 3.448 21 4 21 L 20 21 C 20.552 21 21 20.552 21 20 L 21 18.5 C 21 15.508 15.004 14 12 14 z"></path>
                                </svg>
                                {lang.profile}
                            </Link>
                            <Link href="/account/security">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M11.188,1.361l-7,3.111C3.465,4.793,3,5.509,3,6.3V11c0,7.83,6.439,11.486,9,12c2.561-0.514,9-4.17,9-12V6.3 c0-0.79-0.465-1.507-1.188-1.828l-7-3.111C12.295,1.131,11.705,1.131,11.188,1.361z M10.293,15.707l-2.77-2.77 c-0.39-0.39-0.39-1.024,0-1.414l0,0c0.39-0.39,1.024-0.39,1.414,0L11,13.586l5.085-5.085c0.39-0.39,1.024-0.39,1.414,0v0 c0.39,0.39,0.39,1.024,0,1.414l-5.792,5.792C11.317,16.097,10.683,16.097,10.293,15.707z"></path>
                                </svg>
                                {lang.security}
                            </Link>
                            <a href="/logout">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M19.707,12.707 l-3.3,3.3C16.212,16.202,15.956,16.3,15.7,16.3s-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414L16.586,13H9 c-0.553,0-1-0.447-1-1s0.447-1,1-1h7.586l-1.593-1.593c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0l3.3,3.3 C20.098,11.684,20.098,12.316,19.707,12.707z"></path>
                                </svg>
                                {lang.logout}
                            </a>
                        </div>
                    </details>
                ) : (
                    <div className={o.buttons}>
                        <Link href="/login">{lang.login}</Link>
                        {ENABLE_REGISTER_PAGE && (
                            <Link
                                href="/register
                        ">
                                {lang.register}
                            </Link>
                        )}
                    </div>
                )}
            </section>
        </nav>
    );
}
