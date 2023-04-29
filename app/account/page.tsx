'use client';

import { useEffect, useState } from 'react';
import { Response, User } from '../Interfaces';
import Image from 'next/image';
import Connection from './connection';
import Loader from '../loader';
import Card from './card';
import axios from 'axios';
import config from '@/config.json';

import o from '~/account/page.module.sass';
import s from '~/account/shortcuts.module.sass';
import c from '~/account/connections.module.sass';

export default function Account() {
    const [namePopup, setNamePopup] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<Response<User>>();

    useEffect(() => {
        const getData = async () => {
            await axios
                .get('/users/me', {
                    baseURL: config.api,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Owner ${localStorage.getItem('key')}`,
                    },
                })
                .then((res) => (res.data ? setData(res.data) : null, setLoading(false)))
                .catch((err) => (err.response?.data ? setData(err.response.data) : null, setLoading(false)));
        };

        getData();
    }, []);

    return loading ? (
        <main>
            <title>Dashboard — Nove</title>
            <Loader type="window" />
        </main>
    ) : data?.body?.data ? (
        <div className={o.content}>
            {namePopup ? (
                <dialog id="changeName" className={o.popup}>
                    <div onClick={() => setNamePopup(false)} className={o.background}></div>
                    <form autoComplete="off">
                        <h1>
                            Change your username
                            <svg onClick={() => setNamePopup(false)} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
                            </svg>
                        </h1>
                        <p>Type something new, unique and easy to remember. This is alias to your account which means you can log in with it to your Nove account.</p>
                        <input autoComplete="off" autoFocus={true} autoCorrect="off" type="text" placeholder="New username" id="accountTagUpdate" name="accountTagUpdate" defaultValue={data.body.data.username} />
                        <div className={o.footer}>
                            <button onClick={() => setNamePopup(false)} type="reset">
                                Cancel
                            </button>
                            <button type="submit">Save changes</button>
                        </div>
                    </form>
                </dialog>
            ) : null}
            <h1 className={o.title}>Overview</h1>
            <div className={o.card}>
                <label htmlFor="image">
                    <Image src={data.body.data.avatar} width={96} height={96} alt="User avatar" />
                </label>
                <div className={o.content}>
                    <div className={o.username}>
                        <h1>{data.body.data.username}</h1>
                        <button onClick={() => setNamePopup(true)}>Edit</button>
                    </div>
                    <div className={o.email}>{data.body.data.email}</div>
                </div>
            </div>
            <div className={s.shortcuts}>
                <Card name="Language" description="Change your language preferences" option="English, US" url="/account/language" />
                <Card name="Recent activity" description="Check recent activity on your account" option="2 sessions on Linux" url="/account/security" />
                <Card name="Account recovery" description="Set up two factor authentication and download backup codes" option="Download" url="/account/security" />
            </div>
            <div className={c.connections}>
                <h2>Account connections</h2>
                <Connection data={{ name: 'cheems.dog', logo: '/cdn/assets/cheems.png', permissionLevel: 0 }} />
            </div>
        </div>
    ) : (
        <main>
            <title>Dashboard — Nove</title>
            <Loader type="hidden" text={data?.body?.error?.message ? data.body.error.message.charAt(0) + data.body.error.message.slice(1).toLowerCase() : "Something went wrong and we can't reach the API"} />
        </main>
    );
}
