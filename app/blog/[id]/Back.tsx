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

    return (
        <button onClick={() => router.replace('/blog')}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 30 30">
                <path
                    fill="currentColor"
                    d="M 9.9902344 3.9902344 A 1.0001 1.0001 0 0 0 9.2929688 5.7070312 L 18.585938 15 L 9.2929688 24.292969 A 1.0001 1.0001 0 1 0 10.707031 25.707031 L 20.707031 15.707031 A 1.0001 1.0001 0 0 0 20.707031 14.292969 L 10.707031 4.2929688 A 1.0001 1.0001 0 0 0 9.9902344 3.9902344 z"></path>
            </svg>
            {lang.btn}
        </button>
    );
}
