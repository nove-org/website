'use client';

import { useEffect, useState } from 'react';
import o from './Profile.module.sass';
import Loader from '@app/Loader';

export default function Submit({ lang }: { lang: { save: string; cancel: string } }) {
    const [loading, setLoading] = useState<boolean>(false);
    const triggerLoading = () => {
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const bio = (document.getElementById('bio') as HTMLTextAreaElement).value;
        const website = (document.getElementById('website') as HTMLInputElement).value;

        bio.length <= 256 &&
        username.length <= 24 &&
        username.length > 2 &&
        username.match(/[a-zA-Z0-9\.\_\-]{3,24}$/g) &&
        website.length > 7 &&
        website.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi)
            ? setLoading(true)
            : undefined;
    };

    return (
        <div className={o.buttons}>
            <button type="submit" className={'btn ' + (loading ? o.loading : o.primary)} onClick={() => triggerLoading()}>
                {loading ? <Loader type="button" /> : lang.save}
            </button>
            <button type="reset" className="btn">
                {lang.cancel}
            </button>
        </div>
    );
}
