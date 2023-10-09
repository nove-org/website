import { axiosClient } from '@util/axios';
import a from '@sass/account/part.module.sass';
import o from '@sass/account/admin/page.module.sass';
import { cookies, headers } from 'next/headers';
import { Response, User, Languages } from '@util/schema';
import { redirect } from 'next/navigation';
import LanguageHandler from '@util/handlers/LanguageHandler';
import Form from './Form';

export default async function Users() {
    const user: Response<User> = (
        await axiosClient
            .get('/v1/users/me', {
                headers: { Authorization: `Owner ${cookies()?.get('napiAuthorizationToken')?.value}` },
            })
            .catch((e) => e.response)
    )?.data;

    if (user.body.data.permissionLevel < 1) return redirect('/account');

    const languages: Response<Languages> = (await axiosClient.get('/v1/languages').catch((e) => e.response))?.data;
    const lang = await new LanguageHandler('admin/users', user?.body?.data).init(headers());

    return user?.body?.data?.username && languages?.body?.data ? (
        <div className={a.content}>
            <Form
                u={user.body.data}
                lang={{
                    btn: lang.getProp('popup-btn'),
                    btnCancel: lang.getProp('popup-btn-cancel'),
                    h1: lang.getProp('popup-h1'),
                    label: lang.getProp('popup-label'),
                    p: lang.getProp('popup-p'),
                }}
            />
        </div>
    ) : (
        <div className={a.content}>
            <h1 className={a.title}>{lang.getProp('error-h1')}</h1>
            <p>{lang.getProp('error-p')}</p>
        </div>
    );
}
