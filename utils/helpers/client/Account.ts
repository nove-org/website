import { axiosClient } from '@util/axios';
import { Response, User, Success } from '@util/schema';
import { LoginPost, RegisterPost, ResetPasswordPost } from '@util/bodySchema';

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
                    { headers: { 'x-mfa': mfa } }
                )
                .catch((e) => reject(e))
        )?.data;

        resolve(user?.body?.data);
    });
}

export async function resetPasswordCall({ email, newPassword }: ResetPasswordPost): Promise<Success> {
    return new Promise(async (resolve, reject) => {
        const success: Response<Success> = (await axiosClient.post('/v1/users/passwordRecovery', { email, newPassword }).catch((e) => reject(e)))?.data;

        resolve(success?.body?.data);
    });
}

export async function registerCall({ email, username, password }: RegisterPost): Promise<User | undefined> {
    return new Promise(async (resolve, reject) => {
        const user: Response<User> = (
            await axiosClient
                .post('/v1/users/register', {
                    email,
                    username,
                    password,
                })
                .catch((e) => reject(e))
        )?.data;

        resolve(user?.body?.data);
    });
}
