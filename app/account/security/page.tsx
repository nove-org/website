import { axiosClient } from '@util/axios';
import o from '@sass/account/security/page.module.sass';
import { cookies } from 'next/headers';
import Card from './Device';
import { Device, Response, User } from '@util/schema';
import Opt from './Opt';

export default async function Overview() {
    const user: Response<User> = (
        await axiosClient
            .get('/v1/users/me', {
                headers: { Authorization: `Owner ${cookies()?.get('napiAuthorizationToken')?.value}` },
            })
            .catch((e) => e.response)
    ).data;

    const device: Response<Device[]> = (
        await axiosClient
            .get('/v1/users/me/activity?perPage=3', {
                headers: { Authorization: `Owner ${cookies()?.get('napiAuthorizationToken')?.value}` },
            })
            .catch((e) => e.response)
    ).data;

    if (!device || !device?.body)
        return (
            <div className={o.content}>
                <h1 className={o.title}>Something is wrong with the API</h1>
                <p>We cannot sign your session which leads to data retrieval failure</p>
            </div>
        );

    return (
        <div className={o.content}>
            <h1 className={o.title}>Security</h1>
            <div className={o.devices}>
                <h2>Your devices</h2>
                <p>List of most recent devices that logged in to your account this month</p>
                <ul className={o.devices}>
                    {device.body?.data ? (
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
                                    No device data found
                                    <span>You have opted-out from activity or we did not record any yet</span>
                                </div>
                            </header>
                        </li>
                    )}
                </ul>
                <p>
                    We store information about devices that logged in to your account in the last month on our servers. <Opt data={device.body.data} />
                </p>
            </div>
            <div className={o.hds}>
                <aside>
                    <h2>How do you sign in</h2>
                    <p>Add or modify ways of signing in and confirming your identity</p>
                </aside>
                <ul className={o.buttons}>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M 12 1 C 8.6761905 1 6 3.6761905 6 7 L 6 8 C 4.9 8 4 8.9 4 10 L 4 20 C 4 21.1 4.9 22 6 22 L 18 22 C 19.1 22 20 21.1 20 20 L 20 10 C 20 8.9 19.1 8 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 8 8 L 8 7 C 8 4.7238095 9.7238095 3 12 3 z M 8 14 C 8.55 14 9 14.45 9 15 C 9 15.55 8.55 16 8 16 C 7.45 16 7 15.55 7 15 C 7 14.45 7.45 14 8 14 z M 12 14 C 12.55 14 13 14.45 13 15 C 13 15.55 12.55 16 12 16 C 11.45 16 11 15.55 11 15 C 11 14.45 11.45 14 12 14 z M 16 14 C 16.55 14 17 14.45 17 15 C 17 15.55 16.55 16 16 16 C 15.45 16 15 15.55 15 15 C 15 14.45 15.45 14 16 14 z"></path>
                        </svg>

                        <h1>
                            Password
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 30 30">
                                <path
                                    fill="currentColor"
                                    d="M 9.9902344 3.9902344 A 1.0001 1.0001 0 0 0 9.2929688 5.7070312 L 18.585938 15 L 9.2929688 24.292969 A 1.0001 1.0001 0 1 0 10.707031 25.707031 L 20.707031 15.707031 A 1.0001 1.0001 0 0 0 20.707031 14.292969 L 10.707031 4.2929688 A 1.0001 1.0001 0 0 0 9.9902344 3.9902344 z"></path>
                            </svg>
                        </h1>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M 7 2 A 1.0001 1.0001 0 0 0 6 3 L 6 5.4921875 L 2.9921875 7.2460938 C 2.3801875 7.6030938 2 8.2656094 2 8.9746094 L 2 19 C 2 20.103 2.897 21 4 21 L 20 21 C 21.103 21 22 20.103 22 19 L 22 8.9746094 C 22 8.2656094 21.619812 7.6030937 21.007812 7.2460938 L 18 5.4921875 L 18 3 A 1.0001 1.0001 0 0 0 17 2 L 7 2 z M 8 4 L 16 4 L 16 11.333984 L 12 13.822266 L 8 11.332031 L 8 4 z M 6 7.8066406 L 6 10.087891 L 4.1074219 8.9101562 L 6 7.8066406 z M 18 7.8085938 L 19.892578 8.9121094 L 18 10.089844 L 18 7.8085938 z"></path>
                        </svg>

                        <h1>
                            E-mail
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 30 30">
                                <path
                                    fill="currentColor"
                                    d="M 9.9902344 3.9902344 A 1.0001 1.0001 0 0 0 9.2929688 5.7070312 L 18.585938 15 L 9.2929688 24.292969 A 1.0001 1.0001 0 1 0 10.707031 25.707031 L 20.707031 15.707031 A 1.0001 1.0001 0 0 0 20.707031 14.292969 L 10.707031 4.2929688 A 1.0001 1.0001 0 0 0 9.9902344 3.9902344 z"></path>
                            </svg>
                        </h1>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M 4 3 C 2.895 3 2 3.895 2 5 L 2 7.1484375 C 2 7.5644375 2.2378125 7.9705625 2.6328125 8.1015625 C 3.4278125 8.3655625 4 9.116 4 10 C 4 10.884 3.4278125 11.634438 2.6328125 11.898438 C 2.2378125 12.029438 2 12.435562 2 12.851562 L 2 15 C 2 16.105 2.895 17 4 17 L 20 17 C 21.105 17 22 16.105 22 15 L 22 12.851562 C 22 12.435562 21.762187 12.029437 21.367188 11.898438 C 20.572188 11.634438 20 10.884 20 10 C 20 9.116 20.572187 8.3655625 21.367188 8.1015625 C 21.762188 7.9705625 22 7.5644375 22 7.1484375 L 22 5 C 22 3.895 21.105 3 20 3 L 4 3 z M 4.9003906 19 L 17.339844 21.929688 C 17.549844 21.979688 17.750937 22 17.960938 22 C 19.170938 22 20.270312 21.190234 20.570312 19.990234 L 20.820312 19 L 4.9003906 19 z"></path>
                        </svg>

                        <h1>
                            2FA
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 30 30">
                                <path
                                    fill="currentColor"
                                    d="M 9.9902344 3.9902344 A 1.0001 1.0001 0 0 0 9.2929688 5.7070312 L 18.585938 15 L 9.2929688 24.292969 A 1.0001 1.0001 0 1 0 10.707031 25.707031 L 20.707031 15.707031 A 1.0001 1.0001 0 0 0 20.707031 14.292969 L 10.707031 4.2929688 A 1.0001 1.0001 0 0 0 9.9902344 3.9902344 z"></path>
                            </svg>
                        </h1>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M 22 2 L 19.058594 4.9414062 C 16.865786 2.7436807 13.666769 1.5536385 10.212891 2.15625 C 6.1828906 2.86025 2.9227344 6.0746563 2.1777344 10.097656 C 1.0007344 16.443656 5.864 22 12 22 C 17.134 22 21.3785 18.109094 21.9375 13.121094 C 22.0045 12.525094 21.5375 12 20.9375 12 C 20.4375 12 20.007125 12.368234 19.953125 12.865234 C 19.520125 16.870234 16.119 20 12 20 C 7.059 20 3.1501562 15.498859 4.1601562 10.380859 C 4.7681562 7.3008594 7.2335937 4.8107812 10.308594 4.1757812 C 13.170804 3.5850239 15.832013 4.545023 17.642578 6.3574219 L 15 9 L 22 9 L 22 2 z"></path>
                        </svg>

                        <h1>
                            Recovery
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 30 30">
                                <path
                                    fill="currentColor"
                                    d="M 9.9902344 3.9902344 A 1.0001 1.0001 0 0 0 9.2929688 5.7070312 L 18.585938 15 L 9.2929688 24.292969 A 1.0001 1.0001 0 1 0 10.707031 25.707031 L 20.707031 15.707031 A 1.0001 1.0001 0 0 0 20.707031 14.292969 L 10.707031 4.2929688 A 1.0001 1.0001 0 0 0 9.9902344 3.9902344 z"></path>
                            </svg>
                        </h1>
                    </li>
                </ul>
            </div>
        </div>
    );
}
