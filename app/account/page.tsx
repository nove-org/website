'use client';

import Image from 'next/image';
import o from '~/account/page.module.sass';

export default function Privacy() {
    return (
        <div className={o.content}>
            <h1 className={o.title}>Overview</h1>
            <div className={o.card}>
                <label htmlFor="image">
                    <Image src="https://api.nove.team/v1/users/00000000/avatar.webp" width={96} height={96} alt="User avatar" />
                </label>
                <div className={o.content}>
                    <div className={o.username}>
                        <h1>wnm210</h1>
                        <button>Edit</button>
                    </div>
                    <div className={o.email}>wnm210@****.team</div>
                </div>
            </div>
            <div className={o.connections}></div>
        </div>
    );
}
