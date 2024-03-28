'use client';

import o from '@sass/login.module.sass';
import { resetPasswordCall } from '@util/helpers/client/Account';
import { errorHandler } from '@util/helpers/Main';
import { AxiosError } from 'axios';
import { Response } from '@util/schema';
import Link from 'next/link';

export default function ResetForm({ lang }: { lang: { inputEmail: string; inputNewPassword: string; inputBtn: string; success: string } }) {
    const handleResetForm = async (e: FormData) =>
        await resetPasswordCall({ email: e.get('email')?.toString(), newPassword: e.get('password')?.toString() })
            .then(() => alert(lang.success))
            .catch((err: AxiosError) => alert(errorHandler(err.response?.data as Response<null>)));

    return (
        <form id="loginForm" action={handleResetForm} className={o.login}>
            <label htmlFor="email">
                {lang.inputEmail}
                <input type="text" id="email" name="email" placeholder="Your email" />
            </label>
            <label htmlFor="password">
                {lang.inputNewPassword}
                <input type="password" id="password" name="password" placeholder="Your new password" required />
            </label>
            <div className={o.buttons}>
                <Link href="/login">{'Log in'}</Link>
                <button type="submit">{lang.inputBtn}</button>
            </div>
        </form>
    );
}
