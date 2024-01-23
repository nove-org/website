export const dynamic = 'force-dynamic';
import o from '@sass/information.module.sass';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { headers } from 'next/headers';
import { getUser } from '@util/helpers/User';

export default async function NotFound() {
    const user = await getUser();
    const lang = await new LanguageHandler('modules/errors', user).init(headers());

    return (
        <section className={o.information}>
            <h1>{lang.getProp('header')}</h1>
            <p>{lang.getProp('not-found')}</p>
        </section>
    );
}
