import Link from 'next/link';
import o from '~/dashboard/page.module.sass';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className={o.box}>
            <aside>
                <h1>Settings</h1>
                <ul>
                    <li>
                        <Link href="/dashboard/">Overview</Link>
                    </li>
                    <li>
                        <Link href="/dashboard/">Security</Link>
                    </li>
                    <li>
                        <Link href="/dashboard/">My profile</Link>
                    </li>
                    <li>
                        <Link href="/dashboard/">Language</Link>
                    </li>
                </ul>
            </aside>
            {children}
        </section>
    );
}
