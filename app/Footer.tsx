'use client';

import Link from 'next/link';
import Image from 'next/image';
import o from './Footer.module.sass';
import { usePathname } from 'next/navigation';
import { DONATE_LINK, SOURCE_CODE, SUPPORT_MAIL } from '@util/CONSTS';

export default function Footer({
    lang,
}: {
    lang: {
        license: string;
        madeWithLove: string;
        general: string;
        about: string;
        blog: string;
        donate: string;
        login: string;
        support: string;
        documents: string;
        src: string;
        privacy: string;
        terms: string;
        docs: string;
    };
}) {
    const pathname = usePathname();

    return (
        <footer className={o.box + ` ${pathname.startsWith('/account') ? o.hide : ''}`}>
            <header>
                <div className={o.logo}>
                    <Image src="/logo_w.png" width={20} height={20} alt="Logo: N letter" />
                    Nove
                </div>
                <p>&copy; 2019-{new Date().getFullYear() + ' ' + lang.license}</p>
                <p
                    dangerouslySetInnerHTML={{
                        __html: lang.madeWithLove,
                    }}
                />
            </header>
            <div className={o.links}>
                <div className={o.category}>
                    <h2>{lang.general}</h2>
                    <Link href="/about">{lang.about}</Link>
                    <Link href="/blog">{lang.blog}</Link>
                    <a rel="noreferrer noopener nofollow" href={DONATE_LINK}>
                        {lang.donate}
                    </a>
                    <Link href="/login">{lang.login}</Link>
                    <a rel="noreferrer noopener nofollow" href={'mailto:' + SUPPORT_MAIL}>
                        {lang.support}
                    </a>
                </div>
                <div className={o.category}>
                    <h2>{lang.documents}</h2>
                    <a rel="noreferrer noopener nofollow" href={SOURCE_CODE}>
                        {lang.src}
                    </a>
                    <Link href="/privacy">{lang.privacy}</Link>
                    <Link href="/terms">{lang.terms}</Link>
                    <a rel="noreferrer noopener nofollow" href={SOURCE_CODE + '/wiki'}>
                        {lang.docs}
                    </a>
                </div>
            </div>
        </footer>
    );
}
