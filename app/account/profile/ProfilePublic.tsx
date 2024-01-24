'use client';

import { Response, User } from '@util/schema';
import o from '@sass/account/profile/page.module.sass';
import { useRouter } from 'next/navigation';
import Loader from '@app/Loader';
import { useState } from 'react';
import { errorHandler } from '@util/helpers/Main';
import { patchUser } from '@util/helpers/client/User';
import { AxiosError } from 'axios';

export default function ProfilePublic({ user, lang }: { user: User; lang: { label: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: any) =>
        await patchUser({ profilePublic: e.target.checked })
            .then(() => (setTimeout(() => setLoading(false), 1500), router.refresh()))
            .catch((err: AxiosError) => alert(errorHandler(err.response?.data as Response<null>)));

    return (
        <label className={o.li} htmlFor="switch">
            <div className={o.flex}>
                {loading ? <Loader type="button" /> : null}
                <p>{lang.label}</p>
            </div>
            <label className={o.switch}>
                <input id="switch" type="checkbox" defaultChecked={user.profilePublic} onChange={handleSubmit} />
                <span className={o.slider}></span>
            </label>
        </label>
    );
}
