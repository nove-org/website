'use client';

import { useState } from 'react';
import o from '@sass/account/admin/page.module.sass';
import { axiosClient } from '@util/axios';
import { getCookie } from 'cookies-next';
import { Response, User } from '@util/schema';
import Image from 'next/image';

export default function Form({
    lang,
    u,
}: {
    lang: {
        btn: string;
        btnCancel: string;
        h1: string;
        p: string;
        label: string;
    };
    u: User;
}) {
    const [popup, setPopup] = useState<boolean>(true);
    const [users, setUsers] = useState<User[]>();

    const getUsers = async (form: FormData) => {
        await axiosClient
            .get('/v1/admin/users', {
                headers: { Authorization: `Owner ${getCookie('napiAuthorizationToken')}`, 'x-mfa': (form.get('mfa') as string) || '' },
            })
            .then((r) => (setUsers(r.data.body.data), setPopup(false)))
            .catch((e) => e.response);
    };

    return !users ? (
        <div className={o.popup}>
            <div className={o.container}>
                <h1>{lang.h1}</h1>
                <p>{lang.p}</p>
                <form action={getUsers}>
                    <label>
                        {lang.label}
                        <input required minLength={6} maxLength={10} autoComplete="off" autoFocus={true} autoCorrect="off" type="text" placeholder={'000000'} id="mfa" name="mfa" />
                    </label>
                    <div className={o.footer}>
                        <button onClick={() => window.location.replace('/account')} type="reset">
                            {lang.btnCancel}
                        </button>
                        <button type="submit">{lang.btn}</button>
                    </div>
                </form>
            </div>
        </div>
    ) : (
        <div className={o.content}>
            <h1 className={o.title}>User list ({users.length} users)</h1>
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
                            {user.permissionLevel < 1 ? (
                                <>
                                    <button>Disable</button>
                                    <button>Delete</button>
                                </>
                            ) : (
                                <p>{user.permissionLevel === 1 ? 'Moderator' : 'Administrator'}</p>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
