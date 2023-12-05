'use client';

import { axiosClient } from '@util/axios';
import { Post, User } from '@util/schema';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import Loader from '@app/Loader';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import b from '@sass/blog.module.sass';

export default function Comment({ user, post }: { user: User; post: Post }) {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const [postError, setPostError] = useState<string>();

    const throwError = (message?: string, bool?: boolean) => {
        if (bool === false) return setPostError('');

        if (message) {
            setPostError(message.charAt(0).toUpperCase() + message.slice(1).toLowerCase());

            setTimeout(() => setPostError(''), 5000);
        }
    };

    const handlePost = async (form: FormData) => {
        if (loading) return;
        else setLoading(true);

        await axiosClient
            .post(
                '/v1/blog/' + post.id + '/comment',
                { text: form.get('text') },
                {
                    headers: { Authorization: `Owner ${getCookie('napiAuthorizationToken')}` },
                }
            )
            .then((r) => (setLoading(false), (document.getElementById('comment') as HTMLFormElement).reset(), router.refresh()))
            .catch((err) => (setLoading(false), err?.response?.data?.body?.error ? throwError(err.response.data.body.error.message) : console.error(err)));
    };

    return user?.username && post.commentsAllowed ? (
        <form action={handlePost} id="comment">
            <Image src={user.avatar} alt="User avatar" width={48} height={48} />
            <div className={b.content}>
                <textarea name="text" id="text" placeholder="Content..." required rows={5} />
                <button type="submit">{loading ? <Loader type="button" /> : null}Post</button>
            </div>
            {postError ? <p className="error">{postError}</p> : null}
        </form>
    ) : null;
}
