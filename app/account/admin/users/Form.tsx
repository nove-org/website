'use client';

import { useState } from 'react';
import o from '@sass/popup.module.sass';
import { axiosClient } from '@util/axios';
import { getCookie } from 'cookies-next';
import { Response, User } from '@util/schema';
import Image from 'next/image';
import Disable from './Disable';
import Delete from './Delete';
import { useRouter } from 'next/navigation';

export default function Form({
    lang,
    u,
}: {
    lang: {
        btn: string;
        btnEnable: string;
        btnDisable: string;
        btnDelete: string;
        btnCancel: string;
        h1: string;
        p: string;
        label: string;
        labelReason: string;
    };
    u: User;
}) {
    const router = useRouter();
    const [popup, setPopup] = useState<boolean>(true);
    const [users, setUsers] = useState<User[]>();
    const [postError, setPostError] = useState<string>();

    const throwError = (message?: string, bool?: boolean) => {
        if (bool === false) return setPostError('');

        if (message) {
            setPostError(message.charAt(0).toUpperCase() + message.slice(1).toLowerCase());

            setTimeout(() => setPostError(''), 5000);
        }
    };

    const getUsers = async (form: FormData) => {
        await axiosClient
            .get('/v1/admin/users', {
                headers: { Authorization: `Owner ${getCookie('napiAuthorizationToken')}`, 'x-mfa': (form.get('mfa') as string) || '' },
            })
            .then((r) => (setUsers(r.data.body.data), setPopup(false)))
            .catch((err) => (err?.response?.data?.body?.error ? throwError(err.response.data.body.error.message) : console.error(err)));
    };

    return !users ? (
        <div className={o.popup}>
            {postError ? <p className="error">{postError}</p> : null}
            <div className={o.container}>
                <h1>{lang.h1}</h1>
                <p>{lang.p}</p>
                <form action={getUsers}>
                    <label>
                        {lang.label}
                        <input required minLength={6} maxLength={10} autoComplete="off" autoFocus={true} autoCorrect="off" type="text" placeholder={'000000'} id="mfa" name="mfa" />
                    </label>
                    <div className={o.footer}>
                        <button onClick={() => router.replace('/account')} type="reset">
                            {lang.btnCancel}
                        </button>
                        <button type="submit">{lang.btn}</button>
                    </div>
                </form>
            </div>
        </div>
    ) : (
        <div className={o.content}>
            <h1 className={o.title}>{users.length} users</h1>
            <ul className={o.users}>
                {users.map((user) => (
                    <li key={user.id}>
                        <div className={o.box}>
                            <header>
                                <Image src={user.avatar} alt="User avatar" width={32} height={32} />
                                {user.username}
                            </header>
                            <p>Created at {new Date(user.createdAt).toLocaleString(u.language, { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        </div>
                        <div className={o.buttons}>
                            {u.permissionLevel === 2 ? (
                                user.permissionLevel < 2 ? (
                                    <>
                                        {user.permissionLevel === 1 ? <p> Moderator</p> : null}
                                        <Disable
                                            u={u}
                                            lang={{
                                                btnConfirm: user.disabled ? lang.btnEnable : lang.btnDisable,
                                                btnCancel: lang.btnCancel,
                                                h1: lang.h1,
                                                p: lang.p,
                                                label: lang.label,
                                                labelReason: lang.labelReason,
                                            }}
                                            target={user}
                                        />
                                        <Delete
                                            lang={{
                                                btnConfirm: lang.btnDelete,
                                                btnCancel: lang.btnCancel,
                                                h1: lang.h1,
                                                p: lang.p,
                                                label: lang.label,
                                                labelReason: lang.labelReason,
                                            }}
                                            target={user}
                                        />
                                    </>
                                ) : (
                                    <p>Administrator</p>
                                )
                            ) : null}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
