import Link from 'next/link';

export default function LayerCard({ link, d, children }: { link: string; d: string; children: React.ReactNode }) {
    return (
        <Link href={link}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 24 24">
                <path fill="currentColor" d={d} />
            </svg>
            <span>
                {children}
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M 14 4.9296875 L 12.5 6.4296875 L 17.070312 11 L 3 11 L 3 13 L 17.070312 13 L 12.5 17.570312 L 14 19.070312 L 21.070312 12 L 14 4.9296875 z"></path>
                </svg>
            </span>
        </Link>
    );
}
