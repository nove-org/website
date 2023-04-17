'use client';

import o from '~/account/page.module.sass';

export default function Privacy() {
    return (
        <div className={o.content}>
            <h1 className={o.title}>Overview</h1>
            <div className={o.card}></div>
            <div className={o.connections}></div>
        </div>
    );
}
