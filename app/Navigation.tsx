import Link from 'next/link';
import Logo from './Logo';
import o from '~/Navigation.module.sass';

export default function Navigation() {
    return (
        <nav className={o.box}>
            <div className={o.padding}>
                <div className={o.flex}>
                    <header>
                        <Logo size={20} />
                        Nove
                    </header>
                    <ul>
                        <li>
                            <Link href="/">Products</Link>
                        </li>
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                        <li>
                            <Link href="/">Docs</Link>
                        </li>
                        <li>
                            <Link href="/">Donate</Link>
                        </li>
                    </ul>
                </div>
                <div className={o.buttons}>
                    <Link href="/login">Login</Link>
                    <Link href="/register">Sign up</Link>
                </div>
            </div>
        </nav>
    );
}
