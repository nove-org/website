'use client';

import { useState } from 'react';
import o from '@sass/account/admin/page.module.sass';
import e from '@sass/account/part.module.sass';
import p from '@sass/popup.module.sass';
import { Response, User } from '@util/schema';
import Image from 'next/image';
import Disable from './Disable';
import Delete from './Delete';
import { useRouter } from 'next/navigation';
import { getUsers } from '@util/helpers/client/User';
import { errorHandler } from '@util/helpers/Main';
import { AxiosError } from 'axios';

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
    const [users, setUsers] = useState<User[]>();

    const fetchUsers = async (e: FormData) =>
        await getUsers({ mfa: e.get('mfa')?.toString() })
            .then((users) => setUsers(users))
            .catch((err: AxiosError) => alert(errorHandler(err.response?.data as Response<null>)));

    return !users ? (
        <div className={p.popup}>
            <div className={p.container}>
                <h1>{lang.h1}</h1>
                <p>{lang.p}</p>
                <form action={fetchUsers}>
                    <label>
                        {lang.label}
                        <input required minLength={6} maxLength={10} autoComplete="off" autoFocus={true} autoCorrect="off" type="text" placeholder={'000000'} id="mfa" name="mfa" />
                    </label>
                    <div className={p.footer}>
                        <button onClick={() => router.replace('/account')} type="reset">
                            {lang.btnCancel}
                        </button>
                        <button type="submit">{lang.btn}</button>
                    </div>
                </form>
            </div>
        </div>
    ) : (
        <div className={e.content}>
            <h1 className={e.title}>{users.length} users</h1>
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
