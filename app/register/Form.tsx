'use client';

import { setCookie } from 'cookies-next';
import { COOKIE_HOSTNAME } from '@util/CONSTS';
import o from '@sass/login.module.sass';
import { registerCall } from '@util/helpers/client/Account';
import { errorHandler } from '@util/helpers/Main';
import { AxiosError } from 'axios';
import { Response } from '@util/schema';
import Link from 'next/link';

export default function RegisterForm({
    searchParam,
    lang,
}: {
    searchParam: string | undefined;
    lang: {
        inputEmail: string;
        inputUsername: string;
        inputPassword: string;
        inputBtn: string;
    };
}) {
    const handleRegister = async (e: FormData) =>
        await registerCall({ email: e.get('email')?.toString(), username: e.get('username')?.toString(), password: e.get('password')?.toString() })
            .then((user) => {
                setCookie('napiAuthorizationToken', `${user?.token} ${user?.id}`, {
                    maxAge: 3 * 30 * 24 * 60 * 60,
                    domain: COOKIE_HOSTNAME,
                    sameSite: 'strict',
                    secure: true,
                });

                const uri = searchParam || '/account';
                if (uri == '__CLOSE__') window.close();
                else window.location.replace(uri);
            })
            .catch((err: AxiosError) => alert(errorHandler(err.response?.data as Response<null>)));

    return (
        <form id="loginForm" action={handleRegister} className={o.login}>
            <label htmlFor="email">
                {lang.inputEmail}
                <input type="email" id="email" name="email" placeholder="Your email" required />
            </label>
            <label htmlFor="username">
                {lang.inputUsername}
                <input type="text" id="username" name="username" placeholder="Your username" required />
            </label>
            <label htmlFor="password">
                {lang.inputPassword}
                <input type="password" id="password" name="password" placeholder="Your password" required />
            </label>

            <div className={o.buttons}>
                <Link href="/login">{'Log in'}</Link>
                <button type="submit">{'Create account'}</button>
            </div>
        </form>
    );
}
