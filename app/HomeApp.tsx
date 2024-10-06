import Image from 'next/image';
import Link from 'next/link';

export default async function HomeApp({ link, className }: { link: string; className: string }) {
    const [sub, host, tld] = link.split('.').length >= 3 ? link.split('.') : [undefined, ...link.split('.')];
    const name = sub ? sub[0].toUpperCase() + sub.slice(1) : host![0].toUpperCase() + host?.slice(1);
    const file = `/${name.toLowerCase()}.png`;

    return (
        <li>
            <Link href={`https://${link}`} className={className}>
                <Image src={file} width={32} height={32} alt={name} />
                {name}
            </Link>
        </li>
    );
}
