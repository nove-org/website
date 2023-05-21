'use client';

import { getCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

import o from '~/cookie.module.sass';

export default function CookiePrompt() {
    const [cookiePrompt, setCookiePrompt] = useState<boolean>(false);

    useEffect(() => {
        setCookiePrompt(!getCookie('cookies'));
    }, []);

    return cookiePrompt ? (
        <div className={o.box} id="cookiePrompt">
            <p>We use cookies to store your account credentials so you don&apos;t have to log in each time you enter the website</p>
            <button
                onClick={() => {
                    (document.getElementById('cookiePrompt') as HTMLElement).style.display = 'none';
                    setCookie('cookies', 'set', {
                        maxAge: 1 * 30 * 24 * 60 * 60,
                        domain: 'nove.team',
                        sameSite: 'strict',
                        secure: true,
                    });
                }}>
                Got it!
            </button>
        </div>
    ) : (
        <></>
    );
}
