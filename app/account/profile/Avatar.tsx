'use client';

import Image from 'next/image';
import { Response, User } from '@util/schema';
import { useState } from 'react';
import mime from 'mime-types';
import { useRouter } from 'next/navigation';
import { patchAvatar } from '@util/helpers/client/User';
import { errorHandler } from '@util/helpers/Main';
import { AxiosError } from 'axios';

export default function Avatar({
    user,
    lang,
}: {
    user: User;
    lang: { header: string; save: string; edit: string; filename: string; select: string; notAllowed: string; tooBig: string };
}) {
    const router = useRouter();
    const [edit, setEdit] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>();
    const [selected, setSelected] = useState<boolean>(false);

    const handleSubmit = async (e: FormData) =>
        await patchAvatar({ file: (document.querySelector('input[type="file"]') as HTMLInputElement).files![0] })
            .then(() => (setEdit(false), router.refresh()))
            .catch((err: AxiosError) => alert(errorHandler(err.response?.data as Response<null>)));

    const handleFileUpload = (e: any) => {
        setSelected(true), setFileName(e.target.value.replace(/.*[\/\\]/, ''));

        const elm = document.querySelector('input[type="file"]') as HTMLInputElement;
        const ext = mime.contentType(e.target.value.replace(/.*[\/\\]/, ''));

        if (!elm || !elm.files) return setSelected(false);

        if (!ext.toString().startsWith('image/')) {
            alert('The file type you are trying to upload is not allowed');
            (document.getElementById('fileForm') as HTMLFormElement).reset();
            return setSelected(false);
        }

        if (elm.files[0].size > 20000000) {
            alert('The file type you are trying to upload is too big');
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
                    <form action={handleSubmit}>
                        <label>
                            <input onChange={handleFileUpload} id="accountAvatarUpdate" name="accountAvatarUpdate" type="file" accept="image/*" required />
                            <a>{lang.select}</a>
                            <p>{selected ? fileName : lang.filename}</p>
                        </label>
                        <button type="submit">{lang.save}</button>
                    </form>
                )}
            </li>
        </>
    );
}
