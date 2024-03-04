'use client';

import { Response, User } from '@util/schema';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@app/Loader';
import { patchUser } from '@util/helpers/client/User';
import { errorHandler } from '@util/helpers/Main';
import { AxiosError } from 'axios';

export default function Website({ user, lang }: { user: User; lang: { header: string; save: string; delete: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormData) => (
        setLoading(true),
        await patchUser({ website: !user.website ? e.get('website')?.toString() : '' })
            .then(() => setTimeout(() => (setLoading(false), router.refresh()), 1500))
            .catch((err: AxiosError) => (setLoading(false), alert(errorHandler(err.response?.data as Response<null>))))
    );

    return (
        <>
            <header>{lang.header}</header>
            <li>
                <form action={handleSubmit}>
                    <input spellCheck={false} name="website" defaultValue={user.website} placeholder="https://example.com" readOnly={Boolean(user.website)} />
                    <button type="submit">
                        {!user.website ? lang.save : lang.delete}
                        {loading ? <Loader type="button" /> : null}
                    </button>
                </form>
            </li>
        </>
    );
}
