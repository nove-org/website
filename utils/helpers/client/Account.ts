import { axiosClient } from '@util/axios';
import { Response, User } from '@util/schema';
import { LoginPost, RegisterPost } from '@util/bodySchema';

const headers = {
    'Content-Type': 'application/json',
};

export async function loginCall({ username, password, mfa }: LoginPost): Promise<User> {
    return new Promise(async (resolve, reject) => {
        const user: Response<User> = (
            await axiosClient
                .post(
                    '/v1/users/login',
                    {
                        username,
                        password,
                    },
                    {
                        headers: {
                            'x-mfa': mfa,
                            ...headers,
                        },
                    }
                )
                .catch((e) => reject(e))
        )?.data;

        resolve(user?.body?.data);
    });
}

export async function registerCall({ email, username, password }: RegisterPost): Promise<User | undefined> {
    return new Promise(async (resolve, reject) => {
        const user: Response<User> = (
            await axiosClient
                .post(
                    '/v1/users/register',
                    {
                        email,
                        username,
                        password,
                    },
                    { headers }
                )
                .catch((e) => reject(e))
        )?.data;

        resolve(user?.body?.data);
    });
}
