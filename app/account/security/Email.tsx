import NAPI from '@util/helpers/NAPI';
import o from './Security.module.sass';
import Popup from '../Popup';
import { cookies, headers } from 'next/headers';
import LanguageHandler from '@util/handlers/LanguageHandler';
import Databox from '@app/Databox';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import FormError from '../FormError';

export default async function Email({ et }: { et?: string }) {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const lang = await new LanguageHandler('dashboard/security', user).init(headers());

    if (!user) redirect('/account/security');

    const updateEmail = async (e: FormData) => {
        'use server';

        const newEmail = e.get('newEmail')?.toString();
        const code = e.get('mfa')?.toString();

        if (!newEmail || (!code && user.mfaEnabled)) redirect('?p=password&et=nd');

        const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
        const updated = await api.user().updateEmail({
            body: {
                newEmail,
                code,
            },
        });

        if (updated?.code) {
            switch (updated.code) {
                case 'invalid_email':
                    redirect('?p=password&et=ie');
                case 'could_not_send_mail':
                    redirect('?p=password&et=cm');
                case 'rate_limit':
                    redirect('?p=password&et=rl');
                case 'mfa_required':
                case 'invalid_mfa':
                    redirect('?p=password&et=im');
                default:
                    redirect('?p=password&et=u');
            }
        } else redirect(`?et=s`);
    };

    const updateEmailSettings = async (e: FormData) => {
        'use server';

        const pubkey = e.get('pubkey')?.toString()?.replace(/\r/g, '');
        const activityNotify = e.get('activityNotify')?.toString();

        const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
        const updated = await api.user().update({
            body: {
                pubkey,
                activityNotify: Boolean(activityNotify),
            },
        });

        if (updated?.code) {
            switch (updated.code) {
                case 'invalid_pgp_key':
                    redirect(`?p=email&et=ig`);
                case 'rate_limit':
                    redirect(`?p=email&et=rl`);
                default:
                    redirect(`?p=email&et=u`);
            }
        } else redirect(`?s=${new Date().getTime()}`);
    };

    return (
        <Popup
            title={lang.getProp('hds-email-h1')}
            description={lang.getProp('hds-email-p')}
            type="large"
            d="M 7 2 A 1.0001 1.0001 0 0 0 6 3 L 6 5.4921875 L 2.9921875 7.2460938 C 2.3801875 7.6030938 2 8.2656094 2 8.9746094 L 2 19 C 2 20.103 2.897 21 4 21 L 20 21 C 21.103 21 22 20.103 22 19 L 22 8.9746094 C 22 8.2656094 21.619812 7.6030937 21.007812 7.2460938 L 18 5.4921875 L 18 3 A 1.0001 1.0001 0 0 0 17 2 L 7 2 z M 8 4 L 16 4 L 16 11.333984 L 12 13.822266 L 8 11.332031 L 8 4 z M 6 7.8066406 L 6 10.087891 L 4.1074219 8.9101562 L 6 7.8066406 z M 18 7.8085938 L 19.892578 8.9121094 L 18 10.089844 L 18 7.8085938 z">
            {et === 'nd' && <FormError text={lang.getCustomProp('modules.errors.no-data')} />}
            {et === 'rl' && <FormError text={lang.getCustomProp('modules.errors.rate-limit')} />}
            {et === 'u' && <FormError text={lang.getCustomProp('modules.errors.other')} />}
            <div className={o.email}>
                <div className={o.update}>
                    <h2>{lang.getProp('hds-email-change-h2')}</h2>
                    <p className={o.d}>{lang.getProp('hds-email-change-p')}</p>
                    {et === 'cm' && <FormError text={lang.getProp('could-not-send-email')} />}
                    {et === 's' && <FormError text={lang.getProp('email-sent')} />}
                    <form action={updateEmail}>
                        <Databox
                            type="text"
                            title={lang.getProp('hds-email-label-1')}
                            placeholder={lang.getProp('hds-email-placeholder-1')}
                            id="newEmail"
                            minLength={1}
                            maxLength={128}
                            required={true}
                        />
                        {et === 'ie' && <FormError text={lang.getProp('invalid-email')} />}
                        {user.mfaEnabled && (
                            <>
                                <Databox type="text" title={lang.getProp('hds-recovery-label')} placeholder="123456" id="mfa" required={true} />
                                {et === 'im' && <FormError text={lang.getCustomProp('main.login.invalid-mfa')} />}
                            </>
                        )}
                        <div className={o.buttons}>
                            <button type="submit" className={'btn ' + o.primary}>
                                {lang.getCustomProp('modules.actions.update')}
                            </button>
                            <Link href="?et=cancel" className="btn">
                                {lang.getCustomProp('modules.actions.cancel')}
                            </Link>
                        </div>
                    </form>
                </div>
                <form className={o.addons} action={updateEmailSettings}>
                    <Databox
                        type="textarea"
                        id="pubkey"
                        title={lang.getProp('hds-email-pgp-h2')}
                        description={lang.getProp('hds-email-pgp-p')}
                        placeholder={lang.getProp('hds-email-pgp-h')}
                        value={user.pubkey}
                    />
                    {et === 'ig' && <FormError text={lang.getProp('invalid-pgp')} />}
                    <Databox
                        type="switch"
                        id="activityNotify"
                        title={lang.getProp('hds-email-security-h2')}
                        description={lang.getProp('hds-email-security-p')}
                        checked={user.activityNotify}
                    />
                    <div className={o.buttons}>
                        <button type="submit" className={'btn'}>
                            {lang.getCustomProp('modules.actions.save-changes')}
                        </button>
                    </div>
                </form>
            </div>
        </Popup>
    );
}
