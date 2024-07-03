import LanguageHandler from '@util/handlers/LanguageHandler';
import NAPI from '@util/helpers/NAPI';
import Error from '../Error';
import o from './OAuth2.module.sass';
import { cookies, headers } from 'next/headers';
import Loader from '@app/Loader';

export default async function OAuth2() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const lang = await new LanguageHandler('dashboard/oauth2', user).init(headers());

    return user ? (
        <div className={o.content}>
            <h1 className={o.title}>{lang.getCustomProp('dashboard.layout.ul-oauth2')}</h1>
            <p className={o.description}>{lang.getProp('description')}</p>
            <div className={o.connections}>
                <div className={o.loader}>
                    <Loader type="button" />
                    Please wait, loading the data...
                </div>
            </div>
        </div>
    ) : (
        <Error />
    );
}
