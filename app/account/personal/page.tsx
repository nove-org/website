'use client';

import Image from 'next/image';

import o from '~/account/page.module.sass';
import u from '~/account/personal.module.sass';

export default function AccountPersonal() {
    return (
        <div className={o.content}>
            <h1 className={o.title}>Personal info</h1>
            <p className={o.description}>Manage your personal info displayed on your Nove account profile. You can change display method of your profile to private and public. While on private profile we will share only basic info about your account like username and avatar.</p>

            <div className={u.profile}>
                <div className={u.card}>
                    <header>Basic account info</header>
                    <div className={u.input}>
                        <header>Avatar</header>
                        <div className={u.content}>
                            <Image src="https://api.nove.team/v1/users/00000000/avatar.webp" width={64} height={64} alt="Avatar" />
                            <a>Edit</a>
                        </div>
                    </div>
                    <div className={u.input}>
                        <header>Username</header>
                        <div className={u.content}>
                            <h1>wnm210</h1>
                            <a>Edit</a>
                        </div>
                    </div>
                </div>
                <div className={u.card}>
                    <header>Details</header>
                    <div className={u.input}>
                        <header>Bio</header>
                        <div className={u.content}>
                            <textarea id="bio" name="bio" rows={7} placeholder="Start typing to save..." />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
