'use client';

import { axiosClient } from '@util/axios';
import { User } from '@util/schema';
import { useState } from 'react';

export default function Username({ user, cookie }: { user: User; cookie?: string }) {
    const [edit, setEdit] = useState<boolean>(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        await axiosClient
            .patch('/v1/users/me', { username: e.target.username.value }, { headers: { Authorization: `Owner ${cookie}` } })
            .then(() => (setEdit(false), window.location.reload()));
    };

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
                        <input type="text" placeholder={user.username} name="username" required />
                        <button type="submit">Save changes</button>
                    </form>
                )}
            </li>
        </>
    );
}
