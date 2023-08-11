import { axiosClient } from '@util/axios';
import a from '@sass/account/part.module.sass';
import o from '@sass/account/language/page.module.sass';
import { cookies } from 'next/headers';
import { Response, User } from '@util/schema';
import Form from './Form';

export default async function Overview() {
    const user: Response<User> = (
        await axiosClient
            .get('/v1/users/me', {
                headers: { Authorization: `Owner ${cookies()?.get('napiAuthorizationToken')?.value}` },
            })
            .catch((e) => e.response)
    ).data;

    return user?.body?.data?.username ? (
        <div className={a.content}>
            <h1 className={a.title}>Language</h1>
            <p className={a.desc}>
                Select your preferred language. This setting will be used to display content in your language on all Nove websites and your connected apps might use it.
            </p>
            <p className={a.desc}>Not fully supported by us yet. You might want to set it for OAuth2 apps to use.</p>
            <Form user={user.body.data} />
        </div>
    ) : (
        <div className={o.content}>
            <h1 className={o.title}>Something is wrong with the API</h1>
            <p>We cannot sign your session which leads to data retrieval failure</p>
        </div>
    );
}
