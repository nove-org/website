import LanguageHandler from '@util/handlers/LanguageHandler';
import NAPI from '@util/helpers/NAPI';
import Error from '../Error';
import o from './Language.module.sass';
import { cookies, headers } from 'next/headers';
import ReactCountryFlag from 'react-country-flag';

export async function generateMetadata() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
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
    const user = await api.user().get({ caching: true });
    const languages = await api.language().getAll({ caching: true });
    const lang = await new LanguageHandler('dashboard/language', user).init(headers());
    const l = new Intl.DisplayNames([user?.language || 'en-US'], { type: 'language' });

    return user ? (
        <div className={o.content}>
            <h1 className={o.title}>{lang.getCustomProp('dashboard.layout.ul-language')}</h1>
            <p className={o.description}>{lang.getProp('description')}</p>
            <form>
                {languages.AVAILABLE_LANGUAGES.map((language) => (
                    <label key={language} className={o.lang}>
                        <input type="radio" value={language} name="language" defaultChecked={user.language === language} />
                        <div className={o.header}>
                            <ReactCountryFlag countryCode={language.split('-')[1]} />
                            {l.of(language)}
                        </div>
                    </label>
                ))}
                <div className={o.buttons}>
                    <button type="submit" className={'btn ' + o.primary}>
                        Save changes
                    </button>
                    <button type="reset" className="btn">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    ) : (
        <Error />
    );
}
