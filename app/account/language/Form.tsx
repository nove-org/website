'use client';

import { axiosClient } from '@util/axios';
import { Languages, User } from '@util/schema';
import { getCookie } from 'cookies-next';
import ReactCountryFlag from 'react-country-flag';
import Image from 'next/image';
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
            .catch((e) => alert(e))
    );

    const lang = new Intl.DisplayNames([user.language === 'sw-PL' ? 'pl-PL' : user.language], { type: 'language' });

    return (
        <form className={o.box} id="languageForm" onSubmit={handleLanguage}>
            {code.AVAILABLE_LANGUAGES.map((code) => (
                <label key={code} className={o.card}>
                    <header>
                        {code === 'sw-PL' ? <Image src="/sw-PL.png" width="16" height="12" alt="pl-SW flag" /> : <ReactCountryFlag countryCode={code.split('-')[1]} />}
                        {code === 'sw-PL'
                            ? (lang.of('pl-PL')?.charAt(0) === lang.of('pl-PL')?.charAt(0).toUpperCase() ? 'Szwajnisch' : 'szwajnisch') + ` ${lang.of('pl-PL')?.split(/\s+/)[1]}`
                            : lang.of(code)}
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
