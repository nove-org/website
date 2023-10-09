'use client';

import { useState } from 'react';
import o from '@sass/account/admin/page.module.sass';
import { axiosClient } from '@util/axios';
import { getCookie } from 'cookies-next';
import { Response, User } from '@util/schema';

export default function Disable({
    lang,
    u,
    target,
}: {
    lang: {
        btnConfirm: string;
        btnCancel: string;
        h1: string;
        p: string;
        label: string;
        labelReason: string;
    };
    u: User;
    target: User;
}) {
    const [popup, setPopup] = useState<boolean>(false);
    const [postError, setPostError] = useState<string>();

    const throwError = (message?: string, bool?: boolean) => {
        if (bool === false) return setPostError('');

        if (message) {
            setPostError(message.charAt(0).toUpperCase() + message.slice(1).toLowerCase());

            setTimeout(() => setPostError(''), 5000);
        }
    };

    const handleAction = async (form: FormData) => {
        if (!target.disabled) {
            return await axiosClient
                .post(
                    `/v1/admin/users/${target.id}/disable`,
                    {
                        reason: form.get('reason'),
                    },
                    {
                        headers: { Authorization: `Owner ${getCookie('napiAuthorizationToken')}`, 'x-mfa': (form.get('mfa') as string) || '' },
                    }
                )
                .then((r) => window.location.reload())
                .catch((e) => (e?.response?.data?.body?.error ? throwError(e.response.data.body.error.message) : console.error(e)));
        } else {
            return await axiosClient
                .delete(`/v1/admin/users/${target.id}/disable`, {
                    headers: { Authorization: `Owner ${getCookie('napiAuthorizationToken')}`, 'x-mfa': (form.get('mfa') as string) || '' },
                })
                .then((r) => window.location.reload())
                .catch((e) => (e?.response?.data?.body?.error ? throwError(e.response.data.body.error.message) : console.error(e)));
        }
    };

    return (
        <>
            {postError ? <p className="error">{postError}</p> : null}
            <button onClick={() => setPopup(true)}>{lang.btnConfirm}</button>
            {popup ? (
                <div className={o.popup}>
                    <div className={o.container}>
                        <h1>{lang.h1}</h1>
                        <p>{lang.p}</p>
                        <form action={handleAction}>
                            {!target.disabled ? (
                                <label>
                                    {lang.labelReason}
                                    <input type="text" required autoComplete="off" autoFocus={true} autoCorrect="off" id="reason" name="reason" placeholder={lang.labelReason} />
                                </label>
                            ) : null}
                            <label>
                                {lang.label}
                                <input
                                    required
                                    minLength={6}
                                    maxLength={10}
                                    autoComplete="off"
                                    autoFocus={false}
                                    autoCorrect="off"
                                    type="text"
                                    placeholder={'000000'}
                                    id="mfa"
                                    name="mfa"
                                />
                            </label>
                            <div className={o.footer}>
                                <button onClick={() => setPopup(false)} type="reset">
                                    {lang.btnCancel}
                                </button>
                                <button type="submit">
                                    {lang.btnConfirm} &quot;{target.username}&quot;
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
}
