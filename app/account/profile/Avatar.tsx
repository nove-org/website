'use client';

import { axiosClient } from '@util/axios';
import Image from 'next/image';
import { User } from '@util/schema';
import { useState } from 'react';
import o from '@sass/account/profile/page.module.sass';

export default function Avatar({ user, cookie }: { user: User; cookie?: string }) {
    const [edit, setEdit] = useState<boolean>(false);
    const [postError, setPostError] = useState<string>();

    const throwError = (message?: string, bool?: boolean) => {
        if (bool === false) return setPostError('');

        if (message) {
            setPostError(message.charAt(0).toUpperCase() + message.slice(1).toLowerCase());

            setTimeout(() => setPostError(''), 4000);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const elm = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (!elm || !elm.files) return;

        await axiosClient
            .patch('/v1/users/avatar', { file: elm.files[0] }, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Owner ${cookie}` } })
            .then(() => (setEdit(false), window.location.reload()))
            .catch((err) => {
                throwError(err.response?.data.body?.error.message ? err.response.data.body.error.message : 'Something went wrong and we cannot explain it.');
            });
    };

    return (
        <>
            <header>Avatar</header>
            <li>
                {!edit ? (
                    <>
                        <Image src={user.avatar + '?u=' + user.updatedAt} alt="Avatar" width="36" height="36" />
                        <button onClick={() => setEdit((e) => !e)}>Edit</button>
                    </>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <input onChange={handleSubmit} id="accountAvatarUpdate" name="accountAvatarUpdate" type="file" accept="image/*" required />
                        <button type="submit">Save</button>
                        {postError ? <p className={o.error}>{postError}</p> : null}
                    </form>
                )}
            </li>
        </>
    );
}
