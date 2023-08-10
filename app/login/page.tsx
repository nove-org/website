'use client';

import { axiosClient } from '@util/axios';
import { useSearchParams } from 'next/navigation';
import Logo from '../Logo';
import o from '@sass/login.module.sass';
import { getCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { COOKIE_HOSTNAME } from '@util/config';
import Loader from '@app/Loader';

export default function Login() {
    const [loading, setLoading] = useState<boolean>(true);
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
        const fetchUser = async () =>
            await axiosClient
                .get('/v1/users/me', { headers: { Authorization: `Owner ${getCookie('napiAuthorizationToken')}` } })
                .then((user) => (user.data?.body?.data?.username ? window.location.replace(searchParams.get('redirectBack') || '/account') : setLoading(false)))
                .catch(() => setLoading(false));
        fetchUser();
    }, [searchParams]);

    const handleLogin = async (form: FormData) => {
        const user = await axiosClient
            .post('/v1/users/login', { username: form.get('username'), password: form.get('password') })
            .then((user) => {
                if (user?.data?.body?.error) return throwError(user.data.body.error.message);
                else {
                    setCookie('napiAuthorizationToken', user.data.body.data.token, {
                        maxAge: 3 * 30 * 24 * 60 * 60,
                        domain: COOKIE_HOSTNAME,
                        sameSite: 'strict',
                        secure: true,
                    });

                    const uri = searchParams.get('redirectBack') || '/account';

                    if (uri == '__CLOSE__') window.close();
                    else window.location.replace(uri);
                }
            })
            .catch((err) => (err?.response?.data?.body?.error ? throwError(err.response.data.body.error.message) : console.error(err)));
    };

    return loading ? (
        <section className={o.box}>
            <Loader type="window" text="Please standby while fetching data..." />
        </section>
    ) : (
        <section className={o.box}>
            <Logo size={48} />
            <h1>Welcome back</h1>
            <p>Provide your credentials to access your Nove account</p>
            <form id="loginForm" action={handleLogin}>
                <label htmlFor="username">Login</label>
                <input type="text" id="username" name="username" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />
                <div className={o.flex}>
                    <button type="submit">
                        Proceed{' '}
                        <svg className={o.button} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="12" height="12" viewBox="0 0 50 50">
                            <path
                                fill="currentColor"
                                d="M 14.988281 3.992188 C 14.582031 3.992188 14.21875 4.238281 14.0625 4.613281 C 13.910156 4.992188 14 5.421875 14.292969 5.707031 L 33.585938 25 L 14.292969 44.292969 C 14.03125 44.542969 13.925781 44.917969 14.019531 45.265625 C 14.109375 45.617188 14.382813 45.890625 14.734375 45.980469 C 15.082031 46.074219 15.457031 45.96875 15.707031 45.707031 L 35.707031 25.707031 C 36.097656 25.316406 36.097656 24.683594 35.707031 24.292969 L 15.707031 4.292969 C 15.519531 4.097656 15.261719 3.992188 14.988281 3.992188 Z"></path>
                        </svg>
                    </button>
                    {postError ? <p className={o.error}>{postError}</p> : null}
                </div>
            </form>
            <a className={o.passwordReset} href="/password-reset">
                Forgot your password?
            </a>
            <svg className={o.left} width="369" height="421" viewBox="0 0 369 421" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_206_257)">
                    <path d="M-17.1175 99.5959C486.128 -180.012 209.998 253.278 376.332 431.615" stroke="url(#paint0_linear_206_257)" strokeWidth="3" />
                    <path d="M-23.1142 82.9993C407.075 -176.883 185.568 252.003 341.819 443.071" stroke="url(#paint1_linear_206_257)" strokeWidth="3" />
                </g>
                <defs>
                    <linearGradient id="paint0_linear_206_257" x1="124.053" y1="30.5978" x2="268.983" y2="467.246" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#DB4B53" />
                        <stop offset="1" stopColor="#EF1973" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_206_257" x1="98.0528" y1="19.751" x2="248.806" y2="473.943" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#DB4B53" />
                        <stop offset="1" stopColor="#EF1973" />
                    </linearGradient>
                    <clipPath id="clip0_206_257">
                        <rect width="369" height="421" fill="white" />
                    </clipPath>
                </defs>
            </svg>
            <svg className={o.right} width="485" height="437" viewBox="0 0 485 437" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_206_264)">
                    <path d="M486.073 295.863C138.591 679.277 220.501 165.191 0.439427 -1.89633" stroke="url(#paint0_linear_206_264)" strokeWidth="3" />
                    <path d="M533.034 289.497C188.361 677.116 261.747 150.266 35.8579 -25.5479" stroke="url(#paint1_linear_206_264)" strokeWidth="3" />
                </g>
                <defs>
                    <linearGradient id="paint0_linear_206_264" x1="384.93" y1="393.177" x2="83.8931" y2="-57.6251" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF007A" />
                        <stop offset="1" stopColor="#FF003D" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_206_264" x1="432.443" y1="387.638" x2="119.312" y2="-81.2766" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF007A" />
                        <stop offset="1" stopColor="#FF003D" />
                    </linearGradient>
                    <clipPath id="clip0_206_264">
                        <rect width="485" height="437" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </section>
    );
}
