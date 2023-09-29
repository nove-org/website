import { axiosClient } from '@util/axios';
import o from '@sass/account/profile/page.module.sass';
import { cookies, headers } from 'next/headers';
import { Response, User } from '@util/schema';
import Username from './Username';
import Bio from './Bio';
import ProfilePublic from './ProfilePublic';
import Avatar from './Avatar';
import LanguageHandler from '@util/handlers/LanguageHandler';

export default async function Overview() {
    const user: Response<User> = (
        await axiosClient
            .get('/v1/users/me', {
                headers: { Authorization: `Owner ${cookies()?.get('napiAuthorizationToken')?.value}` },
            })
            .catch((e) => e.response)
    ).data;

    const cookie = cookies().get('napiAuthorizationToken')?.value;

    const browserLanguage: string | undefined = headers().get('Accept-Language')?.split(',')[0];
    const lang = await new LanguageHandler('dashboard/profile', user.body.data).init(browserLanguage);

    return user?.body?.data?.username ? (
        <div className={o.content}>
            <h1 className={o.title}>{lang.getProp('title')}</h1>
            <p className={o.desc}>{lang.getProp('description')}</p>
            <h2>{lang.getProp('hero-ul-1')}</h2>
            <ul className={o.options}>
                <Avatar
                    lang={{
                        header: lang.getProp('input-avatar'),
                        edit: lang.getProp('input-btn-edit'),
                        save: lang.getProp('input-btn-save'),
                        select: lang.getProp('input-avatar-btn'),
                        filename: lang.getProp('input-avatar-filename'),
                        tooBig: lang.getProp('input-avatar-too-big'),
                        notAllowed: lang.getProp('input-avatar-not-allowed'),
                    }}
                    user={user.body.data}
                    cookie={cookie}
                />
                <Username
                    lang={{
                        header: lang.getProp('input-username'),
                        edit: lang.getProp('input-btn-edit'),
                        save: lang.getProp('input-btn-save'),
                        placeholder: lang.getProp('input-username-placeholder', { username: user?.body?.data?.username }),
                    }}
                    user={user.body.data}
                    cookie={cookie}
                />
            </ul>
            <h2>{lang.getProp('hero-ul-2')}</h2>
            <ul className={o.options}>
                <Bio
                    lang={{
                        save: lang.getProp('input-btn-save'),
                    }}
                    user={user.body.data}
                    cookie={cookie}
                />
                <ProfilePublic
                    lang={{
                        label: lang.getProp('input-profile-state-label'),
                    }}
                    user={user.body.data}
                    cookie={cookie}
                />
            </ul>
        </div>
    ) : (
        <div className={o.content}>
            <h1 className={o.title}>{lang.getProp('error-h1')}</h1>
            <p>{lang.getProp('error-p')}</p>
        </div>
    );
}
