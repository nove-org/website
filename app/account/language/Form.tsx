'use client';

import { axiosClient } from '@util/axios';
import { Languages, User } from '@util/schema';
import { getCookie } from 'cookies-next';
import ReactCountryFlag from 'react-country-flag';
import o from '@sass/account/language/page.module.sass';
import { useState } from 'react';
import Loader from '@app/Loader';

export default function Form({ user, code }: { user: User; code: Languages }) {
    const [loading, setLoading] = useState<boolean>(false);

    const handleLanguage = async (e: any) => (
        e.preventDefault(),
        setLoading(true),
        await axiosClient
            .patch('/v1/users/me', { language: e.target.language.value }, { headers: { Authorization: `Owner ${getCookie('napiAuthorizationToken')}` } })
            .then(() => window.location.reload())
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
                Save changes
            </button>
        </form>
    );
}
