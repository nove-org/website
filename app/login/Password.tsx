'use client';

import Databox from '@app/Databox';
import Link from 'next/link';
import Loader from '@app/Loader';
import o from './Login.module.sass';
import { useState } from 'react';

export default function Password({
    et,
    lang,
}: {
    et?: string;
    lang: {
        password: string;
        passwordP: string;
        reset: string;
        new: string;
        login: string;
    };
}) {
    const [loading, setLoading] = useState<boolean>(false);
    const triggerLoading = () => (document.getElementById('password') as HTMLInputElement)?.value?.length > 0 && setLoading(true);
    return (
        <>
            <Databox id="password" title={lang.password} type="password" required={true} placeholder={lang.passwordP} onKeyDown={(e) => e.key === 'Enter' && triggerLoading()} />
            <Link className={o.link} href="/password-reset">
                {lang.reset}
            </Link>
            <div className={o.buttons}>
                <Link className="btn" href="/register">
                    {lang.new}
                </Link>
                <button className={'btn ' + (loading && !et ? o.loading : o.highlight)} onClick={() => triggerLoading()} type="submit">
                    {loading && !et ? (
                        <Loader type="button" />
                    ) : (
                        <>
                            {lang.login}
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M 14 4.9296875 L 12.5 6.4296875 L 17.070312 11 L 3 11 L 3 13 L 17.070312 13 L 12.5 17.570312 L 14 19.070312 L 21.070312 12 L 14 4.9296875 z"></path>
                            </svg>
                        </>
                    )}
                </button>
            </div>
        </>
    );
}
