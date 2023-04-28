'use client';

import { useState } from 'react';
import Image from 'next/image';
import axios, { AxiosProgressEvent } from 'axios';
import config from '@/config.json';
import mime from 'mime-types';

import o from '~/account/page.module.sass';
import u from '~/account/personal.module.sass';

export default function AccountPersonal() {
    const [namePopup, setNamePopup] = useState<boolean>(false);
    const [avatarPopup, setAvatarPopup] = useState<boolean>(false);
    const [selected, setSelected] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>('');
    const [postError, setPostError] = useState<string>('');

    const throwError = (message?: string, bool?: boolean) => {
        if (bool === false) return setPostError('');

        if (message) {
            setPostError(message.charAt(0).toUpperCase() + message.slice(1).toLowerCase());

            setTimeout(() => setPostError(''), 5000);
        }
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const elm = document.querySelector('input[type="file"]') as HTMLInputElement;
        const progressBar = document.getElementById('progressBar') as HTMLProgressElement;

        if (!elm || !elm.files) return;

        await axios
            .patch(
                '/users/me',
                { file: elm.files[0] },
                {
                    baseURL: config.api,
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
            .then((res) => {
                (document.getElementById('fileForm') as HTMLFormElement).reset();

                setAvatarPopup(false);
            })
            .catch((err) => {
                throwError(err.response?.data.body?.error.message ? err.response.data.body.error.message : 'Something went wrong and we cannot explain it.');

                (document.getElementById('fileForm') as HTMLFormElement).reset();
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

    const handleAvPopClose = () => (setSelected(false), setFileName(''), setAvatarPopup(false));

    return (
        <div className={o.content}>
            {postError ? <p className={o.error}>{postError}</p> : null}
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
                        <input autoComplete="off" autoFocus={true} autoCorrect="off" type="text" placeholder="New username" id="accountTagUpdate" name="accountTagUpdate" />
                        <div className={o.footer}>
                            <button onClick={() => setNamePopup(false)} type="reset">
                                Cancel
                            </button>
                            <button type="submit">Save changes</button>
                        </div>
                    </form>
                </dialog>
            ) : null}
            {avatarPopup ? (
                <dialog id="changeName" className={o.popup}>
                    <div onClick={handleAvPopClose} className={o.background}></div>
                    <form onSubmit={handleSubmit} id="fileForm" autoComplete="off">
                        <h1>
                            Change your avatar
                            <svg onClick={handleAvPopClose} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
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
                            <button onClick={handleAvPopClose} type="reset">
                                Cancel
                            </button>
                            <button type="submit" id="pevs" className={!selected ? 'disabled' : undefined} onClick={() => (document.getElementById('pevs') as HTMLElement).classList.add(`disabled`)}>
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
                            <Image src="https://api.nove.team/v1/users/00000000/avatar.webp" width={64} height={64} alt="Avatar" />
                            <a onClick={() => setAvatarPopup(true)}>Edit</a>
                        </div>
                    </div>
                    <div className={u.input}>
                        <header>Username</header>
                        <div className={u.content}>
                            <h1>wnm210</h1>
                            <a onClick={() => setNamePopup(true)}>Edit</a>
                        </div>
                    </div>
                </div>
                <div className={u.card}>
                    <header>Details</header>
                    <div className={u.input}>
                        <header>Bio</header>
                        <div className={u.content}>
                            <textarea id="bio" name="bio" rows={7} placeholder="Start typing to save..." />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
