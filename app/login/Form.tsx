'use client';

import { setCookie } from 'cookies-next';
import { useState } from 'react';
import { COOKIE_HOSTNAME } from '@util/CONSTS';
import o from '@sass/popup.module.sass';
import u from '@sass/login.module.sass';
import { loginCall } from '@util/helpers/client/Account';
import { errorHandler } from '@util/helpers/Main';
import { AxiosError } from 'axios';
import { Response } from '@util/schema';
import Link from 'next/link';

export default function LoginForm({
    searchParam,
    lang,
}: {
    searchParam: string | undefined;
    lang: {
        inputLogin: string;
        inputPassword: string;
        inputBtn: string;
        mfaTitle: string;
        mfaDescription: string;
        mfaCancel: string;
        mfaSubmit: string;
        mfaLabel: string;
        forgor: string;
    };
}) {
    const [mfaPopup, setMfaPopup] = useState<boolean>(false);
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();

    function setLogin(token: string, userId: string) {
        setCookie('napiAuthorizationToken', `${token} ${userId}`, {
            maxAge: 3 * 30 * 24 * 60 * 60,
            domain: COOKIE_HOSTNAME,
            sameSite: 'strict',
            secure: true,
        });

        const uri = searchParam || '/account';
        if (uri == '__CLOSE__') window.close();
        else window.location.replace(uri);
    }

    function errorLogin(napiErr: Response<null>, username?: string, password?: string) {
        if (!mfaPopup && (napiErr?.body?.error?.code === 'invalid_mfa_token' || napiErr?.body?.error?.code === 'mfa_required'))
            return setUsername(username), setPassword(password), setMfaPopup(true);

        alert(errorHandler(napiErr));
    }

    const handleLogin = async (e: FormData) =>
        await loginCall({ username: e.get('username')?.toString(), password: e.get('password')?.toString() })
            .then((user) => setLogin(user?.token, user?.id))
            .catch((err: AxiosError) => errorLogin(err.response?.data as Response<null>, e.get('username')?.toString(), e.get('password')?.toString()));

    const handleMfa = async (e: FormData) =>
        await loginCall({ username, password, mfa: e.get('mfa')?.toString() })
            .then((user) => setLogin(user?.token, user?.id))
            .catch((err: AxiosError) => errorLogin(err.response?.data as Response<null>));

    return (
        <>
            {mfaPopup ? (
                <div className={o.popup}>
                    <div className={o.container}>
                        <h1>{lang.mfaTitle}</h1>
                        <p>{lang.mfaDescription}</p>
                        <form action={handleMfa}>
                            <label>
                                {lang.mfaLabel}
                                <input
                                    required
                                    minLength={6}
                                    maxLength={10}
                                    autoComplete="off"
                                    autoFocus={true}
                                    autoCorrect="off"
                                    type="text"
                                    placeholder={'123456'}
                                    id="mfa"
                                    name="mfa"
                                />
                            </label>
                            <div className={o.footer}>
                                <button onClick={() => setMfaPopup(false)} type="reset">
                                    {lang.mfaCancel}
                                </button>
                                <button type="submit">{lang.mfaSubmit}</button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
            <form id="loginForm" action={handleLogin} className={u.login}>
                <label htmlFor="username">
                    {lang.inputLogin}
                    <input type="text" id="username" name="username" placeholder="Email or username" required />
                </label>
                <label htmlFor="password">
                    {lang.inputPassword}
                    <input type="password" id="password" name="password" placeholder="Your password" required />
                    <a href="/password-reset">{lang.forgor}</a>
                </label>
                <div className={u.buttons}>
                    <Link href="/register">{'Create account'}</Link>
                    <button type="submit">{'Sign in'}</button>
                </div>
            </form>
        </>
    );
}
