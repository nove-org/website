'use client';

import Databox from '@app/Databox';
import Link from 'next/link';
import Loader from '@app/Loader';
import o from './Login.module.sass';
import { useState } from 'react';

export default function MFA({
    lang,
}: {
    lang: {
        mfa: string;
        mfaP: string;
        new: string;
        login: string;
    };
}) {
    const [loading, setLoading] = useState<boolean>(false);
    const triggerLoading = () => (document.getElementById('mfa') as HTMLInputElement)?.value?.length > 0 && setLoading(true);

    return (
        <>
            <Databox id="mfa" title={lang.mfa} description={lang.mfaP} type="text" required={true} placeholder="123456" onKeyDown={(e) => e.key === 'Enter' && triggerLoading()} />
            <div className={o.buttons}>
                <Link className="btn" href="/register">
                    {lang.new}
                </Link>
                <button className={'btn ' + (loading ? o.loading : o.highlight)} onClick={() => triggerLoading()} type="submit">
                    {loading ? (
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
