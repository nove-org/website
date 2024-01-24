import { axiosClient } from '@util/axios';
import { Response, User, Success } from '@util/schema';
import { LoginPost, RegisterPost, ResetPasswordPost } from '@util/bodySchema';

export function errorHandler(err: Response<null>): string {
    const text: string[] = [];

    if (err?.body?.error?.details)
        err.body.error.details.map((detail) =>
            detail?.validation !== 'regex' ? text.push(`${detail.path}: ${detail.message} [${detail?.code || detail?.validation || 'unknown'}]`) : null
        );
    else if (err.body.error) text.push(`${err.body.error?.param.split(':')[1]}: ${err.body.error?.message || 'No message'}`);
    else text.push(`error: Unknown error occurred (are servers offline?)`);

    return text.join('\n');
}

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
