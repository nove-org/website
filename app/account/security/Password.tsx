'use client';

import { useState } from 'react';
import o from '@sass/popup.module.sass';
import { setCookie } from 'cookies-next';
import { COOKIE_HOSTNAME } from '@util/CONSTS';
import { useRouter } from 'next/navigation';
import { patchPassword } from '@util/helpers/client/User';
import { AxiosError } from 'axios';
import { errorHandler } from '@util/helpers/Main';
import { Response, User } from '@util/schema';

export default function Password({
    lang,
    user,
}: {
    user: User;
    lang: {
        btn: string;
        h1: string;
        p: string;
        label1: string;
        label2: string;
        mfa: string;
        pc1: string;
        pc2: string;
        cancel: string;
        save: string;
    };
}) {
    const router = useRouter();
    const [popup, setPopup] = useState<boolean>(false);

    const handleSubmit = async (e: FormData) =>
        await patchPassword({ oldPassword: e.get('oldPassword')?.toString(), newPassword: e.get('newPassword')?.toString(), code: e.get('mfa')?.toString() })
            .then((user) => {
                setCookie('napiAuthorizationToken', `${user?.token} ${user?.id}`, {
                    maxAge: 3 * 30 * 24 * 60 * 60,
                    domain: COOKIE_HOSTNAME,
                    sameSite: 'strict',
                    secure: true,
                });

                router.refresh();
            })
            .catch((err: AxiosError) => alert(errorHandler(err.response?.data as Response<null>)));

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
            {popup ? (
                <div className={o.popup}>
                    <div className={o.container}>
                        <h1>{lang.h1}</h1>
                        <p>{lang.p}</p>
                        <form action={handleSubmit}>
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
                            {user.mfaEnabled ? (
                                <label>
                                    {lang.mfa}
                                    <input
                                        required
                                        minLength={6}
                                        maxLength={16}
                                        autoComplete="off"
                                        autoFocus={false}
                                        autoCorrect="off"
                                        type="text"
                                        placeholder="123456"
                                        id="mfa"
                                        name="mfa"
                                    />
                                </label>
                            ) : null}
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
