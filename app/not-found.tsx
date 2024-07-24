import NAPI from '@util/helpers/NAPI';
import LanguageHandler from '@util/handlers/LanguageHandler';
import o from './NotFound.module.sass';
import { cookies, headers } from 'next/headers';

export async function generateMetadata() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: false });
    const lang = await new LanguageHandler('modules/errors', user).init(headers());

    return {
        title: `${lang.getProp('not-found')} | Nove`,
    };
}

export default async function NotFound() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: false });
    const lang = await new LanguageHandler('modules/errors', user).init(headers());

    return (
        <section className={o.information}>
            <h1>404</h1>
            <p>{lang.getProp('not-found')}</p>
        </section>
    );
}
