import LanguageHandler from '@util/handlers/LanguageHandler';
import NAPI from '@util/helpers/NAPI';
import Error from '../Error';
import Device from './Device';
import o from './Security.module.sass';
import { cookies, headers } from 'next/headers';
import Link from 'next/link';
import LayerCard from './LayerCard';
import Header from './Header';
import { redirect } from 'next/navigation';
import FormError from '../FormError';
import ObjectHelper from '@util/helpers/Object';
import Password from './Password';
import Email from './Email';
import Recovery from './Recovery';
import MFA from './MFA';
import Delete from './Delete';

export async function generateMetadata() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const lang = await new LanguageHandler('dashboard/security', user).init(headers());
    const title: string = `${(lang.getCustomProp('dashboard.layout.ul-security') as string).replace(/<.*?>/g, '')} | Nove`;

    return {
        title,
        openGraph: { title },
        twitter: { card: 'summary_large_image', title },
    };
}

export default async function Account({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const devices = await api.user().getDevices({ caching: true });
    const lang = await new LanguageHandler('dashboard/security', user).init(headers());
    const success: string | undefined = ObjectHelper.getValueByStringPath(searchParams, 's');
    const code: string | undefined = ObjectHelper.getValueByStringPath(searchParams, 'c');
    const error: string | undefined = ObjectHelper.getValueByStringPath(searchParams, 'et');
    const popup: string | undefined = ObjectHelper.getValueByStringPath(searchParams, 'p');

    const toggleDeviceTracking = async () => {
        'use server';

        const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);

        let updated;
        if (user?.trackActivity) updated = await api.user().update({ body: { trackActivity: false } });
        else updated = await api.user().update({ body: { trackActivity: true } });

        if (updated?.code) {
            switch (updated.code) {
                case 'rate_limit':
                    redirect(`?et=rl`);
                default:
                    redirect(`?et=u`);
            }
        } else redirect(`?s=${new Date().getTime()}`);
    };

    return user ? (
        <div className={o.content}>
            <h1 className={o.title}>{(lang.getCustomProp('dashboard.layout.ul-security') as string).replace(/<.*?>/g, '')}</h1>
            <div className={o.devices}>
                <Header
                    title={lang.getProp('devices-h1')}
                    d="M 5 3 C 3.897 3 3 3.897 3 5 L 3 8 C 3 9.103 3.897 10 5 10 L 9 10 C 10.103 10 11 9.103 11 8 L 11 5 C 11 3.897 10.103 3 9 3 L 5 3 z M 15 10 C 13.897 10 13 10.897 13 12 L 13 19 C 13 20.103 13.897 21 15 21 L 19 21 C 20.103 21 21 20.103 21 19 L 21 12 C 21 10.897 20.103 10 19 10 L 15 10 z M 5 12 L 5 14 L 7 14 L 7 12 L 5 12 z M 5 16 L 5 18 L 7 18 L 7 16 L 5 16 z M 9 16 L 9 18 L 11 18 L 11 16 L 9 16 z M 17 17 C 17.552 17 18 17.448 18 18 C 18 18.552 17.552 19 17 19 C 16.448 19 16 18.552 16 18 C 16 17.448 16.448 17 17 17 z">
                    {lang.getProp('devices-p')}
                    <form action={toggleDeviceTracking}>
                        <button type="submit">{user.trackActivity ? lang.getCustomProp('modules.actions.disable') : lang.getCustomProp('modules.actions.enable')}</button>
                    </form>
                </Header>
                {!popup && error === 'rl' && <FormError text={lang.getCustomProp('modules.errors.rate-limit')} />}
                {!popup && error === 'u' && <FormError text={lang.getCustomProp('modules.errors.other')} />}
                {devices && (devices?.length || 0) > 0 && (
                    <>
                        <ul className={o.devices}>{devices?.slice(0, 3)?.map((device) => <Device key={device.id} device={device} lang={user.language} />)}</ul>
                        {devices.length > 3 && (
                            <div className={o.more}>
                                <details>
                                    <summary>
                                        <span className={o.closed}>{lang.getCustomProp('modules.actions.show-more')}</span>
                                        <span className={o.open}>{lang.getCustomProp('modules.actions.show-less')}</span>
                                    </summary>
                                </details>
                                <ul className={o.devices}>{devices?.slice(3)?.map((device) => <Device key={device.id} device={device} lang={user.language} />)}</ul>
                            </div>
                        )}
                    </>
                )}
            </div>
            <div className={o.securityLayers}>
                <Header
                    title={lang.getProp('hds-h1')}
                    d="M 18.414062 2 C 18.158188 2 17.902031 2.0974687 17.707031 2.2929688 L 16 4 L 20 8 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.925594 2.0974687 18.669937 2 18.414062 2 z M 14.5 5.5 L 5 15 C 5 15 6.005 15.005 6.5 15.5 C 6.995 15.995 6.984375 16.984375 6.984375 16.984375 C 6.984375 16.984375 8.004 17.004 8.5 17.5 C 8.996 17.996 9 19 9 19 L 18.5 9.5 L 14.5 5.5 z M 3.6699219 17 L 3 21 L 7 20.330078 L 3.6699219 17 z">
                    {lang.getProp('hds-p')}
                </Header>
                <div className={o.links}>
                    <LayerCard
                        link="?p=password"
                        d="M 4 4 C 2.894531 4 2 4.894531 2 6 L 2 14 C 2 15.105469 2.894531 16 4 16 L 11.09375 16 C 11.53125 13.386719 13.660156 11.371094 16.3125 11.0625 C 16.117188 10.753906 16 10.390625 16 10 C 16 8.894531 16.894531 8 18 8 C 19.105469 8 20 8.894531 20 10 C 20 10.589844 19.75 11.101563 19.34375 11.46875 C 20.433594 11.929688 21.351563 12.710938 22 13.6875 L 22 6 C 22 4.894531 21.105469 4 20 4 Z M 6 8 C 7.105469 8 8 8.894531 8 10 C 8 11.105469 7.105469 12 6 12 C 4.894531 12 4 11.105469 4 10 C 4 8.894531 4.894531 8 6 8 Z M 12 8 C 13.105469 8 14 8.894531 14 10 C 14 11.105469 13.105469 12 12 12 C 10.894531 12 10 11.105469 10 10 C 10 8.894531 10.894531 8 12 8 Z M 17 12 C 14.238281 12 12 14.238281 12 17 C 12 19.761719 14.238281 22 17 22 C 19.761719 22 22 19.761719 22 17 C 22 14.238281 19.761719 12 17 12 Z M 19.3125 14.71875 L 20.375 15.78125 L 16.71875 19.46875 L 14.15625 16.90625 L 15.21875 15.84375 L 16.71875 17.34375 Z">
                        {lang.getProp('hds-password-btn')}
                    </LayerCard>
                    <LayerCard
                        link="?p=email"
                        d="M 7 2 A 1.0001 1.0001 0 0 0 6 3 L 6 5.4921875 L 2.9921875 7.2460938 C 2.3801875 7.6030938 2 8.2656094 2 8.9746094 L 2 19 C 2 20.103 2.897 21 4 21 L 20 21 C 21.103 21 22 20.103 22 19 L 22 8.9746094 C 22 8.2656094 21.619812 7.6030937 21.007812 7.2460938 L 18 5.4921875 L 18 3 A 1.0001 1.0001 0 0 0 17 2 L 7 2 z M 8 4 L 16 4 L 16 11.333984 L 12 13.822266 L 8 11.332031 L 8 4 z M 6 7.8066406 L 6 10.087891 L 4.1074219 8.9101562 L 6 7.8066406 z M 18 7.8085938 L 19.892578 8.9121094 L 18 10.089844 L 18 7.8085938 z">
                        {lang.getProp('hds-email-btn')}
                    </LayerCard>
                    <LayerCard
                        link="?p=mfa"
                        d="M 4 3 C 2.895 3 2 3.895 2 5 L 2 7.1484375 C 2 7.5644375 2.2378125 7.9705625 2.6328125 8.1015625 C 3.4278125 8.3655625 4 9.116 4 10 C 4 10.884 3.4278125 11.634438 2.6328125 11.898438 C 2.2378125 12.029438 2 12.435562 2 12.851562 L 2 15 C 2 16.105 2.895 17 4 17 L 20 17 C 21.105 17 22 16.105 22 15 L 22 12.851562 C 22 12.435562 21.762187 12.029437 21.367188 11.898438 C 20.572188 11.634438 20 10.884 20 10 C 20 9.116 20.572187 8.3655625 21.367188 8.1015625 C 21.762188 7.9705625 22 7.5644375 22 7.1484375 L 22 5 C 22 3.895 21.105 3 20 3 L 4 3 z M 4.9003906 19 L 17.339844 21.929688 C 17.549844 21.979688 17.750937 22 17.960938 22 C 19.170938 22 20.270312 21.190234 20.570312 19.990234 L 20.820312 19 L 4.9003906 19 z">
                        {lang.getProp('hds-mfa-btn')}
                    </LayerCard>
                    <LayerCard
                        link="?p=recovery"
                        d="M 2 7 L 2 16 L 11 16 L 7.3789062 12.378906 C 8.7653195 11.211569 10.5449 10.5 12.5 10.5 C 16.034 10.5 19.024984 12.794656 20.083984 15.972656 L 22.451172 15.183594 C 21.062172 11.012594 17.138 8 12.5 8 C 9.8543339 8 7.4570807 8.9979817 5.6152344 10.615234 L 2 7 z"
                        disabled={!user.mfaEnabled}>
                        {lang.getProp('hds-recovery-btn')}
                    </LayerCard>
                </div>
            </div>
            <div className={o.deleteAccount}>
                <Header
                    title={lang.getProp('delete-h1')}
                    d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z">
                    {lang.getProp('delete-p')}
                </Header>
                <Link className="btn" href="?p=delete">
                    {lang.getProp('delete-btn')}
                </Link>
            </div>
            {popup === 'password' && <Password et={error} />}
            {popup === 'email' && <Email et={error} />}
            {popup === 'mfa' && <MFA et={error} s={success} />}
            {popup === 'recovery' && <Recovery et={error} code={code} />}
            {popup === 'delete' && <Delete et={error} />}
        </div>
    ) : (
        <Error />
    );
}
