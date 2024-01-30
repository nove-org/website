'use client';

import { setCookie } from 'cookies-next';
import { COOKIE_HOSTNAME } from '@util/CONSTS';
import o from '@sass/login.module.sass';
import { registerCall } from '@util/helpers/client/Account';
import { errorHandler } from '@util/helpers/Main';
import { AxiosError } from 'axios';
import { Response } from '@util/schema';

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
            <label htmlFor="email">{lang.inputEmail}</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="username">{lang.inputUsername}</label>
            <input type="text" id="username" name="username" required />
            <label htmlFor="password">{lang.inputPassword}</label>
            <input type="password" id="password" name="password" required />
            <div className={o.flex}>
                <button type="submit">
                    {lang.inputBtn + ' '}
                    <svg className={o.button} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="12" height="12" viewBox="0 0 50 50">
                        <path
                            fill="currentColor"
                            d="M 14.988281 3.992188 C 14.582031 3.992188 14.21875 4.238281 14.0625 4.613281 C 13.910156 4.992188 14 5.421875 14.292969 5.707031 L 33.585938 25 L 14.292969 44.292969 C 14.03125 44.542969 13.925781 44.917969 14.019531 45.265625 C 14.109375 45.617188 14.382813 45.890625 14.734375 45.980469 C 15.082031 46.074219 15.457031 45.96875 15.707031 45.707031 L 35.707031 25.707031 C 36.097656 25.316406 36.097656 24.683594 35.707031 24.292969 L 15.707031 4.292969 C 15.519531 4.097656 15.261719 3.992188 14.988281 3.992188 Z"></path>
                    </svg>
                </button>
            </div>
        </form>
    );
}
