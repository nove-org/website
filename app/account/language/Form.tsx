'use client';

import { axiosClient } from '@util/axios';
import { Languages, User } from '@util/schema';
import { getCookie } from 'cookies-next';
import ReactCountryFlag from 'react-country-flag';
import o from '@sass/account/language/page.module.sass';
import { useState } from 'react';
import Loader from '@app/Loader';
import { useRouter } from 'next/navigation';

export default function Form({ user, code, saveChanges }: { user: User; code: Languages; saveChanges: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const handleLanguage = async (e: any) => (
        e.preventDefault(),
        setLoading(true),
        await axiosClient
            .patch('/v1/users/me', { language: e.target.language.value }, { headers: { Authorization: `Owner ${getCookie('napiAuthorizationToken')}` } })
            .then((r) => (setLoading(false), router.refresh()))
    );

    const lang = new Intl.DisplayNames([user.language], { type: 'language' });

    return (
        <form className={o.box} id="languageForm" onSubmit={handleLanguage}>
            {code.AVAILABLE_LANGUAGES.map((code) => (
                <label key={code} className={o.card}>
                    <header>
                        <ReactCountryFlag countryCode={code.split('-')[1]} svg />
                        {lang.of(code)}
                    </header>
                    <input defaultChecked={user.language === code} type="radio" name="language" value={code} />
                </label>
            ))}
            <button type="submit">
                {loading ? <Loader type="button" /> : null}
                {saveChanges}
            </button>
        </form>
    );
}
