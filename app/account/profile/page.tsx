import { axiosClient } from '@util/axios';
import a from '@sass/account/part.module.sass';
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
    )?.data;

    const cookie = cookies().get('napiAuthorizationToken')?.value;

    const lang = await new LanguageHandler('dashboard/profile', user?.body?.data).init(headers());

    return user?.body?.data?.username ? (
        <div className={a.content}>
            <h1 className={a.title}>{lang.getCustomProp('dashboard.layout.ul-profile')}</h1>
            <p className={a.desc}>{lang.getProp('description')}</p>
            <h2>{lang.getProp('hero-ul-1')}</h2>
            <ul className={o.options}>
                <Avatar
                    lang={{
                        header: lang.getProp('input-avatar'),
                        edit: lang.getCustomProp('modules.actions.edit'),
                        save: lang.getCustomProp('modules.actions.save'),
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
                        edit: lang.getCustomProp('modules.actions.edit'),
                        save: lang.getCustomProp('modules.actions.save'),
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
                        header: lang.getProp('input-bio'),
                        save: lang.getCustomProp('modules.actions.save'),
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
        <div className={a.content}>
            <h1 className={a.title}>{lang.getCustomProp('modules.errors.header')}</h1>
            <p className={a.desc}>{lang.getCustomProp('modules.errors.session')}</p>
        </div>
    );
}
