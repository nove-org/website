'use client';

import { useState } from 'react';
import o from '@sass/popup.module.sass';
import { axiosClient } from '@util/axios';
import { getCookie } from 'cookies-next';

export default function Delete({
    lang,
}: {
    lang: {
        btn: string;
        h1: string;
        p: string;
        label: string;
        pc: string;
        cancel: string;
    };
}) {
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
            .post('/v1/users/me/delete', { password: e.target.password.value }, { headers: { Authorization: `Owner ${getCookie('napiAuthorizationToken')}` } })
            .then(() => window.location.replace('/logout'))
            .catch((err) =>
                err.response.data.body.error
                    ? throwError(err.response.data.body.error?.details ? err.response.data.body.error.details[0].message : err.response.data.body.error.message)
                    : null
            );
    };

    return (
        <>
            <button onClick={() => setPopup((p) => !p)}>{lang.btn}</button>
            {postError ? <p className="error">{postError}</p> : null}
            {popup ? (
                <div className={o.popup}>
                    <div className={o.container}>
                        <h1>{lang.h1}</h1>
                        <p>{lang.p}</p>
                        <form onSubmit={handleSubmit}>
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
