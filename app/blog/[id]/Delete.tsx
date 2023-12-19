'use client';

import Loader from '@app/Loader';
import Image from 'next/image';
import { axiosClient } from '@util/axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Post } from '@util/schema';

export default function Delete({ post, id }: { post: Post; id: string }) {
    const router = useRouter();
    const [postError, setPostError] = useState<string>();

    const throwError = (message?: string, bool?: boolean) => {
        if (bool === false) return setPostError('');

        if (message) {
            setPostError(message.charAt(0).toUpperCase() + message.slice(1).toLowerCase());

            setTimeout(() => setPostError(''), 5000);
        }
    };

    const handleDelete = async () => {
        await axiosClient
            .delete('/v1/blog/' + post.id + '/comment/' + id, {
                headers: { Authorization: `Owner ${getCookie('napiAuthorizationToken')}` },
            })
            .then((r) => router.refresh())
            .catch((err) => (err?.response?.data?.body?.error ? throwError(err.response.data.body.error.message) : console.error(err)));
    };

    return (
        <svg onClick={handleDelete} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
            {postError ? <p className="error">{postError}</p> : null}
            <path
                fill="currentColor"
                d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path>
        </svg>
    );
}
