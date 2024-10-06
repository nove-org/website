import Link from 'next/link';

export default function HomeRepo({ link }: { link: string }) {
    const [base, owner, name] = link.split('/');

    return (
        <li>
            <Link href={`https://${base}/${owner}/${name}`}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M 6 2 C 4.895 2 4 2.895 4 4 L 4 20 C 4 21.105 4.895 22 6 22 L 6 4 L 18 4 L 18 20 L 16 20 L 16 22 L 18 22 C 19.105 22 20 21.105 20 20 L 20 4 C 20 2.895 19.105 2 18 2 L 6 2 z M 8 6 L 8 8 L 10 8 L 10 6 L 8 6 z M 8 10 L 8 12 L 10 12 L 10 10 L 8 10 z M 8 14 L 8 16 L 10 16 L 10 14 L 8 14 z M 8 18 L 8 23 L 11 21.5 L 14 23 L 14 18 L 8 18 z"></path>
                </svg>
                <h1>
                    <span>{owner}</span>
                    {name}
                </h1>
            </Link>
        </li>
    );
}
