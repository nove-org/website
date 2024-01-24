export const dynamic = 'force-dynamic';
import a from '@sass/account/part.module.sass';
import o from '@sass/account/profile/page.module.sass';
import { cookies, headers } from 'next/headers';
import Username from './Username';
import Bio from './Bio';
import ProfilePublic from './ProfilePublic';
import Avatar from './Avatar';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { getUser } from '@util/helpers/User';

export default async function Overview() {
    const user = await getUser();
    const cookie = cookies().get('napiAuthorizationToken')?.value;
    const lang = await new LanguageHandler('dashboard/profile', user).init(headers());

    return user?.username ? (
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
                    user={user}
                />
                <Username
                    lang={{
                        header: lang.getProp('input-username'),
                        edit: lang.getCustomProp('modules.actions.edit'),
                        save: lang.getCustomProp('modules.actions.save'),
                        placeholder: lang.getProp('input-username-placeholder', { username: user.username }),
                    }}
                    user={user}
                />
            </ul>
            <h2>{lang.getProp('hero-ul-2')}</h2>
            <ul className={o.options}>
                <Bio
                    lang={{
                        header: lang.getProp('input-bio'),
                        save: lang.getCustomProp('modules.actions.save'),
                    }}
                    user={user}
                />
                <ProfilePublic
                    lang={{
                        label: lang.getProp('input-profile-state-label'),
                    }}
                    user={user}
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
