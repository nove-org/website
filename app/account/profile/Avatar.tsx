'use client';

import { axiosClient } from '@util/axios';
import Image from 'next/image';
import { User } from '@util/schema';
import { useState } from 'react';
import o from '@sass/account/profile/page.module.sass';
import mime from 'mime-types';

export default function Avatar({
    user,
    cookie,
    lang,
}: {
    user: User;
    cookie?: string;
    lang: { header: string; save: string; edit: string; filename: string; select: string; notAllowed: string; tooBig: string };
}) {
    const [edit, setEdit] = useState<boolean>(false);
    const [postError, setPostError] = useState<string>();
    const [fileName, setFileName] = useState<string>();
    const [selected, setSelected] = useState<boolean>(false);

    const throwError = (message?: string, bool?: boolean) => {
        if (bool === false) return setPostError('');

        if (message) {
            setPostError(message.charAt(0).toUpperCase() + message.slice(1).toLowerCase());

            setTimeout(() => setPostError(''), 4000);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const elm = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (!elm || !elm.files) return;

        await axiosClient
            .patch('/v1/users/avatar', { file: elm.files[0] }, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Owner ${cookie}` } })
            .then(() => (setEdit(false), window.location.reload()))
            .catch((err) => {
                throwError(err.response?.data.body?.error.message ? err.response.data.body.error.message : 'Something went wrong and we cannot explain it.');
            });
    };

    const handleFileUpload = (e: any) => {
        setSelected(true), setFileName(e.target.value.replace(/.*[\/\\]/, ''));

        const elm = document.querySelector('input[type="file"]') as HTMLInputElement;
        const ext = mime.contentType(e.target.value.replace(/.*[\/\\]/, ''));

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

    return (
        <>
            <header>{lang.header}</header>
            <li>
                {!edit ? (
                    <>
                        <Image src={user.avatar} alt="Avatar" width="36" height="36" />
                        <button onClick={() => setEdit((e) => !e)}>{lang.edit}</button>
                    </>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <label>
                            <input onChange={handleFileUpload} id="accountAvatarUpdate" name="accountAvatarUpdate" type="file" accept="image/*" required />
                            <a>{lang.select}</a>
                            <p>{selected ? fileName : lang.filename}</p>
                        </label>
                        <button type="submit">{lang.save}</button>
                        {postError ? <p className="error">{postError}</p> : null}
                    </form>
                )}
            </li>
        </>
    );
}
