'use client';

import { axiosClient } from '@util/axios';
import { User } from '@util/schema';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@app/Loader';

export default function Bio({ user, cookie, lang }: { user: User; cookie?: string; lang: { header: string; save: string } }) {
    const router = useRouter();
    const [postError, setPostError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    const throwError = (message?: string, bool?: boolean) => {
        if (bool === false) return setPostError('');

        if (message) {
            setPostError(message.charAt(0).toUpperCase() + message.slice(1).toLowerCase());

            setTimeout(() => setPostError(''), 4000);
        }
    };

    const handleSubmit = async (e: any) => (
        e.preventDefault(),
        setLoading(true),
        await axiosClient
            .patch('/v1/users/me', { bio: e.target.bio.value }, { headers: { Authorization: `Owner ${cookie}` } })
            .then(() => (setTimeout(() => setLoading(false), 1500), router.refresh()))
            .catch((e) => throwError(e.response?.data.body?.error.message ? e.response.data.body.error.message : 'Something went wrong and we cannot explain it.'))
    );

    return (
        <>
            <header>{lang.header}</header>
            <li>
                <form onSubmit={handleSubmit}>
                    <textarea spellCheck={false} name="bio" defaultValue={user.bio} />
                    <button type="submit">
                        {lang.save}
                        {loading ? <Loader type="button" /> : null}
                    </button>
                    {postError ? <p className="error">{postError}</p> : null}
                </form>
            </li>
        </>
    );
}
