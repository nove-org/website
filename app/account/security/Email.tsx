'use client';

import { useState } from 'react';
import o from '@sass/account/security/page.module.sass';
import { axiosClient } from '@util/axios';
import { getCookie } from 'cookies-next';

export default function Email() {
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
            .patch(
                '/v1/users/emailReset',
                { oldPassword: e.target.oldPassword.value, newPassword: e.target.newPassword.value },
                { headers: { Authorization: `Owner ${getCookie('napiAuthorizationToken')}` } }
            )
            .then(() => alert('Confirmation message was sent to your old and new email'))
            .catch((err) =>
                err.response.data.body.error
                    ? throwError(err.response.data.body.error?.details ? err.response.data.body.error.details[0].message : err.response.data.body.error.message)
                    : null
            );
    };

    return (
        <>
            <li onClick={() => setPopup((p) => !p)}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M 7 2 A 1.0001 1.0001 0 0 0 6 3 L 6 5.4921875 L 2.9921875 7.2460938 C 2.3801875 7.6030938 2 8.2656094 2 8.9746094 L 2 19 C 2 20.103 2.897 21 4 21 L 20 21 C 21.103 21 22 20.103 22 19 L 22 8.9746094 C 22 8.2656094 21.619812 7.6030937 21.007812 7.2460938 L 18 5.4921875 L 18 3 A 1.0001 1.0001 0 0 0 17 2 L 7 2 z M 8 4 L 16 4 L 16 11.333984 L 12 13.822266 L 8 11.332031 L 8 4 z M 6 7.8066406 L 6 10.087891 L 4.1074219 8.9101562 L 6 7.8066406 z M 18 7.8085938 L 19.892578 8.9121094 L 18 10.089844 L 18 7.8085938 z"></path>
                </svg>
                <h1>
                    E-mail
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 30 30">
                        <path
                            fill="currentColor"
                            d="M 9.9902344 3.9902344 A 1.0001 1.0001 0 0 0 9.2929688 5.7070312 L 18.585938 15 L 9.2929688 24.292969 A 1.0001 1.0001 0 1 0 10.707031 25.707031 L 20.707031 15.707031 A 1.0001 1.0001 0 0 0 20.707031 14.292969 L 10.707031 4.2929688 A 1.0001 1.0001 0 0 0 9.9902344 3.9902344 z"></path>
                    </svg>
                </h1>
            </li>
            {popup ? (
                <div className={o.popup}>
                    <div className={o.container}>
                        <h1>Change your email</h1>
                        <p>
                            The address where we can contact you if there is an unusual activity in your account or if you get locked out. You can also use it to log in to your
                            account.
                        </p>
                        <form onSubmit={handleSubmit}>
                            <label>
                                New email
                                <input
                                    required
                                    minLength={8}
                                    maxLength={128}
                                    autoComplete="off"
                                    autoFocus={false}
                                    autoCorrect="off"
                                    type="email"
                                    placeholder="New email"
                                    id="newEmail"
                                    name="newEmail"
                                />
                            </label>
                            <div className={o.footer}>
                                <button onClick={() => setPopup(false)} type="reset">
                                    Cancel
                                </button>
                                <button type="submit">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
}
