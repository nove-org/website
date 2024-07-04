import o from './Security.module.sass';

export default function Header({ title, d, children }: { title: string; d: string; children: React.ReactNode }) {
    return (
        <header className={o.title}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 24 24">
                <path fill="currentColor" d={d}></path>
            </svg>
            <div className={o.info}>
                <h1>{title}</h1>
                <p>{children}</p>
            </div>
        </header>
    );
}
