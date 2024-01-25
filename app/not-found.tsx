export const dynamic = 'force-dynamic';
import o from '@sass/information.module.sass';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { headers } from 'next/headers';
import { getUser } from '@util/helpers/User';

export async function generateMetadata() {
    const lang = await new LanguageHandler('modules/errors', await getUser()).init(headers());

    return {
        title: `${lang.getProp('not-found')} | Nove`,
    };
}

export default async function NotFound() {
    const user = await getUser();
    const lang = await new LanguageHandler('modules/errors', user).init(headers());

    return (
        <section className={o.information}>
            <h1>404</h1>
            <p>{lang.getProp('not-found')}</p>
        </section>
    );
}
