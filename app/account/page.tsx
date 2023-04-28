'use client';

import Image from 'next/image';
import { useState } from 'react';

import o from '~/account/page.module.sass';
import Connection from './connection';
import Card from './card';

export default function Account() {
    const [namePopup, setNamePopup] = useState<boolean>(false);

    return (
        <div className={o.content}>
            {namePopup ? (
                <dialog id="changeName" className={o.popup}>
                    <div onClick={() => setNamePopup(false)} className={o.background}></div>
                    <form autoComplete="off">
                        <h1>
                            Change your username
                            <svg onClick={() => setNamePopup(false)} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
                            </svg>
                        </h1>
                        <p>Type something new, unique and easy to remember. This is alias to your account which means you can log in with it to your Nove account.</p>
                        <input autoComplete="off" autoFocus={true} autoCorrect="off" type="text" placeholder="New username" id="accountTagUpdate" name="accountTagUpdate" />
                        <div className={o.footer}>
                            <button onClick={() => setNamePopup(false)} type="reset">
                                Cancel
                            </button>
                            <button type="submit">Save changes</button>
                        </div>
                    </form>
                </dialog>
            ) : null}
            <h1 className={o.title}>Overview</h1>
            <div className={o.card}>
                <label htmlFor="image">
                    <Image src="https://api.nove.team/v1/users/00000000/avatar.webp" width={96} height={96} alt="User avatar" />
                </label>
                <div className={o.content}>
                    <div className={o.username}>
                        <h1>wnm210</h1>
                        <button onClick={() => setNamePopup(true)}>Edit</button>
                    </div>
                    <div className={o.email}>wnm210@****.team</div>
                </div>
            </div>
            <div className={o.shortcuts}>
                <Card name="Language" description="Change your language preferences" option="English, US" url="/account/language" />
                <Card name="Recent activity" description="Check recent activity on your account" option="2 sessions on Linux" url="/account/security" />
                <Card name="Account recovery" description="Set up two factor authentication and download backup codes" option="Download" url="/account/security" />
            </div>
            <div className={o.connections}>
                <h2>Account connections</h2>
                <Connection data={{ name: 'cheems.dog', logo: '/cdn/assets/cheems.png', permissionLevel: 0 }} />
            </div>
        </div>
    );
}
