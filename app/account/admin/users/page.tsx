export const dynamic = 'force-dynamic';
import a from '@sass/account/part.module.sass';
import { headers } from 'next/headers';
import LanguageHandler from '@util/handlers/LanguageHandler';
import Form from './Form';
import { getUser } from '@util/helpers/User';

export default async function Users() {
    const user = await getUser();
    const lang = await new LanguageHandler('admin/users', user).init(headers());

    return user?.username ? (
        <Form
            u={user}
            lang={{
                btnDelete: lang.getCustomProp('modules.actions.delete'),
                btnDisable: lang.getCustomProp('modules.actions.disable'),
                btnEnable: lang.getCustomProp('modules.actions.enable'),
                btnCancel: lang.getCustomProp('modules.actions.cancel'),
                btn: lang.getProp('popup-btn'),
                h1: lang.getProp('popup-h1'),
                p: lang.getProp('popup-p'),
                label: lang.getProp('popup-label'),
                labelReason: lang.getProp('popup-reason'),
            }}
        />
    ) : (
        <div className={a.content}>
            <h1 className={a.title}>{lang.getCustomProp('modules.errors.header')}</h1>
            <p className={a.desc}>{lang.getCustomProp('modules.errors.session')}</p>
        </div>
    );
}
