'use client';

import { useState } from 'react';
import o from '@sass/popup.module.sass';
import { useRouter } from 'next/navigation';
import { editPost } from '@util/helpers/client/Blog';
import { errorHandler } from '@util/helpers/Main';
import { AxiosError } from 'axios';
import { Response } from '@util/schema';

export default function Edit({
    lang,
    title,
    content,
    id,
}: {
    lang: {
        btn: string;
        btnSubmit: string;
        btnCancel: string;
        h1: string;
        label: string;
        labelContent: string;
    };
    title: string;
    content: string;
    id: string;
}) {
    const router = useRouter();
    const [popup, setPopup] = useState<boolean>(false);

    const handleEdit = async (e: FormData) =>
        await editPost({
            id,
            title: e.get('title')?.toString(),
            text: e.get('content')?.toString(),
        })
            .then((r) => (setPopup(false), router.refresh()))
            .catch((err: AxiosError) => alert(errorHandler(err.response?.data as Response<null>)));

    return (
        <>
            <button onClick={() => setPopup(true)}>{lang.btn}</button>
            {popup ? (
                <div className={o.popup}>
                    <div className={o.container}>
                        <h1>{lang.h1}</h1>
                        <form action={handleEdit}>
                            <label>
                                {lang.label}
                                <input
                                    required
                                    autoComplete="off"
                                    autoFocus={true}
                                    autoCorrect="off"
                                    type="text"
                                    placeholder={lang.label}
                                    defaultValue={title}
                                    id="title"
                                    name="title"
                                />
                            </label>
                            <label>
                                {lang.labelContent}
                                <textarea
                                    rows={10}
                                    required
                                    autoComplete="off"
                                    autoFocus={false}
                                    autoCorrect="off"
                                    placeholder={lang.labelContent}
                                    defaultValue={content}
                                    id="content"
                                    name="content"
                                />
                            </label>
                            <div className={o.footer}>
                                <button onClick={() => setPopup(false)} type="reset">
                                    {lang.btnCancel}
                                </button>
                                <button type="submit">{lang.btn}</button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
}
