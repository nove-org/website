import LanguageHandler from '@util/languages';
import NAPI from '@util/NAPI';
import Error from '../Error';
import o from './Language.module.sass';
import { cookies, headers } from 'next/headers';
import ReactCountryFlag from 'react-country-flag';
import { redirect } from 'next/navigation';
import Submit from './Submit';

export async function generateMetadata() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: false });
    const lang = await new LanguageHandler('dashboard/language', user).init(headers());
    const title: string = `${lang.getCustomProp('dashboard.layout.ul-language')} | Nove`;

    return {
        title,
        openGraph: { title },
        twitter: { card: 'summary_large_image', title },
    };
}

export default async function Language() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: false });
    const languages = await api.language().getAll({ caching: false });
    const lang = await new LanguageHandler('dashboard/language', user).init(headers());
    const l = new Intl.DisplayNames([user?.language || 'en-US'], { type: 'language' });

    const setLanguage = async (e: FormData) => {
        'use server';

        const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
        await api.user().update({
            body: {
                language: e.get('language')?.toString(),
            },
        });

        redirect(`?s=${new Date().getTime()}`);
    };

    return user ? (
        <div className={o.content}>
            <h1 className={o.title}>{lang.getCustomProp('dashboard.layout.ul-language')}</h1>
            <p className={o.description}>{lang.getProp('description')}</p>
            <form action={setLanguage}>
                {languages.AVAILABLE_LANGUAGES.map((language) => (
                    <label key={language} className={o.lang}>
                        <input type="radio" value={language} name="language" defaultChecked={user.language === language} />
                        <div className={o.header}>
                            <ReactCountryFlag countryCode={language.split('-')[1]} />
                            {l.of(language)}
                        </div>
                    </label>
                ))}
                <Submit lang={{ save: lang.getCustomProp('modules.actions.save-changes'), cancel: lang.getCustomProp('modules.actions.cancel') }} />
            </form>
        </div>
    ) : (
        <Error />
    );
}
