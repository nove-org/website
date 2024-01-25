export const dynamic = 'force-dynamic';
import a from '@sass/account/part.module.sass';
import o from '@sass/account/security/page.module.sass';
import { headers } from 'next/headers';
import Card from './Device';
import Opt from './Opt';
import Password from './Password';
import Email from './Email';
import Delete from './Delete';
import LanguageHandler from '@util/handlers/LanguageHandler';
import Mfa from './Mfa';
import Recovery from './Recovery';
import { getUser, getUserDevices } from '@util/helpers/User';

export default async function Overview() {
    const user = await getUser();
    const devices = await getUserDevices({ perPage: 3 });
    const lang = await new LanguageHandler('dashboard/security', user).init(headers());

    return user?.username && devices ? (
        <div className={a.content}>
            <h1 className={a.title}>{lang.getCustomProp('dashboard.layout.ul-security')}</h1>
            <div className={o.devices}>
                <h2>{lang.getProp('devices-h1')}</h2>
                <p>{lang.getProp('devices-p')}</p>
                <ul className={o.devices}>
                    {devices.length >= 1 ? (
                        devices.map((item) => {
                            const date = new Date(item.updatedAt);

                            return (
                                <Card
                                    key={item.id}
                                    addr={item.ip}
                                    object={item.device}
                                    name={item.os_name + ' ' + item.os_version}
                                    date={date.toLocaleString(user.language, { day: 'numeric', month: 'short' })}
                                />
                            );
                        })
                    ) : (
                        <li>
                            <header>
                                <div className={o.align}>
                                    {lang.getProp('devices-no-data-h1')}
                                    <span>{lang.getProp('devices-no-data-p')}</span>
                                </div>
                            </header>
                        </li>
                    )}
                </ul>
                <p>
                    {lang.getProp('devices-privacy-notice')}{' '}
                    <Opt optOut={lang.getCustomProp('modules.actions.disable')} enable={lang.getCustomProp('modules.actions.enable')} data={devices} />
                </p>
            </div>
            <div className={o.hds}>
                <aside>
                    <h2>{lang.getProp('hds-h1')}</h2>
                    <p>{lang.getProp('hds-p')}</p>
                </aside>
                <ul className={o.buttons}>
                    <Password
                        lang={{
                            btn: lang.getProp('hds-password-btn'),
                            h1: lang.getProp('hds-password-h1'),
                            p: lang.getProp('hds-password-p'),
                            label1: lang.getProp('hds-password-label-1'),
                            label2: lang.getProp('hds-password-label-2'),
                            pc1: lang.getProp('hds-password-placeholder-1'),
                            pc2: lang.getProp('hds-password-placeholder-2'),
                            cancel: lang.getCustomProp('modules.actions.cancel'),
                            save: lang.getCustomProp('modules.actions.save-changes'),
                        }}
                    />
                    <Email
                        lang={{
                            btn: lang.getProp('hds-email-btn'),
                            h1: lang.getProp('hds-email-h1'),
                            p: lang.getProp('hds-email-p'),
                            label1: lang.getProp('hds-email-label-1'),
                            pc1: lang.getProp('hds-email-placeholder-1'),
                            cancel: lang.getCustomProp('modules.actions.cancel'),
                            save: lang.getCustomProp('modules.actions.save-changes'),
                        }}
                    />
                    <Mfa
                        u={user}
                        lang={{
                            btn: lang.getProp('hds-mfa-btn'),
                            h1: lang.getProp('hds-mfa-h1'),
                            p: lang.getProp('hds-mfa-p'),
                            labelCode: lang.getProp('hds-mfa-label-code'),
                            cancel: lang.getCustomProp('modules.actions.cancel'),
                            change: user.mfaEnabled ? lang.getCustomProp('modules.actions.disable') : lang.getCustomProp('modules.actions.enable'),
                            gotIt: lang.getCustomProp('modules.actions.ok'),
                            recoveryCodes: lang.getProp('hds-mfa-recovery-codes'),
                        }}
                    />
                    <Recovery
                        u={user}
                        lang={{
                            btn: lang.getProp('hds-recovery'),
                            h1: lang.getProp('hds-recovery-h1'),
                            p: lang.getProp('hds-recovery-p'),
                            cancel: lang.getCustomProp('modules.actions.cancel'),
                            gotIt: lang.getCustomProp('modules.actions.ok'),
                            labelCode: lang.getProp('hds-recovery-label'),
                            submit: lang.getCustomProp('modules.actions.next'),
                        }}
                    />
                </ul>
            </div>
            <div className={o.deactivate}>
                <h2>{lang.getProp('delete-h1')}</h2>
                <p>{lang.getProp('delete-p')}</p>
                <Delete
                    lang={{
                        btn: lang.getProp('delete-btn'),
                        h1: lang.getProp('delete-h1'),
                        p: lang.getProp('delete-p2'),
                        label: lang.getProp('delete-label'),
                        pc: lang.getProp('delete-placeholder'),
                        cancel: lang.getCustomProp('modules.actions.cancel'),
                    }}
                />
            </div>
        </div>
    ) : (
        <div className={a.content}>
            <h1 className={a.title}>{lang.getCustomProp('modules.errors.header')}</h1>
            <p className={a.desc}>{lang.getCustomProp('modules.errors.session')}</p>
        </div>
    );
}
