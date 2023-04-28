'use client';

import Image from 'next/image';

import o from '~/account/page.module.sass';

export default function AccountPersonal() {
    return (
        <div className={o.content}>
            <h1 className={o.title}>Personal info</h1>
            <p className={o.description}>Manage your personal info displayed on your Nove account profile. You can change display method of your profile to private and public. While on private profile we will share only basic info about your account like username and avatar.</p>

            <div className={o.profile}>
                <div className={o.card}>
                    <header>Basic account info</header>
                    <div className={o.input}>
                        <header>Username</header>
                        <div className={o.content}>
                            <h1>wnm210</h1>
                            <span>Edit</span>
                        </div>
                    </div>
                    <div className={o.input}>
                        <header>Avatar</header>
                        <div className={o.content}>
                            <Image src="/cdn/assets/avatar.png" width={64} height={64} alt="Avatar" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
