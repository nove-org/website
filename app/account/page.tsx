'use client';

import { useEffect, useState } from 'react';
import { Activity, Response, User } from '@/Interfaces';
import { axiosClient } from '@/utils';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import Connection from './connection';
import Loader from '@/loader';
import Card from './card';

import o from '~/account/page.module.sass';
import oa from '~/account/shortcuts.module.sass';
import ob from '~/account/connections.module.sass';

export default function Account() {
    const [namePopup, setNamePopup] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<Response<User>>();
    const [activity, setActivity] = useState<Response<Activity[]>>();
    const [postError, setPostError] = useState<string>();

    const throwError = (message?: string, bool?: boolean) => {
        if (bool === false) return setPostError('');

        if (message) {
            setPostError(message.charAt(0).toUpperCase() + message.slice(1).toLowerCase());

            setTimeout(() => setPostError(''), 5000);
        }
    };

    const lang = new Intl.DisplayNames(['en'], { type: 'language' });

    useEffect(() => {
        const getData = async () => {
            await axiosClient
                .get('/users/me', { headers: { 'Content-Type': 'application/json', Authorization: `Owner ${getCookie('napiAuthorizationToken')}` } })
                .then(async (res) => {
                    res.data ? setData(res.data) : null;

                    await axiosClient
                        .get('/users/me/activity', { headers: { 'Content-Type': 'application/json', Authorization: `Owner ${getCookie('napiAuthorizationToken')}` } })
                        .then((res) => (res.data ? setActivity(res.data) : null, setLoading(false)))
                        .catch((err) => (err.response?.data ? setActivity(err.response.data) : null, setLoading(false)));
                })
                .catch((err) => (err.response?.data ? setData(err.response.data) : null));
        };

        getData();
    }, []);

    const handleUsernameUpdate = async (event: any) => {
        event.preventDefault();

        await axiosClient
            .patch(
                '/users/me',
                { username: event.target.accountTagUpdate.value },
                { headers: { 'Content-Type': 'application/json', Authorization: `Owner ${getCookie('napiAuthorizationToken')}` } }
            )
            .then(() => window.location.reload())
            .catch((err) => {
                throwError(err.response?.data.body?.error.message ? err.response.data.body.error.message : 'Something went wrong and we cannot explain it.');

                (document.getElementById('usernameForm') as HTMLFormElement).reset();
                (document.getElementById('pevs') as HTMLElement).classList.remove(`disabled`);
            });
    };

    return loading ? (
        <main>
            <title>Dashboard — Nove</title>
            <Loader type="window" />
        </main>
    ) : data?.body?.data ? (
        <div className={o.content}>
            {postError ? <p className="error">{postError}</p> : null}
            {namePopup ? (
                <dialog id="changeName" className={o.popup}>
                    <div onClick={() => setNamePopup(false)} className={o.background}></div>
                    <form id="usernameForm" onSubmit={handleUsernameUpdate} autoComplete="off">
                        <h1>
                            Change your username
                            <svg onClick={() => setNamePopup(false)} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
                            </svg>
                        </h1>
                        <p>Type something new, unique and easy to remember. This is alias to your account which means you can log in with it to your Nove account.</p>
                        <input
                            autoComplete="off"
                            autoFocus={true}
                            autoCorrect="off"
                            type="text"
                            placeholder="New username"
                            id="accountTagUpdate"
                            name="accountTagUpdate"
                            defaultValue={data.body.data.username}
                        />
                        <div className={o.footer}>
                            <button onClick={() => setNamePopup(false)} type="reset">
                                Cancel
                            </button>
                            <button type="submit" id="pevs" onClick={() => (document.getElementById('pevs') as HTMLElement).classList.add(`disabled`)}>
                                Save changes
                            </button>
                        </div>
                    </form>
                </dialog>
            ) : null}
            <h1 className={o.title}>Overview</h1>
            <div className={o.card}>
                <label htmlFor="image">
                    <Image src={`${data.body.data.avatar}?v=${data.body.data.updatedAt}`} width={96} height={96} alt="User avatar" />
                </label>
                <div className={o.content}>
                    <div className={o.username}>
                        <h1>{data.body.data.username}</h1>
                        <button onClick={() => setNamePopup(true)}>Edit</button>
                    </div>
                    <div className={o.email}>{data.body.data.email}</div>
                </div>
            </div>
            <div className={oa.shortcuts}>
                <Card name="Language" description="Change your preferred language across the Internet" option={lang.of(data.body.data.language)} url="/account/language">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M 12 2 C 10.814 2 9.5418125 3.6912344 8.7578125 6.3652344 C 8.6648125 6.6822344 8.9121875 7 9.2421875 7 L 14.757812 7 C 15.087813 7 15.334188 6.6822344 15.242188 6.3652344 C 14.458187 3.6912344 13.186 2 12 2 z M 8.0664062 2.8085938 C 6.2694063 3.5805938 4.7487344 4.8665156 3.6777344 6.4785156 C 3.5307344 6.6995156 3.6968906 7 3.9628906 7 L 5.9296875 7 C 6.3556875 7 6.5475625 6.8363281 6.6015625 6.6113281 C 6.9555625 5.1343281 7.4554063 3.8475937 8.0664062 2.8085938 z M 15.933594 2.8085938 C 16.544594 3.8475937 17.044437 5.1353281 17.398438 6.6113281 C 17.452437 6.8363281 17.651813 7 17.882812 7 L 20.033203 7 C 20.299203 7 20.469266 6.6995156 20.322266 6.4785156 C 19.251266 4.8665156 17.730594 3.5805938 15.933594 2.8085938 z M 2.71875 9 C 2.56675 9 2.4287188 9.0991406 2.3867188 9.2441406 C 2.1357188 10.120141 2 11.045 2 12 C 2 12.955 2.1357188 13.879859 2.3867188 14.755859 C 2.4287187 14.900859 2.56675 15 2.71875 15 L 5.6289062 15 C 5.9249063 15 6.1500937 14.747125 6.1210938 14.453125 C 6.0440937 13.665125 6 12.848 6 12 C 6 11.152 6.0430937 10.334875 6.1210938 9.546875 C 6.1500937 9.252875 5.9249063 9 5.6289062 9 L 2.71875 9 z M 8.6484375 9 C 8.3944375 9 8.1764844 9.1855 8.1464844 9.4375 C 8.0524844 10.2495 8 11.107 8 12 C 8 12.893 8.0524844 13.7505 8.1464844 14.5625 C 8.1764844 14.8145 8.3944375 15 8.6484375 15 L 15.351562 15 C 15.605562 15 15.823516 14.8145 15.853516 14.5625 C 15.947516 13.7505 16 12.893 16 12 C 16 11.107 15.947516 10.2495 15.853516 9.4375 C 15.823516 9.1855 15.605563 9 15.351562 9 L 8.6484375 9 z M 18.371094 9 C 18.075094 9 17.849906 9.252875 17.878906 9.546875 C 17.955906 10.334875 18 11.152 18 12 C 18 12.848 17.956906 13.665125 17.878906 14.453125 C 17.849906 14.747125 18.075094 15 18.371094 15 L 21.28125 15 C 21.43325 15 21.571281 14.900859 21.613281 14.755859 C 21.864281 13.879859 22 12.955 22 12 C 22 11.045 21.864281 10.120141 21.613281 9.2441406 C 21.571281 9.0991406 21.43325 9 21.28125 9 L 18.371094 9 z M 3.9667969 17 C 3.7007969 17 3.5307344 17.300484 3.6777344 17.521484 C 4.7487344 19.133484 6.2694063 20.419406 8.0664062 21.191406 C 7.4554063 20.152406 6.9555625 18.864672 6.6015625 17.388672 C 6.5475625 17.163672 6.3481875 17 6.1171875 17 L 3.9667969 17 z M 9.2421875 17 C 8.9121875 17 8.6658125 17.317766 8.7578125 17.634766 C 9.5418125 20.308766 10.814 22 12 22 C 13.186 22 14.458188 20.308766 15.242188 17.634766 C 15.335187 17.317766 15.087812 17 14.757812 17 L 9.2421875 17 z M 18.070312 17 C 17.644312 17 17.452437 17.163672 17.398438 17.388672 C 17.044438 18.865672 16.544594 20.152406 15.933594 21.191406 C 17.730594 20.419406 19.251266 19.133484 20.322266 17.521484 C 20.469266 17.300484 20.303109 17 20.037109 17 L 18.070312 17 z"></path>
                    </svg>
                </Card>
                <Card
                    name={activity?.body?.data ? 'Recent activity' : 'Logging in'}
                    description={
                        activity?.body?.data ? 'Check and manage your recent account activity logs with ease' : 'Change your account credentials or add security layers with ease'
                    }
                    option={activity?.body?.data ? activity.body.data.length + ' active session' + (activity.body.data.length < 2 ? '' : 's') : 'Go'}
                    url="/account/security">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M 3.984375 2.9863281 A 1.0001 1.0001 0 0 0 3 4 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 20 21 A 1.0001 1.0001 0 1 0 20 19 L 5 19 L 5 4 A 1.0001 1.0001 0 0 0 3.984375 2.9863281 z M 18.980469 6.9902344 A 1.0001 1.0001 0 0 0 18.292969 7.2929688 L 14.984375 10.601562 L 12.691406 8.4082031 A 1.0001 1.0001 0 0 0 11.304688 8.4121094 L 7.3046875 12.28125 A 1.0001 1.0001 0 1 0 8.6953125 13.71875 L 12.003906 10.517578 L 14.308594 12.722656 A 1.0001 1.0001 0 0 0 15.707031 12.707031 L 19.707031 8.7070312 A 1.0001 1.0001 0 0 0 18.980469 6.9902344 z"></path>
                    </svg>
                </Card>
                <Card name="Account recovery" description="Set up two factor authentication and download backup codes" option="Download" url="/account/security">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M 22 2 L 19.058594 4.9414062 C 16.865786 2.7436807 13.666769 1.5536385 10.212891 2.15625 C 6.1828906 2.86025 2.9227344 6.0746563 2.1777344 10.097656 C 1.0007344 16.443656 5.864 22 12 22 C 17.134 22 21.3785 18.109094 21.9375 13.121094 C 22.0045 12.525094 21.5375 12 20.9375 12 C 20.4375 12 20.007125 12.368234 19.953125 12.865234 C 19.520125 16.870234 16.119 20 12 20 C 7.059 20 3.1501562 15.498859 4.1601562 10.380859 C 4.7681562 7.3008594 7.2335937 4.8107812 10.308594 4.1757812 C 13.170804 3.5850239 15.832013 4.545023 17.642578 6.3574219 L 15 9 L 22 9 L 22 2 z"></path>
                    </svg>
                </Card>
            </div>
            <div className={ob.connections + ' disabled'}>
                <h2>Account connections</h2>
                <Connection data={{ name: 'Files', logo: '/cdn/assets/files.png', permissionLevel: 0 }} />
            </div>
        </div>
    ) : (
        <main>
            <title>Dashboard — Nove</title>
            <Loader
                type="hidden"
                text={
                    data?.body?.error?.message
                        ? data.body.error.message.charAt(0) + data.body.error.message.slice(1).toLowerCase()
                        : "Something went wrong and we can't reach the API"
                }
            />
        </main>
    );
}
