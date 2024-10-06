import Image from 'next/image';

export default function Logo({ size }: { size: number }) {
    return <Image src="/logo.png" width={size} height={size} alt="logo" />;
}
