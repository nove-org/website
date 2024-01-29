'use client';

import { useState } from 'react';
import o from '@sass/popup.module.sass';
import { deleteMe } from '@util/helpers/client/User';
import { errorHandler } from '@util/helpers/Main';
import { AxiosError } from 'axios';
import { Response, User } from '@util/schema';

export default function Delete({
    lang,
    user,
}: {
    user: User;
    lang: {
        btn: string;
        h1: string;
        p: string;
        label: string;
        mfa: string;
        pc: string;
        cancel: string;
    };
}) {
    const [popup, setPopup] = useState<boolean>(false);

    const handleSubmit = async (e: FormData) =>
        await deleteMe({ password: e.get('password')?.toString(), code: e.get('mfa')?.toString() })
            .then(() => window.location.replace('/logout'))
            .catch((err: AxiosError) => alert(errorHandler(err.response?.data as Response<null>)));

    return (
        <>
            <button onClick={() => setPopup((p) => !p)}>{lang.btn}</button>
            {popup ? (
                <div className={o.popup}>
                    <div className={o.container}>
                        <h1>{lang.h1}</h1>
                        <p>{lang.p}</p>
                        <form action={handleSubmit}>
                            <label>
                                {lang.label}
                                <input
                                    required
                                    minLength={2}
                                    maxLength={128}
                                    autoComplete="off"
                                    autoFocus={false}
                                    autoCorrect="off"
                                    type="password"
                                    placeholder={lang.pc}
                                    id="password"
                                    name="password"
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
                                <button type="submit">{lang.btn}</button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
}
