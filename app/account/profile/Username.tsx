'use client';

import { errorHandler } from '@util/helpers/Main';
import { patchUser } from '@util/helpers/client/User';
import { Response, User } from '@util/schema';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Username({ user, lang }: { user: User; lang: { header: string; save: string; edit: string; placeholder: string } }) {
    const router = useRouter();
    const [edit, setEdit] = useState<boolean>(false);

    const handleSubmit = async (e: FormData) =>
        await patchUser({ username: e.get('username')?.toString() })
            .then(() => (setEdit(false), router.refresh()))
            .catch((err: AxiosError) => alert(errorHandler(err.response?.data as Response<null>)));

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
                    <form action={handleSubmit}>
                        <input type="text" placeholder={lang.placeholder} name="username" required />
                        <button type="submit">{lang.save}</button>
                    </form>
                )}
            </li>
        </>
    );
}
