'use client';

import { useState } from 'react';
import o from '@sass/account/security/page.module.sass';
import { axiosClient } from '@util/axios';
import { getCookie } from 'cookies-next';
import { User } from '@util/schema';

export default function Recovery({
    lang,
    u,
}: {
    lang: {
        btn: string;
        h1: string;
        p: string;
        gotIt: string;
        cancel: string;
        submit: string;
        labelCode: string;
    };
    u: User;
}) {
    const [popup, setPopup] = useState<boolean>(false);
    const [dataPopup, setDataPopup] = useState<boolean>(true);
    const [codes, setCodes] = useState<string[]>();
    const [postError, setPostError] = useState<string>();

    const throwError = (message?: string, bool?: boolean) => {
        if (bool === false) return setPostError('');

        if (message) {
            setPostError(message.charAt(0).toUpperCase() + message.slice(1).toLowerCase());

            setTimeout(() => setPostError(''), 4000);
        }
    };

    const handleSubmit = async (form: FormData) => {
        await axiosClient
            .get('/v1/users/me/mfa/securityCodes', {
                headers: {
                    Authorization: `Owner ${getCookie('napiAuthorizationToken')}`,
                    'x-mfa': (form.get('mfa') as string) || '',
                },
            })
            .then((r) => {
                setPopup(false);
                setDataPopup(true);
                setCodes(r?.data?.body?.data);
            })
            .catch((e) => (e?.response?.data?.body?.error ? throwError(e.response.data.body.error.message) : console.error(e)));
    };

    return (
        <>
            {postError ? <p className="error">{postError}</p> : null}
            <li className={u.mfaEnabled ? '' : 'disabled'} onClick={() => (u.mfaEnabled ? setPopup(true) : null)}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M 22 2 L 19.058594 4.9414062 C 16.865786 2.7436807 13.666769 1.5536385 10.212891 2.15625 C 6.1828906 2.86025 2.9227344 6.0746563 2.1777344 10.097656 C 1.0007344 16.443656 5.864 22 12 22 C 17.134 22 21.3785 18.109094 21.9375 13.121094 C 22.0045 12.525094 21.5375 12 20.9375 12 C 20.4375 12 20.007125 12.368234 19.953125 12.865234 C 19.520125 16.870234 16.119 20 12 20 C 7.059 20 3.1501562 15.498859 4.1601562 10.380859 C 4.7681562 7.3008594 7.2335937 4.8107812 10.308594 4.1757812 C 13.170804 3.5850239 15.832013 4.545023 17.642578 6.3574219 L 15 9 L 22 9 L 22 2 z"></path>
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
                                {lang.labelCode}
                                <input type="text" required autoComplete="off" autoFocus={true} autoCorrect="off" id="mfa" name="mfa" placeholder="000000" />
                            </label>
                            <div className={o.footer}>
                                <button onClick={() => setPopup(false)} type="reset">
                                    {lang.cancel}
                                </button>
                                <button type="submit">{lang.submit}</button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
            {dataPopup && codes ? (
                <div className={o.popup}>
                    <div className={o.container}>
                        <h1>{lang.h1}</h1>
                        <p>{lang.p}</p>
                        <div className={o.codes}>
                            {codes.map((code) => (
                                <p key={code}>{code}</p>
                            ))}
                        </div>
                        <form>
                            <div className={o.footer}>
                                <button onClick={() => setDataPopup(false)} type="reset">
                                    {lang.gotIt}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
}
