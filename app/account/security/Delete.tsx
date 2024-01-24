'use client';

import { useState } from 'react';
import o from '@sass/popup.module.sass';
import { deleteUser } from '@util/helpers/client/User';
import { errorHandler } from '@util/helpers/Main';
import { AxiosError } from 'axios';
import { Response } from '@util/schema';

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

    const handleSubmit = async (e: FormData) =>
        await deleteUser({ password: e.get('password')?.toString() })
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
