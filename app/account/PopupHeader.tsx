'use client';

import { User } from '@util/schema';

export default function PopupHeader({ user, domain, lang }: { user: User; domain: string; lang: { copied: string; copy: string } }) {
    const host = domain.startsWith('.') ? domain.slice(1) : domain;
    return (
        <header>
            <h1>{user.username}</h1>
            <p>
                @{user.username}/{host}
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(`@${user.username}/${host}`);

                        const elm = document.getElementById('nav-dashboard-link')!;
                        elm.innerText = lang.copied;
                        setTimeout(() => (elm.innerText = lang.copy), 1500);
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M 4 2 C 2.895 2 2 2.895 2 4 L 2 18 L 4 18 L 4 4 L 18 4 L 18 2 L 4 2 z M 8 6 C 6.895 6 6 6.895 6 8 L 6 20 C 6 21.105 6.895 22 8 22 L 20 22 C 21.105 22 22 21.105 22 20 L 22 8 C 22 6.895 21.105 6 20 6 L 8 6 z M 8 8 L 20 8 L 20 20 L 8 20 L 8 8 z"></path>
                    </svg>
                    <span id="nav-dashboard-link">{lang.copy}</span>
                </button>
            </p>
        </header>
    );
}
