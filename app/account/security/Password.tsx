'use client';

import { useState } from 'react';
import o from '@sass/account/security/page.module.sass';
import { getCookie, setCookie } from 'cookies-next';
import { axiosClient } from '@util/axios';
import { COOKIE_HOSTNAME } from '@util/config';
import { useRouter } from 'next/navigation';

export default function Password({
    lang,
}: {
    lang: {
        btn: string;
        h1: string;
        p: string;
        label1: string;
        label2: string;
        pc1: string;
        pc2: string;
        cancel: string;
        save: string;
    };
}) {
    const router = useRouter();
    const [popup, setPopup] = useState<boolean>(false);
    const [postError, setPostError] = useState<string>();

    const throwError = (message?: string, bool?: boolean) => {
        if (bool === false) return setPostError('');

        if (message) {
            setPostError(message.charAt(0).toUpperCase() + message.slice(1).toLowerCase());

            setTimeout(() => setPostError(''), 4000);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        await axiosClient
            .patch(
                '/v1/users/password',
                { oldPassword: e.target.oldPassword.value, newPassword: e.target.newPassword.value },
                { headers: { Authorization: `Owner ${getCookie('napiAuthorizationToken')}` } }
            )
            .then((res) => {
                const token = res.data.body.data.token;

                setCookie('napiAuthorizationToken', token, {
                    maxAge: 3 * 30 * 24 * 60 * 60,
                    domain: COOKIE_HOSTNAME,
                    sameSite: 'strict',
                    secure: true,
                });

                router.refresh();
            })
            .catch((err) =>
                err.response.data.body.error
                    ? throwError(err.response.data.body.error?.details ? err.response.data.body.error.details[0].message : err.response.data.body.error.message)
                    : null
            );
    };

    return (
        <>
            <li onClick={() => setPopup((p) => !p)}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M 12 1 C 8.6761905 1 6 3.6761905 6 7 L 6 8 C 4.9 8 4 8.9 4 10 L 4 20 C 4 21.1 4.9 22 6 22 L 18 22 C 19.1 22 20 21.1 20 20 L 20 10 C 20 8.9 19.1 8 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 8 8 L 8 7 C 8 4.7238095 9.7238095 3 12 3 z M 8 14 C 8.55 14 9 14.45 9 15 C 9 15.55 8.55 16 8 16 C 7.45 16 7 15.55 7 15 C 7 14.45 7.45 14 8 14 z M 12 14 C 12.55 14 13 14.45 13 15 C 13 15.55 12.55 16 12 16 C 11.45 16 11 15.55 11 15 C 11 14.45 11.45 14 12 14 z M 16 14 C 16.55 14 17 14.45 17 15 C 17 15.55 16.55 16 16 16 C 15.45 16 15 15.55 15 15 C 15 14.45 15.45 14 16 14 z"></path>
                </svg>

                <h1>
                    {lang.btn}
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 30 30">
                        <path
                            fill="currentColor"
                            d="M 9.9902344 3.9902344 A 1.0001 1.0001 0 0 0 9.2929688 5.7070312 L 18.585938 15 L 9.2929688 24.292969 A 1.0001 1.0001 0 1 0 10.707031 25.707031 L 20.707031 15.707031 A 1.0001 1.0001 0 0 0 20.707031 14.292969 L 10.707031 4.2929688 A 1.0001 1.0001 0 0 0 9.9902344 3.9902344 z"></path>
                    </svg>
                </h1>
            </li>
            {postError ? <p className="error">{postError}</p> : null}
            {popup ? (
                <div className={o.popup}>
                    <div className={o.container}>
                        <h1>{lang.h1}</h1>
                        <p>{lang.p}</p>
                        <form onSubmit={handleSubmit}>
                            <label>
                                {lang.label1}
                                <input
                                    required
                                    minLength={1}
                                    maxLength={128}
                                    autoComplete="off"
                                    autoFocus={true}
                                    autoCorrect="off"
                                    type="password"
                                    placeholder={lang.pc1}
                                    id="oldPassword"
                                    name="oldPassword"
                                />
                            </label>
                            <label>
                                {lang.label2}
                                <input
                                    required
                                    minLength={8}
                                    maxLength={128}
                                    autoComplete="off"
                                    autoFocus={false}
                                    autoCorrect="off"
                                    type="password"
                                    placeholder={lang.pc2}
                                    id="newPassword"
                                    name="newPassword"
                                />
                            </label>
                            <div className={o.footer}>
                                <button onClick={() => setPopup(false)} type="reset">
                                    {lang.cancel}
                                </button>
                                <button type="submit">{lang.save}</button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
}
