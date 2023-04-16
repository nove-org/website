'use client';

import o from '~/docs/page.module.sass';

export default function Docs() {
    return (
        <div className={o.content}>
            <h1 className={o.title}>Hello, World</h1>
            <div className={o.card}>
                <header>Documentation is not finished yet</header>
                <p>Warning: this page is not ready yet. Please check back later. We are still building the documentation</p>
            </div>
            <p>
                If you are here it means that <code>layout.tsx</code> sidebar handling works properly.
            </p>
        </div>
    );
}
