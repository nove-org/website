import Link from 'next/link';
import o from './Popup.module.sass';

export default function Popup({ title, description, d, type, children }: { title: string; description: string; d: string; type?: 'small' | 'large'; children: React.ReactNode }) {
    return (
        <div className={o.popup + (type === 'large' ? ` ${o.large}` : '')}>
            <Link href="?et=cancel" className={o.close}></Link>
            <div className={o.container}>
                <svg className={o.header} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 24 24">
                    <path fill="currentColor" d={d} />
                </svg>
                <h1 className={o.title}>{title}</h1>
                <p className={o.description}>{description}</p>
                {children}
            </div>
        </div>
    );
}
