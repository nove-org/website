'use client';

import { Response, User } from '@/Interfaces';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { axiosClient } from '@/utils';
import { getCookie, setCookie } from 'cookies-next';
import Image from 'next/image';
import Loader from '@/loader';

import o from '~/login/page.module.sass';

export default function Login() {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<Response<User>>();
    const [twoFactorAuth, setTwoFactorAuth] = useState<boolean>(false);
    const [tFALoader, setTFALoader] = useState<boolean>(false);
    const [postError, setPostError] = useState<string>();
    const searchParams = useSearchParams();

    const throwError = (message?: string, bool?: boolean) => {
        if (bool === false) return setPostError('');

        if (message) {
            setPostError(message.charAt(0).toUpperCase() + message.slice(1).toLowerCase());

            setTimeout(() => setPostError(''), 5000);
        }
    };

    useEffect(() => {
        const getData = async () => {
            await axiosClient
                .get('/users/me', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Owner ${getCookie('token')}`,
                    },
                })
                .then((res) => (res.data.body.data ? window.location.replace(searchParams.get('redirectBack') || '/account') : setLoading(false), setData(res.data)))
                .catch((err) => (setLoading(false), err.response?.data ? setData(err.response.data) : null));
        };

        getData();
    }, [searchParams]);

    const handleLogin = async (event: any) => {
        event.preventDefault();

        await axiosClient
            .post('/users/login', { username: event.target.username.value, password: event.target.password.value }, { headers: { 'Content-Type': 'application/json' } })
            .then(async (res) => {
                if (res.data?.body?.error) return throwError(res.data.body.error.message);
                else {
                    setCookie('token', res.data.body.data.token, {
                        maxAge: 3 * 30 * 24 * 60 * 60,
                        domain: 'nove.team',
                        sameSite: 'strict',
                        secure: true,
                    });

                    const redirect = searchParams.get('redirectBack') || '/account';

                    if (redirect == '__CLOSE__') window.close();
                    else window.location.replace(redirect);
                }
            })
            .catch((err) => (err.response?.data.body.error ? throwError(err.response.data.body.error.message) : null));
    };

    const handleSubmit = async () => {
        const i1 = (document.getElementById('0') as HTMLInputElement).value,
            i2 = (document.getElementById('1') as HTMLInputElement).value,
            i3 = (document.getElementById('2') as HTMLInputElement).value,
            i4 = (document.getElementById('3') as HTMLInputElement).value,
            i5 = (document.getElementById('4') as HTMLInputElement).value,
            i6 = (document.getElementById('5') as HTMLInputElement).value;

        const code = parseInt(i1.charAt(0) + i2.charAt(0) + i3.charAt(0) + i4.charAt(0) + i5.charAt(0) + i6.charAt(0));

        if (isNaN(code) || code.toString().length !== 6) return;

        setTFALoader(true);

        setTimeout(() => setTFALoader(false), 2000);

        // TODO: Implement code for submitting 2FA code.
    };

    const handlePaste = (event: any) => {
        event.preventDefault();

        const cpData = event.clipboardData?.getData('text');

        if (isNaN(parseInt(cpData ? cpData : ''))) return;

        for (let i = 0; i < (cpData?.length || 1); i++) {
            if (!document.getElementById(i.toString())) return;

            setTimeout(() => {
                const value = parseInt(cpData?.charAt(i));

                if (isNaN(value)) return;

                (document.getElementById(i.toString()) as HTMLInputElement).value = parseInt(cpData?.charAt(i)).toString() || '';

                if (i + 1 >= cpData.length) handleSubmit();

                if (!document.getElementById((i + 1).toString())) return;

                (document.getElementById((i + 1).toString()) as HTMLInputElement).focus();
            }, i * 150);
        }
    };

    const handleInput = (event: ChangeEvent) => {
        if (isNaN(parseInt((event.target as HTMLInputElement).value))) return ((event.target as HTMLInputElement).value = '');

        handleSubmit();

        document.getElementById((parseInt(event.target.id) + 1).toString())?.focus();
    };

    return loading ? (
        <main>
            <title>Login — Nove</title>
            <Loader type="window" text="Loading data from our servers..." />
        </main>
    ) : data?.body ? (
        <main>
            <title>Login — Nove</title>
            {postError ? <p className="error">{postError}</p> : null}
            <section className={o.login}>
                {twoFactorAuth ? (
                    tFALoader ? (
                        <div className={o.box}>
                            <Image src="/cdn/assets/logo.png" width={64} height={64} alt="Nove logo" />
                            <h1>Two factor authentication</h1>
                            <p>Provide code generated by your authenticator app.</p>
                            <div className={o.center}>
                                <Loader />
                            </div>
                        </div>
                    ) : (
                        <div className={o.box}>
                            <Image src="/cdn/assets/logo.png" width={64} height={64} alt="Nove logo" />
                            <h1>Two factor authentication</h1>
                            <p>Provide code generated by your authenticator app.</p>
                            <form onSubmit={(event: FormEvent) => event.preventDefault()} className={o.tfa}>
                                <input onChange={handleInput} onPaste={handlePaste} type="text" maxLength={1} id="0" />
                                <input onChange={handleInput} type="text" maxLength={1} id="1" />
                                <input onChange={handleInput} type="text" maxLength={1} id="2" />
                                <input onChange={handleInput} type="text" maxLength={1} id="3" />
                                <input onChange={handleInput} type="text" maxLength={1} id="4" />
                                <input onChange={handleSubmit} type="text" maxLength={1} id="5" />
                            </form>
                        </div>
                    )
                ) : (
                    <div className={o.box}>
                        <Image src="/cdn/assets/logo.png" width={64} height={64} alt="Nove logo" />
                        <h1>Welcome back</h1>
                        <p>Login to your Nove account and get started.</p>
                        <form id="loginStep1" onSubmit={handleLogin}>
                            <label htmlFor="username">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                                    <path
                                        fill="currentColor"
                                        d="M 24 4 C 18.494917 4 14 8.494921 14 14 C 14 19.505079 18.494917 24 24 24 C 29.505083 24 34 19.505079 34 14 C 34 8.494921 29.505083 4 24 4 z M 12.5 28 C 10.032499 28 8 30.032499 8 32.5 L 8 33.699219 C 8 36.640082 9.8647133 39.277974 12.708984 41.091797 C 15.553256 42.90562 19.444841 44 24 44 C 28.555159 44 32.446744 42.90562 35.291016 41.091797 C 38.135287 39.277974 40 36.640082 40 33.699219 L 40 32.5 C 40 30.032499 37.967501 28 35.5 28 L 12.5 28 z"></path>
                                </svg>
                                <input type="text" id="username" placeholder="Username or e-mail" />
                            </label>
                            <label htmlFor="password">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                                    <path
                                        fill="currentColor"
                                        d="M30.5,5C23.596,5,18,10.596,18,17.5c0,1.149,0.168,2.257,0.458,3.314L5.439,33.833C5.158,34.114,5,34.496,5,34.894V41.5	C5,42.328,5.671,43,6.5,43h7c0.829,0,1.5-0.672,1.5-1.5V39h3.5c0.829,0,1.5-0.672,1.5-1.5V34h3.5c0.829,0,1.5-0.672,1.5-1.5v-3.788	C26.661,29.529,28.524,30,30.5,30C37.404,30,43,24.404,43,17.5S37.404,5,30.5,5z M32,19c-1.657,0-3-1.343-3-3s1.343-3,3-3	s3,1.343,3,3S33.657,19,32,19z"></path>
                                </svg>
                                <input type="password" id="password" placeholder="Password" />
                            </label>
                            <button type="submit">Login</button>
                        </form>
                    </div>
                )}
            </section>
        </main>
    ) : (
        <main>
            <title>Login — Nove</title>
            <Loader
                type="hidden"
                text={
                    data?.body?.error?.message
                        ? data.body.error.message.charAt(0) + data.body.error.message.slice(1).toLowerCase()
                        : "Something went wrong and we can't reach the API"
                }
            />
        </main>
    );
}
