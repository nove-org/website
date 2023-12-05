'use client';

import { axiosClient } from '@util/axios';
import { User } from '@util/schema';
import o from '@sass/account/profile/page.module.sass';
import { useRouter } from 'next/navigation';
import Loader from '@app/Loader';
import { useState } from 'react';

export default function ProfilePublic({ user, cookie, lang }: { user: User; cookie?: string; lang: { label: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: any) => (
        setLoading(true),
        await axiosClient
            .patch('/v1/users/me', { profilePublic: e.target.checked }, { headers: { Authorization: `Owner ${cookie}` } })
            .then(() => (setTimeout(() => setLoading(false), 1500), router.refresh()))
            .catch((e) => e)
    );

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
