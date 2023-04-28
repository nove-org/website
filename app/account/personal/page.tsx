'use client';

import o from '~/account/page.module.sass';

export default function AccountPersonal() {
    return (
        <div className={o.content}>
            <h1 className={o.title}>Personal info</h1>
            <p className={o.description}>Manage your personal info displayed on your Nove account profile. You can change display method of your profile to private and public. While on private profile we will share only basic info about your account like username and avatar.</p>
            <div className={o.profile}></div>
        </div>
    );
}
