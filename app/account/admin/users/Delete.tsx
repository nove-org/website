'use client';

import { useState } from 'react';
import o from '@sass/popup.module.sass';
import { axiosClient } from '@util/axios';
import { getCookie } from 'cookies-next';
import { User } from '@util/schema';
import { useRouter } from 'next/navigation';

export default function Delete({
    lang,
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
    target: User;
}) {
    const router = useRouter();
    const [popup, setPopup] = useState<boolean>(false);
    const [postError, setPostError] = useState<string>();

    const throwError = (message?: string, bool?: boolean) => {
        if (bool === false) return setPostError('');

        if (message) {
            setPostError(message.charAt(0).toUpperCase() + message.slice(1).toLowerCase());

            setTimeout(() => setPostError(''), 5000);
        }
    };

    const handleAction = async (form: FormData) =>
        await axiosClient
            .patch(
                `/v1/admin/users/${target.id}/delete`,
                {
                    reason: form.get('reason'),
                },
                {
                    headers: { Authorization: `Owner ${getCookie('napiAuthorizationToken')}`, 'x-mfa': (form.get('mfa') as string) || '' },
                }
            )
            .then((r) => (setPopup(false), router.refresh()))
            .catch((e) => (e?.response?.data?.body?.error ? throwError(e.response.data.body.error.message) : console.error(e)));

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
                            <label>
                                {lang.labelReason}
                                <input type="text" required autoComplete="off" autoFocus={true} autoCorrect="off" id="reason" name="reason" placeholder={lang.labelReason} />
                            </label>
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
