'use client';

import o from '~/docs/page.module.sass';

export default function Docs() {
    return (
        <div className={o.content}>
            <h1 className={o.title}>Getting started</h1>
            <div className={o.card}>
                <header>Documentation is not finished yet</header>
                <p>Warning: this page is not ready yet. Please check back later. We are still building the documentation</p>
            </div>
            <p>
                Are you lost? Tempor <code>console.log{'("oh hell no");'}</code> velit amet Lorem excepteur. Officia labore voluptate ipsum sint eiusmod ullamco id cupidatat tempor magna ad pariatur ipsum proident. Ex et eiusmod voluptate occaecat veniam sit.
            </p>
        </div>
    );
}
