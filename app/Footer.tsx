'use client';

import Link from 'next/link';
import Logo from '@app/Logo';
import o from '@sass/Footer.module.sass';
import { SUPPORT_MAIL, REPOSITORY, DONATE_LINK } from '@util/CONSTS';
import { usePathname } from 'next/navigation';

export default function Footer({
    lang,
}: {
    lang: {
        license: string;
        made_with: string;
        contributors: string;
        about: string;
        blog: string;
        login: string;
        register: string;
        support: string;
        src: string;
        privacy: string;
        terms: string;
        developers: string;
        docs: string;
        donate: string;
    };
}) {
    const year = new Date().getFullYear();
    const pathname = usePathname();

    return (
        <>
            <div className={o.emptyMr}></div>
            <footer className={o.box + ` ${pathname.startsWith('/account') ? o.hide : ''}`}>
                <header>
                    <div className={o.title}>
                        <Logo size={20} />
                        Nove
                    </div>
                    <div className={o.copyright}>
                        &copy; 2019-{year} {lang.license + ' '}
                        <a href="https://www.gnu.org/licenses/agpl-3.0.en.html" rel="noopener noreferrer" target="_blank">
                            AGPL-3.0
                        </a>
                    </div>
                    <div className={o.copyright}>
                        {lang.made_with + ' '}
                        <a href={REPOSITORY}>{lang.contributors}</a>
                    </div>
                </header>
                <div className={o.links}>
                    <ul>
                        <h2>General</h2>
                        <li>
                            <Link href="/about">{lang.about}</Link>
                        </li>
                        <li>
                            <Link href="/blog">{lang.blog}</Link>
                        </li>
                        <li>
                            <a target="_blank" rel="noopener noreferrer" href={DONATE_LINK}>
                                {lang.donate}
                            </a>
                        </li>
                        <li>
                            <Link href="/login">{lang.login}</Link>
                        </li>
                        <li>
                            <a href={'mailto:' + SUPPORT_MAIL}>{lang.support}</a>
                        </li>
                        <li>
                            <Link href="/foss">FOSS</Link>
                        </li>
                    </ul>
                    <ul>
                        <h2>Documents</h2>
                        <li>
                            <a target="_blank" rel="noopener noreferrer" href={REPOSITORY}>
                                {lang.src}
                            </a>
                        </li>
                        <li>
                            <Link href="/privacy">{lang.privacy}</Link>
                        </li>
                        <li>
                            <Link href="/terms">{lang.terms}</Link>
                        </li>
                        <li>
                            <a href="https://git.nove.team/nove-org/NAPI/wiki">{lang.docs}</a>
                        </li>
                    </ul>
                </div>
            </footer>
        </>
    );
}
