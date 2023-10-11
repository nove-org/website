'use client';

import { useRouter } from 'next/navigation';

export default function Back({
    lang,
}: {
    lang: {
        btn: string;
    };
}) {
    const router = useRouter();

    return <button onClick={() => router.back()}>{lang.btn}</button>;
}
