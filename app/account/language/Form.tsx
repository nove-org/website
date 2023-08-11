'use client';

import { axiosClient } from '@util/axios';
import { User } from '@util/schema';
import { getCookie } from 'cookies-next';
import ReactCountryFlag from 'react-country-flag';
import o from '@sass/account/language/page.module.sass';
import { useState } from 'react';
import Loader from '@app/Loader';

export default function Form({ user }: { user: User }) {
    const [loading, setLoading] = useState<boolean>(false);

    const handleLanguage = async (e: any) => (
        e.preventDefault(),
        setLoading(true),
        await axiosClient
            .patch('/v1/users/me', { language: e.target.language.value }, { headers: { Authorization: `Owner ${getCookie('napiAuthorizationToken')}` } })
            .then(() => window.location.reload())
    );

    return (
        <form className={o.box} id="languageForm" onSubmit={handleLanguage}>
            <label className={o.card}>
                <header>
                    <ReactCountryFlag countryCode="us" svg />
                    English, US
                </header>
                <input defaultChecked={user.language === 'en-US'} type="radio" name="language" value="en-US" />
            </label>
            <label className={o.card}>
                <header>
                    <ReactCountryFlag countryCode="pl" svg />
                    Polish
                </header>
                <input defaultChecked={user.language === 'pl-PL'} type="radio" name="language" value="pl-PL" />
            </label>
            <button type="submit">
                {loading ? <Loader type="button" /> : null}
                Save changes
            </button>
        </form>
    );
}
