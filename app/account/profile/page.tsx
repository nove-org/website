import { axiosClient } from '@util/axios';
import Image from 'next/image';
import o from '@sass/account/profile/page.module.sass';
import { cookies } from 'next/headers';
import { Response, User } from '@util/schema';
import Username from './Username';

export default async function Overview() {
    const user: Response<User> = (
        await axiosClient
            .get('/v1/users/me', {
                headers: { Authorization: `Owner ${cookies()?.get('napiAuthorizationToken')?.value}` },
            })
            .catch((e) => e.response)
    ).data;

    return user?.body?.data?.username ? (
        <div className={o.content}>
            <h1 className={o.title}>My profile</h1>
            <p className={o.desc}>
                Manage your personal info that is displayed on your Nove account profile. You can change display method of your profile to private and public. While on private we
                will share only basic information about your account like username and avatar.
            </p>
            <h2>Basic account info</h2>
            <ul className={o.options}>
                <header>Avatar</header>
                <li>
                    <Image src={user.body.data.avatar} alt="Avatar" width="36" height="36" />
                    <button>Edit</button>
                </li>
                <Username user={user.body.data} cookie={cookies().get('napiAuthorizationToken')?.value} />
            </ul>
            <h2>Details</h2>
            <ul className={o.options}>
                <header>About me</header>
                <li>
                    <textarea spellCheck={false} defaultValue={user.body.data.bio} />
                    <button>Save</button>
                </li>
                <label className={o.li} htmlFor="switch">
                    <p>Display more details on your public profile</p>
                    <label className={o.switch}>
                        <input id="switch" type="checkbox" defaultChecked={true} />
                        <span className={o.slider}></span>
                    </label>
                </label>
            </ul>
        </div>
    ) : (
        <div className={o.content}>
            <h1 className={o.title}>Something is wrong with the API</h1>
            <p>We cannot sign your session which leads to data retrieval failure</p>
        </div>
    );
}
