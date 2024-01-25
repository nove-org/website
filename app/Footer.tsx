export const dynamic = 'force-dynamic';
import Link from 'next/link';
import Logo from '@app/Logo';
import o from '@sass/Footer.module.sass';
import { SUPPORT_MAIL, REPOSITORY, DONATE_LINK } from '@util/CONSTS';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { headers } from 'next/headers';
import { User } from '@util/schema';

export default async function Footer({ user }: { user?: User }) {
    const year = new Date().getFullYear();
    const lang = await new LanguageHandler('modules/footer', user).init(headers());

    return (
        <footer className={o.box}>
            <div className={o.padding}>
                <header>
                    <div className={o.title}>
                        <Logo size={20} />
                        Nove
                    </div>
                    <div className={o.copyright}>
                        &copy; 2019-{year} {lang.getProp('license') + ' '}
                        <a href="https://www.gnu.org/licenses/agpl-3.0.en.html" rel="noopener noreferrer" target="_blank">
                            AGPL-3.0
                        </a>
                    </div>
                    <div className={o.copyright}>
                        {lang.getProp('made-with-love') + ' '}
                        <a href={REPOSITORY}>{lang.getProp('contributors')}</a>
                    </div>
                </header>
                <div className={o.links}>
                    <ul>
                        <li>
                            <Link href="/about">{lang.getProp('ul-about')}</Link>
                        </li>
                        <li>
                            <Link href="/blog">{lang.getProp('ul-blog')}</Link>
                        </li>
                        <li>
                            <a href="https://git.nove.team/nove-org/NAPI/wiki">{lang.getProp('ul-docs')}</a>
                        </li>
                        <li>
                            <a target="_blank" rel="noopener noreferrer" href={DONATE_LINK}>
                                {lang.getProp('ul-donate')}
                            </a>
                        </li>
                        <li>
                            <Link href="/login">{lang.getProp('ul-login')}</Link>
                        </li>
                        <li>
                            <Link href="/register">{lang.getProp('ul-register')}</Link>
                        </li>
                        <li>
                            <a href={'mailto:' + SUPPORT_MAIL}>{lang.getProp('ul-support')}</a>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <a target="_blank" rel="noopener noreferrer" href={REPOSITORY}>
                                {lang.getProp('ul-src')}
                            </a>
                        </li>
                        <li>
                            <Link href="/privacy">{lang.getProp('ul-privacy')}</Link>
                        </li>
                        <li>
                            <Link href="/terms">{lang.getProp('ul-terms')}</Link>
                        </li>
                        <li>
                            <Link href="/account">{lang.getProp('ul-developers')}</Link>
                        </li>
                        <li>
                            <Link href="/foss">FOSS</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
