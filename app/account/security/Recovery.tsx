import NAPI from '@util/NAPI';
import o from './Security.module.sass';
import Popup from '../Popup';
import { cookies, headers } from 'next/headers';
import LanguageHandler from '@util/languages';
import Databox from '@app/Databox';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import FormError from '../FormError';

export default async function Recovery({ et, code }: { et?: string; code?: string }) {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: false });
    if (!user || !user.mfaEnabled) redirect('?et=cancel');
    const lang = await new LanguageHandler('dashboard/security', user).init(headers());

    const recovery = await api.user().getRecovery({ mfa: code as string, caching: true });

    const getRecovery = async (e: FormData) => {
        'use server';

        const code = e.get('mfa')?.toString();
        if (!code) redirect('?p=recovery&et=nd');

        const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
        const updated = await api.user().getRecovery({ mfa: code });

        if (updated?.code) {
            switch (updated.code) {
                case 'rate_limit':
                    redirect('?p=recovery&et=rl');
                case 'mfa_required':
                case 'invalid_mfa':
                case 'invalid_mfa_token':
                    redirect('?p=recovery&et=im');
                default:
                    redirect('?p=recovery&et=u');
            }
        } else redirect(`?p=recovery&s=${new Date().getTime()}&c=${code}`);
    };

    return !recovery || recovery?.code ? (
        <Popup
            title={lang.getProp('hds-recovery-h1')}
            description={lang.getProp('hds-recovery-p')}
            d="M 2 7 L 2 16 L 11 16 L 7.3789062 12.378906 C 8.7653195 11.211569 10.5449 10.5 12.5 10.5 C 16.034 10.5 19.024984 12.794656 20.083984 15.972656 L 22.451172 15.183594 C 21.062172 11.012594 17.138 8 12.5 8 C 9.8543339 8 7.4570807 8.9979817 5.6152344 10.615234 L 2 7 z">
            <form action={getRecovery}>
                {et === 'nd' && <FormError text={lang.getCustomProp('modules.errors.no-data')} />}
                {et === 'rl' && <FormError text={lang.getCustomProp('modules.errors.rate-limit')} />}
                {et === 'u' && <FormError text={lang.getCustomProp('modules.errors.other')} />}
                <Databox type="text" title={lang.getProp('hds-recovery-label')} placeholder="123456" id="mfa" required={true} />
                {et === 'im' && <FormError text={lang.getCustomProp('main.login.invalid-mfa')} />}
                <div className={o.buttons}>
                    <button type="submit" className={'btn ' + o.primary}>
                        {lang.getCustomProp('modules.actions.next')}
                    </button>
                    <Link href="?et=cancel" className="btn">
                        {lang.getCustomProp('modules.actions.cancel')}
                    </Link>
                </div>
            </form>
        </Popup>
    ) : (
        <Popup
            title={lang.getProp('hds-recovery-h1')}
            description={lang.getProp('hds-recovery-p')}
            d="M 2 7 L 2 16 L 11 16 L 7.3789062 12.378906 C 8.7653195 11.211569 10.5449 10.5 12.5 10.5 C 16.034 10.5 19.024984 12.794656 20.083984 15.972656 L 22.451172 15.183594 C 21.062172 11.012594 17.138 8 12.5 8 C 9.8543339 8 7.4570807 8.9979817 5.6152344 10.615234 L 2 7 z">
            <ul className={o.codes}>
                {recovery.map((code) => (
                    <li key={code}>{code}</li>
                ))}
                {Array.from(Array(10 - recovery.length).keys()).map((a) => (
                    <li key={'used' + a}>{lang.getProp('code-used')} ---</li>
                ))}
            </ul>
            <div className={o.buttons}>
                <Link href="?et=cancel" className="btn">
                    {lang.getCustomProp('modules.actions.close')}
                </Link>
            </div>
        </Popup>
    );
}
