import { axiosClient } from '@util/axios';
import { cookies } from 'next/headers';
import { Response, User } from '@util/schema';

export function getUser(): Promise<User | undefined> {
    return new Promise(async (resolve) => {
        const user: Response<User> = (
            await axiosClient
                .get('/v1/users/me', {
                    headers: { Authorization: `Owner ${cookies()?.get('napiAuthorizationToken')?.value}` },
                })
                .catch((e) => e.response)
        )?.data;

        resolve(user?.body?.data);
    });
}
