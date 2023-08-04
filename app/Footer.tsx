import Link from 'next/link';
import Logo from '@app/Logo';
import o from '@sass/Footer.module.sass';

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
                    <div className={o.copyright}>Copyright &copy; 2019-{year} Nove Group</div>
                </header>
                <div className={o.links}>
                    <ul>
                        <li>
                            <Link href="/">About</Link>
                        </li>
                        <li>
                            <Link href="/">Docs</Link>
                        </li>
                        <li>
                            <Link href="/">Donate</Link>
                        </li>
                        <li>
                            <Link href="/">Login</Link>
                        </li>
                        <li>
                            <Link href="/">Sign up</Link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <Link href="/">GitHub</Link>
                        </li>
                        <li>
                            <Link href="/">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link href="/">Terms of Service</Link>
                        </li>
                        <li>
                            <Link href="/">Developers</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
