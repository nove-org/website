export const dynamic = 'force-dynamic';
import a from '@sass/account/part.module.sass';
import { headers } from 'next/headers';
import Form from './Form';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { getUser } from '@util/helpers/User';
import { getLanguages } from '@util/helpers/Main';

export default async function Overview() {
    const user = await getUser();
    const languages = await getLanguages();
    const lang = await new LanguageHandler('dashboard/language', user).init(headers());

    return user?.username && languages ? (
        <div className={a.content}>
            <h1 className={a.title}>{lang.getProp('hero-h1')}</h1>
            <p className={a.desc}>{lang.getProp('hero-p1')}</p>
            <Form saveChanges={lang.getCustomProp('modules.actions.save-changes')} user={user} code={languages} />
        </div>
    ) : (
        <div className={a.content}>
            <h1 className={a.title}>{lang.getCustomProp('modules.errors.header')}</h1>
            <p className={a.desc}>{lang.getCustomProp('modules.errors.session')}</p>
        </div>
    );
}
