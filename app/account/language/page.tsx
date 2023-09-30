import { axiosClient } from '@util/axios';
import a from '@sass/account/part.module.sass';
import o from '@sass/account/language/page.module.sass';
import { cookies, headers } from 'next/headers';
import { Response, User, Languages } from '@util/schema';
import Form from './Form';
import LanguageHandler from '@util/handlers/LanguageHandler';

export default async function Overview() {
    const user: Response<User> = (
        await axiosClient
            .get('/v1/users/me', {
                headers: { Authorization: `Owner ${cookies()?.get('napiAuthorizationToken')?.value}` },
            })
            .catch((e) => e.response)
    ).data;
    const languages: Response<Languages> = (await axiosClient.get('/v1/languages').catch((e) => e.response)).data;
    const browserLanguage: string | undefined = headers().get('Accept-Language')?.split(',')[0];
    const lang = await new LanguageHandler('dashboard/language', user.body.data).init(browserLanguage);

    return user?.body?.data?.username ? (
        <div className={a.content}>
            <h1 className={a.title}>{lang.getProp('hero-h1')}</h1>
            <p className={a.desc}>{lang.getProp('hero-p1')}</p>
            <p className={a.desc}>{lang.getProp('hero-p2')}</p>
            <Form user={user.body.data} code={languages.body.data} />
        </div>
    ) : (
        <div className={o.content}>
            <h1 className={o.title}>{lang.getProp('error-h1')}</h1>
            <p>{lang.getProp('error-p')}</p>
        </div>
    );
}
