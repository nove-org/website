'use client';

import { useEffect, useState } from 'react';
import { Response, User } from '@/app/Interfaces';
import { AxiosProgressEvent } from 'axios';
import { axiosClient } from '@/app/utils';
import Image from 'next/image';
import Loader from '@/app/loader';
import mime from 'mime-types';

import o from '~/account/page.module.sass';
import u from '~/account/personal.module.sass';

export default function AccountPersonal() {
    const [namePopup, setNamePopup] = useState<boolean>(false);
    const [avatarPopup, setAvatarPopup] = useState<boolean>(false);
    const [selected, setSelected] = useState<boolean>(false);
    const [bioChange, setBioChange] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>();
    const [postError, setPostError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<Response<User>>();

    const throwError = (message?: string, bool?: boolean) => {
        if (bool === false) return setPostError('');

        if (message) {
            setPostError(message.charAt(0).toUpperCase() + message.slice(1).toLowerCase());

            setTimeout(() => setPostError(''), 5000);
        }
    };

    useEffect(() => {
        const getData = async () => {
            await axiosClient
                .get('/users/me', {
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

    const handleUsernameUpdate = async (event: any) => {
        event.preventDefault();

        await axiosClient
            .patch(
                '/users/me',
                {
                    username: event.target.accountTagUpdate.value,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Owner ${localStorage.getItem('key')}`,
                    },
                }
            )
            .then(() => window.location.reload())
            .catch((err) => {
                throwError(err.response?.data.body?.error.message ? err.response.data.body.error.message : 'Something went wrong and we cannot explain it.');

                (document.getElementById('usernameForm') as HTMLFormElement).reset();
                (document.getElementById('pevs1') as HTMLElement).classList.remove(`disabled`);
            });
    };

    const handleAvatarUpdate = async (event: any) => {
        event.preventDefault();

        const elm = document.querySelector('input[type="file"]') as HTMLInputElement;
        const progressBar = document.getElementById('progressBar') as HTMLProgressElement;

        if (!elm || !elm.files) return;

        await axiosClient
            .patch(
                '/users/avatar',
                { file: elm.files[0] },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Owner ${localStorage.getItem('key')}`,
                    },
                    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                        if (progressEvent && progressEvent.total) {
                            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            progressBar.style.width = percentCompleted + '%';
                        }
                    },
                }
            )
            .then(() => window.location.reload())
            .catch((err) => {
                throwError(err.response?.data.body?.error.message ? err.response.data.body.error.message : 'Something went wrong and we cannot explain it.');

                (document.getElementById('fileForm') as HTMLFormElement).reset();
                (document.getElementById('pevs2') as HTMLElement).classList.remove(`disabled`);
            });
    };

    const handleFileUpload = (event: any) => {
        setSelected(true), setFileName(event.target.value.replace(/.*[\/\\]/, ''));

        const elm = document.querySelector('input[type="file"]') as HTMLInputElement;
        const ext = mime.contentType(event.target.value.replace(/.*[\/\\]/, ''));

        if (!elm || !elm.files) return setSelected(false);

        if (!ext.toString().startsWith('image/')) {
            throwError('The file type you are trying to upload is not allowed');

            (document.getElementById('fileForm') as HTMLFormElement).reset();

            return setSelected(false);
        }

        if (elm.files[0].size > 20000000) {
            throwError('The file type you are trying to upload is too big');

            (document.getElementById('fileForm') as HTMLFormElement).reset();

            return setSelected(false);
        }
    };

    const handleBioUpdate = async (event: any) => {
        event.preventDefault();

        await axiosClient
            .patch(
                '/users/me',
                {
                    bio: event.target.bio.value,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Owner ${localStorage.getItem('key')}`,
                    },
                }
            )
            .then(() => window.location.reload())
            .catch((err) => {
                throwError(err.response?.data.body?.error.message ? err.response.data.body.error.message : 'Something went wrong and we cannot explain it.');

                (document.getElementById('bioForm') as HTMLFormElement).reset();
                (document.getElementById('pevs3') as HTMLElement).classList.remove(`disabled`);
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
                        <input autoComplete="off" autoFocus={true} autoCorrect="off" type="text" placeholder="New username" id="accountTagUpdate" name="accountTagUpdate" defaultValue={data.body.data.username} />
                        <div className={o.footer}>
                            <button onClick={() => setNamePopup(false)} type="reset">
                                Cancel
                            </button>
                            <button type="submit" id="pevs1" onClick={() => (document.getElementById('pevs1') as HTMLElement).classList.add(`disabled`)}>
                                Save changes
                            </button>
                        </div>
                    </form>
                </dialog>
            ) : null}
            {avatarPopup ? (
                <dialog id="changeName" className={o.popup}>
                    <div onClick={() => (setSelected(false), setFileName(''), setAvatarPopup(false))} className={o.background}></div>
                    <form onSubmit={handleAvatarUpdate} id="fileForm" autoComplete="off">
                        <h1>
                            Change your avatar
                            <svg onClick={() => (setSelected(false), setFileName(''), setAvatarPopup(false))} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
                            </svg>
                        </h1>
                        <p>Upload your fresh, brand new avatar right to your Nove account. It may take a while to update your avatar on all websites that use Nove accounts.</p>
                        <input onChange={handleFileUpload} id="accountAvatarUpdate" name="accountAvatarUpdate" type="file" accept="image/*" required />
                        <div className={o.file}>
                            <header>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M 6 2 C 4.9057453 2 4 2.9057453 4 4 L 4 20 C 4 21.094255 4.9057453 22 6 22 L 18 22 C 19.094255 22 20 21.094255 20 20 L 20 8 L 14 2 L 6 2 z M 6 4 L 13 4 L 13 9 L 18 9 L 18 20 L 6 20 L 6 4 z"></path>
                                </svg>
                                {selected ? fileName : 'Nothing is selected'}
                            </header>
                            {selected ? (
                                <div className={o.progress}>
                                    <div id="progressBar" className={o.value}></div>
                                </div>
                            ) : null}
                        </div>
                        <label htmlFor="accountAvatarUpdate">Select file</label>
                        <div className={o.footer}>
                            <button onClick={() => (setSelected(false), setFileName(''), setAvatarPopup(false))} type="reset">
                                Cancel
                            </button>
                            <button type="submit" id="pevs2" className={!selected ? 'disabled' : undefined} onClick={() => (document.getElementById('pevs2') as HTMLElement).classList.add(`disabled`)}>
                                Upload
                            </button>
                        </div>
                    </form>
                </dialog>
            ) : null}
            <h1 className={o.title}>Personal info</h1>
            <p className={o.description}>Manage your personal info displayed on your Nove account profile. You can change display method of your profile to private and public. While on private profile we will share only basic info about your account like username and avatar.</p>
            <div className={u.profile}>
                <div className={u.card}>
                    <header>Basic account info</header>
                    <div className={u.input}>
                        <header>Avatar</header>
                        <div className={u.content}>
                            <Image src={`${data.body.data.avatar}?v=${data.body.data.updatedAt}`} width={64} height={64} alt="Avatar" />
                            <a onClick={() => setAvatarPopup(true)}>Edit</a>
                        </div>
                    </div>
                    <div className={u.input}>
                        <header>Username</header>
                        <div className={u.content}>
                            <h1>
                                {data.body.data.username} <span>{data.body.data.id}</span>
                            </h1>
                            <a onClick={() => setNamePopup(true)}>Edit</a>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleBioUpdate} id="bioForm">
                    <div className={u.card}>
                        <header>Details</header>
                        <div className={u.input}>
                            <header>Bio</header>
                            <div className={u.content}>
                                <textarea onChange={() => setBioChange(true)} id="bio" name="bio" rows={7} placeholder="Start typing to save..." defaultValue={data.body.data.bio} />
                            </div>
                            {bioChange ? (
                                <>
                                    <button type="reset" onClick={() => (setBioChange(false), ((document.getElementById('bio') as HTMLInputElement).value = data.body.data.bio))}>
                                        Cancel
                                    </button>
                                    <button type="submit" id="pevs3" onClick={() => (document.getElementById('pevs3') as HTMLElement).classList.add(`disabled`)}>
                                        Save
                                    </button>
                                </>
                            ) : null}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    ) : (
        <main>
            <title>Dashboard — Nove</title>
            <Loader type="hidden" text={data?.body?.error?.message ? data.body.error.message.charAt(0) + data.body.error.message.slice(1).toLowerCase() : "Something went wrong and we can't reach the API"} />
        </main>
    );
}
