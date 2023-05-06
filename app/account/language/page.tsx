'use client';

import { useState, useEffect } from 'react';
import { Response, User } from '@/app/Interfaces';
import { axiosClient } from '@/app/utils';
import Loader from '@/app/loader';
import ReactCountryFlag from 'react-country-flag';

import o from '~/account/page.module.sass';

export default function AccountLanguage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<Response<User>>();
    const [selectedLang, setSelectedLang] = useState<string>();
    const [postError, setPostError] = useState<string>();

    const throwError = (message?: string, bool?: boolean) => {
        if (bool === false) return setPostError('');

        if (message) {
            setPostError(message.charAt(0).toUpperCase() + message.slice(1).toLowerCase());

            setTimeout(() => setPostError(''), 5000);
        }
    };

    const lang = new Intl.DisplayNames(['en'], { type: 'language' });

    useEffect(() => {
        const getData = async () => {
            await axiosClient
                .get('/users/me', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Owner ${localStorage.getItem('key')}`,
                    },
                })
                .then((res) => (res.data ? setData(res.data) : null, setLoading(false)))
                .catch((err) => (err.response?.data ? setData(err.response.data) : null, setLoading(false)));
        };

        getData();
    }, [selectedLang]);

    const handleInputChange = async (event: any) => {
        setLoading(true);

        await axiosClient
            .patch(
                '/users/me',
                {
                    language: event.target.value,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Owner ${localStorage.getItem('key')}`,
                    },
                }
            )
            .then(() => setSelectedLang(event.target.value))
            .catch((err) => {
                throwError(err.response?.data.body?.error.message ? err.response.data.body.error.message : 'Something went wrong and we cannot explain it.');

                (document.getElementById('languageForm') as HTMLFormElement).reset();
            });
    };

    return loading ? (
        <main>
            <title>Dashboard — Nove</title>
            <Loader type="window" />
        </main>
    ) : data?.body?.data ? (
        <div className={o.content}>
            <h1 className={o.title}>Language</h1>
            <p className={o.description}>
                Select your preferred language. This setting will be used to display content in your language on all Nove websites and your connected apps might use it.
            </p>
            <form id="languageForm">
                <label className={o.card}>
                    <input defaultChecked={data.body.data.language === 'en-US'} type="radio" name="language" onChange={handleInputChange} value="en-US" />
                    <header>
                        English, US
                        <ReactCountryFlag countryCode="us" svg />
                    </header>
                </label>
                <label className={o.card}>
                    <input defaultChecked={data.body.data.language === 'en-GB'} type="radio" name="language" onChange={handleInputChange} value="en-GB" />
                    <header>
                        English, UK
                        <ReactCountryFlag countryCode="gb" svg />
                    </header>
                </label>
                <label className={o.card}>
                    <input defaultChecked={data.body.data.language === 'pl-PL'} type="radio" name="language" onChange={handleInputChange} value="pl-PL" />
                    <header>
                        Polish
                        <ReactCountryFlag countryCode="pl" svg />
                    </header>
                </label>
            </form>
        </div>
    ) : (
        <main>
            <title>Dashboard — Nove</title>
            <Loader
                type="hidden"
                text={
                    data?.body?.error?.message
                        ? data.body.error.message.charAt(0) + data.body.error.message.slice(1).toLowerCase()
                        : "Something went wrong and we can't reach the API"
                }
            />
        </main>
    );
}
