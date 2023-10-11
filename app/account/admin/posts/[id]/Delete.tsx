'use client';

import { axiosClient } from '@util/axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export default function Delete({
    lang,
    id,
}: {
    lang: {
        btn: string;
    };
    id: string;
}) {
    const router = useRouter();

    return (
        <button
            onClick={async () =>
                await axiosClient
                    .delete('/v1/blog/' + id, { headers: { Authorization: `Owner ${getCookie('napiAuthorizationToken')}` } })
                    .then((r) => router.replace('/account/admin/posts'))
                    .catch((e) => e.response)
            }>
            {lang.btn}
        </button>
    );
}
