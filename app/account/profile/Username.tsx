'use client';

import { axiosClient } from '@util/axios';
import { User } from '@util/schema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Username({ user, cookie, lang }: { user: User; cookie?: string; lang: { header: string; save: string; edit: string; placeholder: string } }) {
    const router = useRouter();
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
            .then(() => (setEdit(false), router.refresh()))
            .catch((e) => throwError(e.response?.data.body?.error.message ? e.response.data.body.error.message : 'Something went wrong and we cannot explain it.'))
    );

    return (
        <>
            <header>{lang.header}</header>
            <li>
                {!edit ? (
                    <>
                        <p>
                            {user.username} <span>{user.id}</span>
                        </p>
                        <button onClick={() => setEdit((e) => !e)}>{lang.edit}</button>
                    </>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder={lang.placeholder} name="username" required />
                        <button type="submit">{lang.save}</button>
                        {postError ? <p className="error">{postError}</p> : null}
                    </form>
                )}
            </li>
        </>
    );
}
