import Link from 'next/link';
import Logo from '@app/Logo';
import o from '@sass/Footer.module.sass';
import { SUPPORT_MAIL, REPOSITORY, DONATE_LINK } from '@util/config';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className={o.box}>
            <div className={o.padding}>
                <header>
                    <div className={o.title}>
                        <Logo size={20} />
                        Nove
                    </div>
                    <div className={o.copyright}>
                        &copy; 2019-{year} Licensed under{' '}
                        <a href="https://www.gnu.org/licenses/agpl-3.0.en.html" target="_blank">
                            AGPL-3.0
                        </a>
                    </div>
                    <div className={o.copyright}>
                        Made with ❤️ by <a href={REPOSITORY}>contributors</a>
                    </div>
                </header>
                <div className={o.links}>
                    <ul>
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                        <li>
                            <a href={REPOSITORY + '/wiki'}>Docs</a>
                        </li>
                        <li>
                            <a target="_blank" href={DONATE_LINK}>
                                Donate
                            </a>
                        </li>
                        <li>
                            <Link href="/login">Login</Link>
                        </li>
                        <li>
                            <Link href="/register">Sign up</Link>
                        </li>
                        <li>
                            <a href={'mailto:' + SUPPORT_MAIL}>Support</a>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <a target="_blank" href={REPOSITORY}>
                                GitHub
                            </a>
                        </li>
                        <li>
                            <Link href="/privacy">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link href="/terms">Terms of Service</Link>
                        </li>
                        <li>
                            <Link href="/account/developers">Developers</Link>
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
