'use client';

import { axiosClient } from '@util/axios';
import { User } from '@util/schema';
import { useState } from 'react';
import o from '@sass/account/profile/page.module.sass';

export default function Username({ user, cookie }: { user: User; cookie?: string }) {
    const [edit, setEdit] = useState<boolean>(false);
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
            .patch('/v1/users/me', { username: e.target.username.value }, { headers: { Authorization: `Owner ${cookie}` } })
            .then(() => (setEdit(false), window.location.reload()))
            .catch((e) => throwError(e.response?.data.body?.error.message ? e.response.data.body.error.message : 'Something went wrong and we cannot explain it.'))
    );

    return (
        <>
            <header>Username</header>
            <li>
                {!edit ? (
                    <>
                        <p>
                            {user.username} <span>{user.id}</span>
                        </p>
                        <button onClick={() => setEdit((e) => !e)}>Edit</button>
                    </>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder={user.username + ' (new username here)'} name="username" required />
                        <button type="submit">Save changes</button>
                        {postError ? <p className={o.error}>{postError}</p> : null}
                    </form>
                )}
            </li>
        </>
    );
}
