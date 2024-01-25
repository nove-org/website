'use client';

import { useState } from 'react';
import o from '@sass/popup.module.sass';
import uc from '@sass/account/admin/page.module.sass';
import { Response, User } from '@util/schema';
import { useRouter } from 'next/navigation';
import { disableUser } from '@util/helpers/client/User';
import { errorHandler } from '@util/helpers/Main';
import { AxiosError } from 'axios';

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
    const router = useRouter();
    const [popup, setPopup] = useState<boolean>(false);

    const handleAction = async (e: FormData) =>
        await disableUser({ id: target.id, data: target, code: e.get('mfa')?.toString(), reason: e.get('reason')?.toString() })
            .then(() => (setPopup(false), router.refresh()))
            .catch((err: AxiosError) => alert(errorHandler(err.response?.data as Response<null>)));

    return (
        <>
            <button className={uc.ac} onClick={() => setPopup(true)}>
                {lang.btnConfirm}
            </button>
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
