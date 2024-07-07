import LanguageHandler from '@util/handlers/LanguageHandler';
import NAPI from '@util/helpers/NAPI';
import Error from '../Error';
import o from './Profile.module.sass';
import { cookies, headers } from 'next/headers';

export async function generateMetadata() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const lang = await new LanguageHandler('dashboard/profile', user).init(headers());
    const title: string = `${lang.getCustomProp('dashboard.layout.ul-profile')} | Nove`;

    return {
        title,
        openGraph: { title },
        twitter: { card: 'summary_large_image', title },
    };
}

export default async function Profile() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const lang = await new LanguageHandler('dashboard/profile', user).init(headers());

    return user ? (
        <div className={o.content}>
            <h1 className={o.title}>{lang.getCustomProp('dashboard.layout.ul-profile')}</h1>
            <p className={o.description}>{lang.getProp('description')}</p>
        </div>
    ) : (
        <Error />
    );
}
