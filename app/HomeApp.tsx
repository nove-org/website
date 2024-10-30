import Image from 'next/image';
import Link from 'next/link';

export default async function HomeApp({ link, className }: { link: string; className: string }) {
    const name = link.split('.')[0];
    const formatted = name[0].toUpperCase() + name.slice(1);
    const file = `/${name.toLowerCase()}.png`;

    return (
        <li>
            <Link href={`https://${link}`} className={className}>
                <Image src={file} width={32} height={32} alt={name} />
                {formatted}
            </Link>
        </li>
    );
}
