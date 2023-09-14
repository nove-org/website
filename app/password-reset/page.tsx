'use client';

import { axiosClient } from '@util/axios';
import { useSearchParams } from 'next/navigation';
import Logo from '../Logo';
import o from '@sass/login.module.sass';
import { getCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { COOKIE_HOSTNAME } from '@util/config';
import Loader from '@app/Loader';
import Lines from '@app/login/Lines';

export default function PasswordReset() {
    const [loading, setLoading] = useState<boolean>(false);
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

    const handleLogin = async (form: FormData) =>
        await axiosClient
            .post('/v1/users/passwordRecovery', { email: form.get('email'), newPassword: form.get('password') })
            .then((user) => alert('Confirmation email was sent if this account exists'))
            .catch((err) => (err?.response?.data?.body?.error ? throwError(err.response.data.body.error.message) : console.error(err)));

    return loading ? (
        <section className={o.box}>
            <title>Nove | Reset your password</title>
            <Loader type="window" text="Please standby while we fetch the data..." />
            <Lines />
        </section>
    ) : (
        <section className={o.box}>
            <title>Nove | Reset your password</title>
            <Logo size={48} />
            <h1>Password reset</h1>
            <p>Enter your email and new password to continue</p>
            <form id="loginForm" action={handleLogin}>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" />
                <label htmlFor="password">New password</label>
                <input type="password" id="password" name="password" />
                <div className={o.flex}>
                    <button type="submit">
                        Proceed
                        <svg className={o.button} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="12" height="12" viewBox="0 0 50 50">
                            <path
                                fill="currentColor"
                                d="M 14.988281 3.992188 C 14.582031 3.992188 14.21875 4.238281 14.0625 4.613281 C 13.910156 4.992188 14 5.421875 14.292969 5.707031 L 33.585938 25 L 14.292969 44.292969 C 14.03125 44.542969 13.925781 44.917969 14.019531 45.265625 C 14.109375 45.617188 14.382813 45.890625 14.734375 45.980469 C 15.082031 46.074219 15.457031 45.96875 15.707031 45.707031 L 35.707031 25.707031 C 36.097656 25.316406 36.097656 24.683594 35.707031 24.292969 L 15.707031 4.292969 C 15.519531 4.097656 15.261719 3.992188 14.988281 3.992188 Z"></path>
                        </svg>
                    </button>
                    {postError ? <p className="error">{postError}</p> : null}
                </div>
            </form>
            <Lines />
        </section>
    );
}
