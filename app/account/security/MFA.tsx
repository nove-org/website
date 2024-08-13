import NAPI from '@util/NAPI';
import o from './Security.module.sass';
import Popup from '../Popup';
import { cookies, headers } from 'next/headers';
import LanguageHandler from '@util/languages';
import Databox from '@app/Databox';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import FormError from '../FormError';
import Encryption from '@util/encryption';
import { COOKIE_HOSTNAME } from '@util/CONSTS';
import { QRCodeSVG } from 'qrcode.react';

export default async function MFA({ et, s }: { et?: string; s?: string }) {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: false });
    if (!user) redirect('?et=cancel');
    const lang = await new LanguageHandler('dashboard/security', user).init(headers());

    const mid = cookies().get('tempMID')?.value;
    const rid = cookies().get('tempRID')?.value;

    let mfaData: { uri?: string; recovery?: string[] } = {};
    if (mid && rid && Encryption.read(mid, user.email + user.id) && Encryption.read(rid, user.email + user.id)) {
        mfaData = {
            uri: Encryption.read(mid, user.email + user.id),
            recovery: Encryption.read(rid, user.email + user.id).split(','),
        };
    }

    const setMFA = async (e: FormData) => {
        'use server';

        const code = e.get('mfa')?.toString();

        const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
        const mfa = await api.user().setMFA({
            body: {
                code,
            },
        });

        if (!mfa.secret || !mfa.codes) {
            if (mfa?.code) {
                switch (mfa.code) {
                    case 'rate_limit':
                        redirect('?p=mfa&et=rl');
                    case 'mfa_required':
                    case 'invalid_mfa':
                    case 'invalid_mfa_token':
                        redirect('?p=mfa&et=im');
                    default:
                        redirect('?p=mfa&et=u');
                }
            } else redirect(`?s=${new Date().getTime()}`);
        } else {
            if (mfa?.code) {
                switch (mfa.code) {
                    case 'rate_limit':
                        redirect('?p=mfa&et=rl');
                    default:
                        redirect('?p=mfa&et=u');
                }
            } else {
                cookies().set('tempMID', Encryption.create(mfa.secret.uri, user.email + user.id), {
                    maxAge: 600,
                    domain: COOKIE_HOSTNAME,
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                });
                cookies().set('tempRID', Encryption.create(mfa.codes.join(','), user.email + user.id), {
                    maxAge: 600,
                    domain: COOKIE_HOSTNAME,
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                });
                redirect(`?p=mfa&s=${new Date().getTime()}`);
            }
        }
    };

    const enableMFA = async (e: FormData) => {
        'use server';

        const code = e.get('mfa')?.toString();
        if (!code) redirect(`?p=mfa&s=${new Date().getTime()}&et=im`);

        const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
        const mfa = await api.user().activateMFA({
            body: {
                code,
            },
        });

        if (mfa?.code) {
            switch (mfa.code) {
                case 'rate_limit':
                    redirect(`?p=mfa&s=${new Date().getTime()}&et=rl`);
                case 'mfa_required':
                case 'invalid_mfa':
                case 'invalid_mfa_token':
                    redirect(`?p=mfa&s=${new Date().getTime()}&et=im`);
                default:
                    redirect(`?p=mfa&s=${new Date().getTime()}&et=u`);
            }
        } else {
            cookies().set('tempMID', '', {
                maxAge: 1,
            });
            cookies().set('tempRID', '', {
                maxAge: 1,
            });
            redirect(`?s=${new Date().getTime()}`);
        }
    };

    return !s ? (
        <Popup
            title={lang.getProp('hds-mfa-h1')}
            description={lang.getProp('hds-mfa-p')}
            d="M 4 3 C 2.895 3 2 3.895 2 5 L 2 7.1484375 C 2 7.5644375 2.2378125 7.9705625 2.6328125 8.1015625 C 3.4278125 8.3655625 4 9.116 4 10 C 4 10.884 3.4278125 11.634438 2.6328125 11.898438 C 2.2378125 12.029438 2 12.435562 2 12.851562 L 2 15 C 2 16.105 2.895 17 4 17 L 20 17 C 21.105 17 22 16.105 22 15 L 22 12.851562 C 22 12.435562 21.762187 12.029437 21.367188 11.898438 C 20.572188 11.634438 20 10.884 20 10 C 20 9.116 20.572187 8.3655625 21.367188 8.1015625 C 21.762188 7.9705625 22 7.5644375 22 7.1484375 L 22 5 C 22 3.895 21.105 3 20 3 L 4 3 z M 4.9003906 19 L 17.339844 21.929688 C 17.549844 21.979688 17.750937 22 17.960938 22 C 19.170938 22 20.270312 21.190234 20.570312 19.990234 L 20.820312 19 L 4.9003906 19 z">
            <form action={setMFA}>
                {et === 'rl' && <FormError text={lang.getCustomProp('modules.errors.rate-limit')} />}
                {et === 'u' && <FormError text={lang.getCustomProp('modules.errors.other')} />}
                {user.mfaEnabled && (
                    <>
                        <Databox type="text" title={lang.getProp('hds-recovery-label')} placeholder="123456" id="mfa" required={true} />
                        {et === 'im' && <FormError text={lang.getCustomProp('main.login.invalid-mfa')} />}
                    </>
                )}
                <div className={o.buttons}>
                    <button type="submit" className={'btn ' + o.primary}>
                        {user.mfaEnabled ? lang.getCustomProp('modules.actions.disable') : lang.getCustomProp('modules.actions.enable')}
                    </button>
                    <Link href="?et=cancel" className="btn">
                        {lang.getCustomProp('modules.actions.cancel')}
                    </Link>
                </div>
            </form>
        </Popup>
    ) : (
        <Popup
            title={lang.getProp('hds-mfa-h1')}
            description={lang.getProp('hds-mfa-p')}
            d="M 4 3 C 2.895 3 2 3.895 2 5 L 2 7.1484375 C 2 7.5644375 2.2378125 7.9705625 2.6328125 8.1015625 C 3.4278125 8.3655625 4 9.116 4 10 C 4 10.884 3.4278125 11.634438 2.6328125 11.898438 C 2.2378125 12.029438 2 12.435562 2 12.851562 L 2 15 C 2 16.105 2.895 17 4 17 L 20 17 C 21.105 17 22 16.105 22 15 L 22 12.851562 C 22 12.435562 21.762187 12.029437 21.367188 11.898438 C 20.572188 11.634438 20 10.884 20 10 C 20 9.116 20.572187 8.3655625 21.367188 8.1015625 C 21.762188 7.9705625 22 7.5644375 22 7.1484375 L 22 5 C 22 3.895 21.105 3 20 3 L 4 3 z M 4.9003906 19 L 17.339844 21.929688 C 17.549844 21.979688 17.750937 22 17.960938 22 C 19.170938 22 20.270312 21.190234 20.570312 19.990234 L 20.820312 19 L 4.9003906 19 z">
            {!mfaData.recovery || !mfaData.uri ? (
                <FormError text={lang.getCustomProp('modules.errors.decryption')} />
            ) : (
                <div className={o.mfa}>
                    <div className={o.qr}>
                        <h2>{lang.getProp('hds-mfa-scan-h1')}</h2>
                        <p className={o.d}>{lang.getProp('hds-mfa-scan-p')}</p>
                        <QRCodeSVG value={mfaData.uri} size={166} bgColor={'#ffffff'} fgColor={'#000000'} includeMargin={true} />
                    </div>
                    <div className={o.recovery}>
                        <h2>{lang.getProp('hds-recovery-h1')}</h2>
                        <p className={o.d}>{lang.getProp('hds-recovery-p')}</p>
                        <ul className={o.codes}>
                            {mfaData.recovery.map((code) => (
                                <li key={code}>{code}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            <form action={enableMFA}>
                {mfaData.recovery && mfaData.uri && (
                    <>
                        <Databox type="text" title={lang.getProp('hds-recovery-label')} placeholder="123456" id="mfa" required={true} />
                        {et === 'im' && <FormError text={lang.getCustomProp('main.login.invalid-mfa')} />}
                        {et === 'rl' && <FormError text={lang.getCustomProp('modules.errors.rate-limit')} />}
                        {et === 'u' && <FormError text={lang.getCustomProp('modules.errors.other')} />}
                    </>
                )}
                <div className={o.buttons}>
                    {mfaData.recovery && mfaData.uri && (
                        <button type="submit" className={'btn ' + o.primary}>
                            {lang.getCustomProp('modules.actions.enable')}
                        </button>
                    )}
                    <Link href="?et=cancel" className="btn">
                        {lang.getCustomProp('modules.actions.cancel')}
                    </Link>
                </div>
            </form>
        </Popup>
    );
}
