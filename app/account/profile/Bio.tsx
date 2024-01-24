'use client';

import { Response, User } from '@util/schema';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@app/Loader';
import { patchUser } from '@util/helpers/client/User';
import { errorHandler } from '@util/helpers/Main';
import { AxiosError } from 'axios';

export default function Bio({ user, lang }: { user: User; lang: { header: string; save: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormData) =>
        await patchUser({ bio: e.get('bio')?.toString() })
            .then(() => (setTimeout(() => setLoading(false), 1500), router.refresh()))
            .catch((err: AxiosError) => alert(errorHandler(err.response?.data as Response<null>)));

    return (
        <>
            <header>{lang.header}</header>
            <li>
                <form action={handleSubmit}>
                    <textarea spellCheck={false} name="bio" defaultValue={user.bio} />
                    <button type="submit">
                        {lang.save}
                        {loading ? <Loader type="button" /> : null}
                    </button>
                </form>
            </li>
        </>
    );
}
