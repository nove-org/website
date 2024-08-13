import NAPI from '@util/NAPI';
import o from './Security.module.sass';
import Popup from '../Popup';
import { cookies, headers } from 'next/headers';
import LanguageHandler from '@util/languages';
import Databox from '@app/Databox';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import FormError from '../FormError';

export default async function Delete({ et }: { et?: string }) {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: false });
    if (!user) redirect('?et=cancel');
    const lang = await new LanguageHandler('dashboard/security', user).init(headers());

    const deleteAccount = async (e: FormData) => {
        'use server';

        const code = e.get('mfa')?.toString();
        const password = e.get('password')?.toString();
        if (!password || (!code && user.mfaEnabled)) redirect('?p=delete&et=nd');

        const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
        const deleted = await api.user().delete({ body: { password, code } });

        if (deleted?.code) {
            switch (deleted.code) {
                case 'rate_limit':
                    redirect('?p=delete&et=rl');
                case 'invalid_password':
                    redirect('?p=delete&et=ip');
                case 'mfa_required':
                case 'invalid_mfa':
                case 'invalid_mfa_token':
                    redirect('?p=delete&et=im');
                default:
                    redirect('?p=delete&et=u');
            }
        } else redirect(`/`);
    };

    return (
        <Popup
            title={lang.getProp('delete-h1')}
            description={lang.getProp('delete-p2')}
            d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z">
            <form action={deleteAccount}>
                {et === 'nd' && <FormError text={lang.getCustomProp('modules.errors.no-data')} />}
                {et === 'rl' && <FormError text={lang.getCustomProp('modules.errors.rate-limit')} />}
                {et === 'u' && <FormError text={lang.getCustomProp('modules.errors.other')} />}
                <Databox
                    type="password"
                    title={lang.getCustomProp('main.login.input-password')}
                    placeholder={lang.getCustomProp('main.login.input-password-placeholder')}
                    id="password"
                    minLength={1}
                    maxLength={128}
                    required={true}
                />
                {et === 'ip' && <FormError text={lang.getProp('invalid-password')} />}
                {user.mfaEnabled && (
                    <>
                        <Databox type="text" title={lang.getProp('hds-recovery-label')} placeholder="123456" id="mfa" required={true} />
                        {et === 'im' && <FormError text={lang.getCustomProp('main.login.invalid-mfa')} />}
                    </>
                )}
                <div className={o.buttons}>
                    <button type="submit" className={'btn ' + o.primary}>
                        {lang.getProp('delete-btn')}
                    </button>
                    <Link href="?et=cancel" className="btn">
                        {lang.getCustomProp('modules.actions.cancel')}
                    </Link>
                </div>
            </form>
        </Popup>
    );
}
