import { axiosClient } from '@util/axios';
import { Mfa, Response, Success, User } from '@util/schema';
import { EmailPatch, MfaPatch, PasswordPatch, RecoveryGet, UserDelete, UserPatch } from '@util/bodySchema';
import { getCookie } from 'cookies-next';

export async function getRecoveryCodes({ mfa }: RecoveryGet): Promise<string[] | undefined> {
    return new Promise(async (resolve, reject) => {
        const codes: Response<string[]> = (
            await axiosClient
                .post('/v1/users/me/mfa/securityCodes', {
                    headers: {
                        Authorization: `Owner ${getCookie('napiAuthorizationToken')}`,
                        'x-mfa': mfa,
                    },
                })
                .catch((e) => reject(e))
        )?.data;

        resolve(codes?.body?.data);
    });
}

export async function patchEmail({ newEmail }: EmailPatch): Promise<Success | undefined> {
    return new Promise(async (resolve, reject) => {
        const email: Response<Success> = (
            await axiosClient
                .patch(
                    '/v1/users/emailReset',
                    { newEmail },
                    {
                        headers: {
                            Authorization: `Owner ${getCookie('napiAuthorizationToken')}`,
                        },
                    }
                )
                .catch((e) => reject(e))
        )?.data;

        resolve(email?.body?.data);
    });
}

export async function patchPassword({ oldPassword, newPassword }: PasswordPatch): Promise<(Success & User) | undefined> {
    return new Promise(async (resolve, reject) => {
        const password: Response<Success & User> = (
            await axiosClient
                .patch(
                    '/v1/users/password',
                    {
                        oldPassword,
                        newPassword,
                    },
                    {
                        headers: {
                            Authorization: `Owner ${getCookie('napiAuthorizationToken')}`,
                        },
                    }
                )
                .catch((e) => reject(e))
        )?.data;

        resolve(password?.body?.data);
    });
}

export async function patchUser({ username, bio, language, trackActivity, profilePublic }: UserPatch): Promise<string[]> {
    return new Promise(async (resolve, reject) => {
        const user: Response<string[]> = (
            await axiosClient
                .patch(
                    '/v1/users/me',
                    {
                        username,
                        bio,
                        language,
                        trackActivity,
                        profilePublic,
                    },
                    {
                        headers: {
                            Authorization: `Owner ${getCookie('napiAuthorizationToken')}`,
                        },
                    }
                )
                .catch((e) => reject(e))
        )?.data;

        resolve(user?.body?.data);
    });
}

export async function patchMfa({ enabled, code }: MfaPatch): Promise<Mfa | undefined> {
    return new Promise(async (resolve, reject) => {
        const mfa: Response<Mfa> = (
            await axiosClient
                .patch(
                    '/v1/users/me/mfa',
                    { enabled },
                    {
                        headers: {
                            Authorization: `Owner ${getCookie('napiAuthorizationToken')}`,
                            'x-mfa': code,
                        },
                    }
                )
                .catch((e) => reject(e))
        )?.data;

        resolve(mfa?.body?.data);
    });
}

export async function deleteUser({ password }: UserDelete): Promise<Success | undefined> {
    return new Promise(async (resolve, reject) => {
        const remove: Response<Success> = (
            await axiosClient
                .patch(
                    '/v1/users/me/delete',
                    { password },
                    {
                        headers: {
                            Authorization: `Owner ${getCookie('napiAuthorizationToken')}`,
                        },
                    }
                )
                .catch((e) => reject(e))
        )?.data;

        resolve(remove?.body?.data);
    });
}
