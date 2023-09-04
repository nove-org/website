'use client';

import { useState } from 'react';
import o from '@sass/account/security/page.module.sass';
import { axiosClient } from '@util/axios';
import { getCookie } from 'cookies-next';

export default function Delete() {
    const [popup, setPopup] = useState<boolean>(false);
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

        await axiosClient
            .post('/v1/users/me/delete', { password: e.target.password.value }, { headers: { Authorization: `Owner ${getCookie('napiAuthorizationToken')}` } })
            .then(() => window.location.replace('/logout'))
            .catch((err) =>
                err.response.data.body.error
                    ? throwError(err.response.data.body.error?.details ? err.response.data.body.error.details[0].message : err.response.data.body.error.message)
                    : null
            );
    };

    return (
        <>
            <button onClick={() => setPopup((p) => !p)}>Delete my account</button>
            {postError ? <p className="error">{postError}</p> : null}
            {popup ? (
                <div className={o.popup}>
                    <div className={o.container}>
                        <h1>Delete your account</h1>
                        <p>
                            Provide your password so we can verify that it&apos;s you. Remember to delete all accounts that you registered using this Nove account. Otherwise, they
                            might be unaccessible. This action is performed instantly - it&apos;s irreversible.
                        </p>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Your password
                                <input
                                    required
                                    minLength={2}
                                    maxLength={128}
                                    autoComplete="off"
                                    autoFocus={false}
                                    autoCorrect="off"
                                    type="password"
                                    placeholder="Password"
                                    id="password"
                                    name="password"
                                />
                            </label>
                            <div className={o.footer}>
                                <button onClick={() => setPopup(false)} type="reset">
                                    Cancel
                                </button>
                                <button type="submit">Delete my account</button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
}
