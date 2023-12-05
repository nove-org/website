'use client';

import { useState } from 'react';
import o from '@sass/popup.module.sass';
import { axiosClient } from '@util/axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export default function NewPost({
    lang,
}: {
    lang: {
        btn: string;
        btnSubmit: string;
        btnCancel: string;
        h1: string;
        label: string;
        labelContent: string;
    };
}) {
    const router = useRouter();
    const [popup, setPopup] = useState<boolean>(false);

    const createPost = async (form: FormData) => {
        await axiosClient
            .post('/v1/blog/create', { title: form.get('title'), text: form.get('content') }, { headers: { Authorization: `Owner ${getCookie('napiAuthorizationToken')}` } })
            .then((r) => (setPopup(false), router.refresh()))
            .catch((e) => e.response);
    };

    return (
        <>
            <button onClick={() => setPopup(true)}>{lang.btn}</button>
            {popup ? (
                <div className={o.popup}>
                    <div className={o.container}>
                        <h1>{lang.h1}</h1>
                        <form action={createPost}>
                            <label>
                                {lang.label}
                                <input required autoComplete="off" autoFocus={true} autoCorrect="off" type="text" placeholder={lang.label} id="title" name="title" />
                            </label>
                            <label>
                                {lang.labelContent}
                                <textarea rows={10} required autoComplete="off" autoFocus={false} autoCorrect="off" placeholder={lang.labelContent} id="content" name="content" />
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
