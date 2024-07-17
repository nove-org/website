import NAPI from '@util/helpers/NAPI';
import o from '../Popup.module.sass';
import Popup from '../Popup';
import { cookies, headers } from 'next/headers';
import LanguageHandler from '@util/handlers/LanguageHandler';
import Databox from '@app/Databox';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import FormError from '../FormError';

export default async function Password({ et }: { et?: string }) {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const lang = await new LanguageHandler('dashboard/security', user).init(headers());

    if (!user) redirect('/account/security');

    const updatePassword = async (e: FormData) => {
        'use server';

        const oldPassword = e.get('oldPassword')?.toString();
        const newPassword = e.get('newPassword')?.toString();
        const code = e.get('code')?.toString();

        if (!oldPassword || !newPassword) redirect('?p=password&et=nd');
        if (!code && user.mfaEnabled) redirect('?p=password&et=nd');

        const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
        const updated = await api.user().updatePassword({
            body: {
                oldPassword,
                newPassword,
                code,
            },
        });

        if (updated?.code) {
            switch (updated.code) {
                case 'invalid_user':
                case 'invalid_password':
                    redirect('?p=password&et=ip');
                case 'weak_password':
                    redirect('?p=password&et=wp');
                case 'rate_limit':
                    redirect('?p=password&et=rl');
                case 'invalid_mfa':
                    redirect('?p=password&et=im');
                default:
                    redirect('?p=password&et=u');
            }
        } else redirect(`?s=${new Date().getTime()}`);
    };

    return (
        <Popup
            title={lang.getProp('hds-password-h1')}
            description={lang.getProp('hds-password-p')}
            d="M 4 4 C 2.894531 4 2 4.894531 2 6 L 2 14 C 2 15.105469 2.894531 16 4 16 L 11.09375 16 C 11.53125 13.386719 13.660156 11.371094 16.3125 11.0625 C 16.117188 10.753906 16 10.390625 16 10 C 16 8.894531 16.894531 8 18 8 C 19.105469 8 20 8.894531 20 10 C 20 10.589844 19.75 11.101563 19.34375 11.46875 C 20.433594 11.929688 21.351563 12.710938 22 13.6875 L 22 6 C 22 4.894531 21.105469 4 20 4 Z M 6 8 C 7.105469 8 8 8.894531 8 10 C 8 11.105469 7.105469 12 6 12 C 4.894531 12 4 11.105469 4 10 C 4 8.894531 4.894531 8 6 8 Z M 12 8 C 13.105469 8 14 8.894531 14 10 C 14 11.105469 13.105469 12 12 12 C 10.894531 12 10 11.105469 10 10 C 10 8.894531 10.894531 8 12 8 Z M 17 12 C 14.238281 12 12 14.238281 12 17 C 12 19.761719 14.238281 22 17 22 C 19.761719 22 22 19.761719 22 17 C 22 14.238281 19.761719 12 17 12 Z M 19.3125 14.71875 L 20.375 15.78125 L 16.71875 19.46875 L 14.15625 16.90625 L 15.21875 15.84375 L 16.71875 17.34375 Z">
            <form action={updatePassword}>
                {et === 'nd' && <FormError text={lang.getProp('no-data')} />}
                {et === 'rl' && <FormError text={lang.getCustomProp('modules.errors.rate-limit')} />}
                {et === 'u' && <FormError text={lang.getCustomProp('modules.errors.other')} />}
                <Databox
                    type="password"
                    title={lang.getProp('hds-password-label-1')}
                    placeholder={lang.getProp('hds-password-placeholder-1')}
                    id="oldPassword"
                    minLength={1}
                    maxLength={128}
                    required={true}
                />
                {et === 'ip' && <FormError text={lang.getProp('invalid-password')} />}
                <Databox
                    type="password"
                    title={lang.getProp('hds-password-label-2')}
                    placeholder={lang.getProp('hds-password-placeholder-2')}
                    id="newPassword"
                    minLength={8}
                    maxLength={128}
                    required={true}
                />
                {et === 'wp' && <FormError text={lang.getCustomProp('main.register.weak-password')} />}
                {user.mfaEnabled && (
                    <>
                        <Databox type="text" title={lang.getProp('hds-recovery-label')} placeholder="123456" id="mfa" required={true} />
                        {et === 'im' && <FormError text={lang.getCustomProp('main.login.invalid-mfa')} />}
                    </>
                )}
                <div className={o.buttons}>
                    <button type="submit" className={'btn ' + o.primary}>
                        Save changes
                    </button>
                    <Link href="?et=cancel" className="btn">
                        Cancel
                    </Link>
                </div>
            </form>
        </Popup>
    );
}
