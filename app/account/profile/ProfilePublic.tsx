'use client';

import { axiosClient } from '@util/axios';
import { User } from '@util/schema';
import { useState } from 'react';
import o from '@sass/account/profile/page.module.sass';

export default function ProfilePublic({ user, cookie }: { user: User; cookie?: string }) {
    const [edit, setEdit] = useState<boolean>(false);
    const [postError, setPostError] = useState<string>();

    const throwError = (message?: string, bool?: boolean) => {
        if (bool === false) return setPostError('');

        if (message) {
            setPostError(message.charAt(0).toUpperCase() + message.slice(1).toLowerCase());

            setTimeout(() => setPostError(''), 4000);
        }
    };

    const handleSubmit = async (e: any) =>
        await axiosClient
            .patch('/v1/users/me', { profilePublic: e.target.checked }, { headers: { Authorization: `Owner ${cookie}` } })
            .then(() => (setEdit(false), window.location.reload()))
            .catch((e) => throwError(e.response?.data.body?.error.message ? e.response.data.body.error.message : 'Something went wrong and we cannot explain it.'));

    return (
        <label className={o.li} htmlFor="switch">
            <p>Display more details on your public profile</p>
            <label className={o.switch}>
                <input id="switch" type="checkbox" defaultChecked={user.profilePublic} onChange={handleSubmit} />
                <span className={o.slider}></span>
            </label>
        </label>
    );
}
