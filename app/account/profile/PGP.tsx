'use client';

import { Response, User } from '@util/schema';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@app/Loader';
import { patchUser } from '@util/helpers/client/User';
import { errorHandler } from '@util/helpers/Main';
import { AxiosError } from 'axios';

export default function PGP({ user, lang }: { user: User; lang: { header: string; save: string; delete: string; placeholder: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormData) => (
        setLoading(true),
        await patchUser({ pubkey: !user.pubkey ? e.get('pubkey')?.toString() : 'false' })
            .then(() => setTimeout(() => (setLoading(false), router.refresh()), 1500))
            .catch((err: AxiosError) => (setLoading(false), alert(errorHandler(err.response?.data as Response<null>))))
    );

    return (
        <>
            <header>{lang.header}</header>
            <li>
                <form action={handleSubmit}>
                    <textarea spellCheck={false} name="pubkey" defaultValue={user.pubkey} placeholder={lang.placeholder} readOnly={Boolean(user.pubkey)} />
                    <button type="submit">
                        {!user.pubkey ? lang.save : lang.delete}
                        {loading ? <Loader type="button" /> : null}
                    </button>
                </form>
            </li>
        </>
    );
}
