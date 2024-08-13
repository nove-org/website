import LanguageHandler from '@util/languages';
import NAPI from '@util/NAPI';
import Error from '../Error';
import o from './Profile.module.sass';
import { cookies, headers } from 'next/headers';
import Databox from '@app/Databox';
import Image from 'next/image';
import ReactCountryFlag from 'react-country-flag';
import { redirect } from 'next/navigation';
import Submit from './Submit';
import FormError from '../FormError';
import ObjectHelper from '@util/object';

export async function generateMetadata() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: false });
    const lang = await new LanguageHandler('dashboard/profile', user).init(headers());
    const title: string = `${lang.getCustomProp('dashboard.layout.ul-profile')} | Nove`;

    return {
        title,
        openGraph: { title },
        twitter: { card: 'summary_large_image', title },
    };
}

export default async function Profile({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: false });
    const error: string | undefined = ObjectHelper.getValueByStringPath(searchParams, 'et');
    const lang = await new LanguageHandler('dashboard/profile', user).init(headers());

    const setProfile = async (e: FormData) => {
        'use server';

        const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
        const oldUsername = user?.username;
        const newUsername = e.get('username')?.toString();

        if ((e.get('avatar') as File).name !== 'undefined' && (e.get('avatar') as File).size !== 0) {
            await api.user().updateAvatar({ body: { file: e.get('avatar') as File } });
        }

        const updated = await api.user().update({
            body: {
                username: newUsername !== oldUsername ? newUsername : undefined,
                website: e.get('website')?.toString(),
                bio: e.get('bio')?.toString(),
                profilePublic: Boolean(e.get('profilePublic')?.toString()),
            },
        });

        if (updated?.code) {
            switch (updated.code) {
                case 'username_taken':
                    redirect(`?et=ut`);
                case 'rate_limit':
                    redirect(`?et=rl`);
                default:
                    redirect(`?et=u`);
            }
        } else redirect(`?s=${new Date().getTime()}`);
    };

    return user ? (
        <div className={o.content}>
            <h1 className={o.title}>{lang.getCustomProp('dashboard.layout.ul-profile')}</h1>
            <p className={o.description}>{lang.getProp('description')}</p>
            <div className={o.profile}>
                <form action={setProfile}>
                    {error === 'u' ? (
                        <FormError text={lang.getCustomProp('modules.errors.other')} />
                    ) : error === 'rl' ? (
                        <FormError text={lang.getCustomProp('modules.errors.rate-limit')} />
                    ) : null}
                    <div className={o.avatar}>
                        <label>
                            <Image src={user.avatar} width={36} height={36} alt="User's avatar" />
                            <div className={o.dynamic}>
                                <span>{lang.getProp('avatar-btn')}</span>
                                <input type="file" id="avatar" name="avatar" accept="image/*" />
                            </div>
                        </label>
                        <p>
                            {lang.getProp('avatar-h1')}
                            <span>{lang.getProp('avatar-p')}</span>
                        </p>
                    </div>
                    <Databox id="id" title={lang.getProp('uid-h1')} description={lang.getProp('uid-p')} type="text" readOnly={true} value={user.id} required={true} />
                    <Databox
                        id="username"
                        title={lang.getProp('username-h1')}
                        description={lang.getProp('username-p')}
                        type="text"
                        placeholder="..."
                        value={user.username}
                        required={true}
                        minLength={3}
                        max={24}
                        regex={'[a-zA-Z0-9\\-_\\.]+'}
                    />
                    {error === 'ut' && <FormError text={lang.getProp('username-taken')} />}
                    <Databox
                        id="website"
                        title={lang.getProp('website-h1')}
                        description={lang.getProp('website-p')}
                        type="url"
                        placeholder="https://nove.team"
                        value={user.website}
                        minLength={7}
                    />
                    <Databox id="bio" title={lang.getProp('bio-h1')} description={lang.getProp('bio-p')} type="textarea" placeholder="..." value={user.bio} maxLength={256} />
                    <Databox id="profilePublic" title={lang.getProp('profile-view-h1')} description={lang.getProp('profile-view-p')} type="switch" checked={user.profilePublic} />
                    <Submit lang={{ save: lang.getCustomProp('modules.actions.save-changes'), cancel: lang.getCustomProp('modules.actions.cancel') }} />
                </form>
                <aside>
                    <h1>{lang.getProp('preview-h1')}</h1>
                    <div className={o.profile}>
                        <Image src={user.avatar} width={52} height={52} alt="User's avatar" />
                        <h1>
                            {user.username}
                            {user.profilePublic && (
                                <ReactCountryFlag
                                    countryCode={user.language.split('-')[1]}
                                    style={{
                                        fontSize: '16px',
                                    }}
                                />
                            )}
                        </h1>
                        {user.profilePublic && (
                            <>
                                {user.bio.length && (
                                    <div className={o.section}>
                                        <h2>{lang.getProp('bio-h1')}</h2>
                                        <p>{user.bio}</p>
                                    </div>
                                )}
                                {user.website.length && (
                                    <div className={o.section}>
                                        <h2>{lang.getProp('website-h1')}</h2>
                                        <a href={user.website} rel="nofollow noopener noreferrer">
                                            {new URL(user.website).hostname + (new URL(user.website).pathname !== '/' ? new URL(user.website).pathname : '')}
                                        </a>
                                    </div>
                                )}
                            </>
                        )}
                        <div className={o.footer}>
                            {user.profilePublic && (
                                <span>
                                    {lang.getProp('created-at', {
                                        date: new Date(user.createdAt).toLocaleDateString(user.language, { year: 'numeric', month: 'short', day: 'numeric' }),
                                    })}
                                </span>
                            )}
                            <span>#{user.id}</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    ) : (
        <Error />
    );
}
