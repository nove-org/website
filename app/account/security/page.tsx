import { axiosClient } from '@util/axios';
import o from '@sass/account/security/page.module.sass';
import { cookies, headers } from 'next/headers';
import Card from './Device';
import { Device, Response, User } from '@util/schema';
import Opt from './Opt';
import Password from './Password';
import Email from './Email';
import Delete from './Delete';
import LanguageHandler from '@util/handlers/LanguageHandler';

export default async function Overview() {
    const user: Response<User> = (
        await axiosClient
            .get('/v1/users/me', {
                headers: { Authorization: `Owner ${cookies()?.get('napiAuthorizationToken')?.value}` },
            })
            .catch((e) => e.response)
    )?.data;

    const device: Response<Device[]> = (
        await axiosClient
            .get('/v1/users/me/activity?perPage=3', {
                headers: { Authorization: `Owner ${cookies()?.get('napiAuthorizationToken')?.value}` },
            })
            .catch((e) => e.response)
    )?.data;

    const lang = await new LanguageHandler('dashboard/security', user?.body?.data).init(headers());

    return user?.body?.data?.username && device?.body ? (
        <div className={o.content}>
            <h1 className={o.title}>{lang.getProp('title')}</h1>
            <div className={o.devices}>
                <h2>{lang.getProp('devices-h1')}</h2>
                <p>{lang.getProp('devices-p')}</p>
                <ul className={o.devices}>
                    {device.body?.data?.length >= 1 ? (
                        device.body.data.map((item) => {
                            const date = new Date(item.updatedAt);

                            return (
                                <Card
                                    key={item.id}
                                    addr={item.ip}
                                    object={item.device}
                                    name={item.os_name + ' ' + item.os_version}
                                    date={date.toLocaleString(user.body.data.language, { day: 'numeric', month: 'short' })}
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
                    {lang.getProp('devices-privacy-notice')} <Opt optOut={lang.getProp('devices-opt-btn-1')} enable={lang.getProp('devices-opt-btn-2')} data={device.body.data} />
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
                            cancel: lang.getProp('hds-btn-cancel'),
                            save: lang.getProp('hds-btn-save'),
                        }}
                    />
                    <Email
                        lang={{
                            btn: lang.getProp('hds-email-btn'),
                            h1: lang.getProp('hds-email-h1'),
                            p: lang.getProp('hds-email-p'),
                            label1: lang.getProp('hds-email-label-1'),
                            pc1: lang.getProp('hds-email-placeholder-1'),
                            cancel: lang.getProp('hds-btn-cancel'),
                            save: lang.getProp('hds-btn-save'),
                        }}
                    />
                    <li className="disabled">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M 4 3 C 2.895 3 2 3.895 2 5 L 2 7.1484375 C 2 7.5644375 2.2378125 7.9705625 2.6328125 8.1015625 C 3.4278125 8.3655625 4 9.116 4 10 C 4 10.884 3.4278125 11.634438 2.6328125 11.898438 C 2.2378125 12.029438 2 12.435562 2 12.851562 L 2 15 C 2 16.105 2.895 17 4 17 L 20 17 C 21.105 17 22 16.105 22 15 L 22 12.851562 C 22 12.435562 21.762187 12.029437 21.367188 11.898438 C 20.572188 11.634438 20 10.884 20 10 C 20 9.116 20.572187 8.3655625 21.367188 8.1015625 C 21.762188 7.9705625 22 7.5644375 22 7.1484375 L 22 5 C 22 3.895 21.105 3 20 3 L 4 3 z M 4.9003906 19 L 17.339844 21.929688 C 17.549844 21.979688 17.750937 22 17.960938 22 C 19.170938 22 20.270312 21.190234 20.570312 19.990234 L 20.820312 19 L 4.9003906 19 z"></path>
                        </svg>

                        <h1>
                            {lang.getProp('hds-two-factor-authentication')}
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 30 30">
                                <path
                                    fill="currentColor"
                                    d="M 9.9902344 3.9902344 A 1.0001 1.0001 0 0 0 9.2929688 5.7070312 L 18.585938 15 L 9.2929688 24.292969 A 1.0001 1.0001 0 1 0 10.707031 25.707031 L 20.707031 15.707031 A 1.0001 1.0001 0 0 0 20.707031 14.292969 L 10.707031 4.2929688 A 1.0001 1.0001 0 0 0 9.9902344 3.9902344 z"></path>
                            </svg>
                        </h1>
                    </li>
                    <li className="disabled">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M 22 2 L 19.058594 4.9414062 C 16.865786 2.7436807 13.666769 1.5536385 10.212891 2.15625 C 6.1828906 2.86025 2.9227344 6.0746563 2.1777344 10.097656 C 1.0007344 16.443656 5.864 22 12 22 C 17.134 22 21.3785 18.109094 21.9375 13.121094 C 22.0045 12.525094 21.5375 12 20.9375 12 C 20.4375 12 20.007125 12.368234 19.953125 12.865234 C 19.520125 16.870234 16.119 20 12 20 C 7.059 20 3.1501562 15.498859 4.1601562 10.380859 C 4.7681562 7.3008594 7.2335937 4.8107812 10.308594 4.1757812 C 13.170804 3.5850239 15.832013 4.545023 17.642578 6.3574219 L 15 9 L 22 9 L 22 2 z"></path>
                        </svg>

                        <h1>
                            {lang.getProp('hds-recovery')}
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 30 30">
                                <path
                                    fill="currentColor"
                                    d="M 9.9902344 3.9902344 A 1.0001 1.0001 0 0 0 9.2929688 5.7070312 L 18.585938 15 L 9.2929688 24.292969 A 1.0001 1.0001 0 1 0 10.707031 25.707031 L 20.707031 15.707031 A 1.0001 1.0001 0 0 0 20.707031 14.292969 L 10.707031 4.2929688 A 1.0001 1.0001 0 0 0 9.9902344 3.9902344 z"></path>
                            </svg>
                        </h1>
                    </li>
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
                        cancel: lang.getProp('hds-btn-cancel'),
                    }}
                />
            </div>
        </div>
    ) : (
        <div className={o.content}>
            <h1 className={o.title}>{lang.getProp('error-h1')}</h1>
            <p>{lang.getProp('error-p')}</p>
        </div>
    );
}
