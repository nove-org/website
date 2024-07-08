import LanguageHandler from '@util/handlers/LanguageHandler';
import NAPI from '@util/helpers/NAPI';
import Error from '../Error';
import o from './Profile.module.sass';
import { cookies, headers } from 'next/headers';
import Databox from '@app/Databox';
import Image from 'next/image';

export async function generateMetadata() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const lang = await new LanguageHandler('dashboard/profile', user).init(headers());
    const title: string = `${lang.getCustomProp('dashboard.layout.ul-profile')} | Nove`;

    return {
        title,
        openGraph: { title },
        twitter: { card: 'summary_large_image', title },
    };
}

export default async function Profile() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const lang = await new LanguageHandler('dashboard/profile', user).init(headers());

    return user ? (
        <div className={o.content}>
            <h1 className={o.title}>{lang.getCustomProp('dashboard.layout.ul-profile')}</h1>
            <p className={o.description}>{lang.getProp('description')}</p>
            <form>
                <div className={o.avatar}>
                    <label>
                        <Image src={user.avatar} width={36} height={36} alt="User's avatar" />
                        <div className={o.dynamic}>
                            <span>Change your avatar</span>
                            <input type="file" />
                        </div>
                    </label>
                    <p>
                        Avatar
                        <span>An image shown to users on all our services. Helps recognizing you among your friends and colleagues.</span>
                    </p>
                </div>
                <Databox
                    id="id"
                    title="Unique identifier"
                    description="Special identifier that is linked to your account. You can't modify it. Useful for developers."
                    type="text"
                    readOnly={true}
                    value={user.id}
                    required={true}
                />
                <Databox
                    id="username"
                    title="Username"
                    description="Username that is displayed on all our services and is shown to other users."
                    type="text"
                    placeholder="..."
                    value={user.username}
                    required={true}
                />
                <Databox
                    id="website"
                    title="Website"
                    description="Optional website field. A custom link that is placed below about me section on your profile."
                    type="url"
                    placeholder="https://nove.team"
                    value={user.website}
                />
                <Databox
                    id="bio"
                    title="About me"
                    description="Optional about me field. Personalized space where you can write your thoughts you want to share with the world."
                    type="textarea"
                    placeholder="..."
                    value={user.bio}
                />
                <Databox
                    id="profilePublic"
                    title="Public profile"
                    description="Display more details (language, about me, website) on your public profile. OAuth2 apps are able (with proper permissions) to access this data no matter the setting."
                    type="switch"
                    checked={user.profilePublic}
                />
                <div className={o.buttons}>
                    <button type="submit" className={'btn ' + o.primary}>
                        Save changes
                    </button>
                    <button type="reset" className="btn">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    ) : (
        <Error />
    );
}
