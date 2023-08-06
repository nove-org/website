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
                <ul>
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
        </div>
    );
}
