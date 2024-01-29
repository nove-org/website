import { axiosClient } from '@util/axios';
import { cookies } from 'next/headers';
import { Device, Response, User, Connection } from '@util/schema';

export function getUser(): Promise<User | undefined> {
    return new Promise(async (resolve) => {
        const user: Response<User> = (
            await axiosClient
                .get('/v1/users/me', {
                    headers: {
                        Authorization: `Owner ${cookies()?.get('napiAuthorizationToken')?.value.split('%20')[0]} ${
                            cookies()?.get('napiAuthorizationToken')?.value.split('%20')[1]
                        }`,
                    },
                })
                .catch((e) => e.response)
        )?.data;

        resolve(user?.body?.data);
    });
}

export function getUserDevices({ perPage }: { perPage?: number }): Promise<Device[] | undefined> {
    return new Promise(async (resolve) => {
        const devices: Response<Device[]> = (
            await axiosClient
                .get('/v1/users/me/activity' + (perPage ? `?perPage=${perPage}` : ''), {
                    headers: {
                        Authorization: `Owner ${cookies()?.get('napiAuthorizationToken')?.value.split('%20')[0]} ${
                            cookies()?.get('napiAuthorizationToken')?.value.split('%20')[1]
                        }`,
                    },
                })
                .catch((e) => e.response)
        )?.data;

        resolve(devices?.body?.data);
    });
}

export function getUserConnections(): Promise<Connection[] | undefined> {
    return new Promise(async (resolve) => {
        const devices: Response<Connection[]> = (
            await axiosClient
                .get('/v1/users/me/connections', {
                    headers: {
                        Authorization: `Owner ${cookies()?.get('napiAuthorizationToken')?.value.split('%20')[0]} ${
                            cookies()?.get('napiAuthorizationToken')?.value.split('%20')[1]
                        }`,
                    },
                })
                .catch((e) => e.response)
        )?.data;

        resolve(devices?.body?.data);
    });
}
