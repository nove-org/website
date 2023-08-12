'use client';

import { axiosClient } from '@util/axios';
import { User } from '@util/schema';
import { useState } from 'react';
import o from '@sass/account/profile/page.module.sass';

export default function Bio({ user, cookie }: { user: User; cookie?: string }) {
    const [postError, setPostError] = useState<string>();

    const throwError = (message?: string, bool?: boolean) => {
        if (bool === false) return setPostError('');

        if (message) {
            setPostError(message.charAt(0).toUpperCase() + message.slice(1).toLowerCase());

            setTimeout(() => setPostError(''), 4000);
        }
    };

    const handleSubmit = async (e: any) => (
        e.preventDefault(),
        await axiosClient
            .patch('/v1/users/me', { bio: e.target.bio.value }, { headers: { Authorization: `Owner ${cookie}` } })
            .then(() => window.location.reload())
            .catch((e) => throwError(e.response?.data.body?.error.message ? e.response.data.body.error.message : 'Something went wrong and we cannot explain it.'))
    );

    return (
        <>
            <header>About me</header>
            <li>
                <form onSubmit={handleSubmit}>
                    <textarea spellCheck={false} name="bio" defaultValue={user.bio} />
                    <button type="submit">Save</button>
                    {postError ? <p className="error">{postError}</p> : null}
                </form>
            </li>
        </>
    );
}
