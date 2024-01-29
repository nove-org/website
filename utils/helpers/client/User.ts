import { axiosClient } from '@util/axios';
import { Mfa, Response, Success, User } from '@util/schema';
import { AvatarPatch, EmailPatch, MeDelete, MfaGet, MfaPatch, PasswordPatch, UserDelete, UserDisable, UserPatch } from '@util/bodySchema';
import { getCookie } from 'cookies-next';

export const napiToken: string = `Owner ${getCookie('napiAuthorizationToken')?.split('%20')[0]} ${getCookie('napiAuthorizationToken')?.split('%20')[1]}`;

export async function getUsers({ mfa }: MfaGet): Promise<User[] | undefined> {
    return new Promise(async (resolve, reject) => {
        const users: Response<User[]> = (
            await axiosClient
                .get('/v1/admin/users', {
                    headers: {
                        Authorization: napiToken,
                        'x-mfa': mfa,
                    },
                })
                .catch((e) => reject(e))
        )?.data;

        resolve(users?.body?.data);
    });
}

export async function getRecoveryCodes({ mfa }: MfaGet): Promise<string[] | undefined> {
    return new Promise(async (resolve, reject) => {
        const codes: Response<string[]> = (
            await axiosClient
                .get('/v1/users/me/mfa/securityCodes', {
                    headers: {
                        Authorization: napiToken,
                        'x-mfa': mfa,
                    },
                })
                .catch((e) => reject(e))
        )?.data;

        resolve(codes?.body?.data);
    });
}

export async function patchEmail({ newEmail, code }: EmailPatch): Promise<Success | undefined> {
    return new Promise(async (resolve, reject) => {
        const email: Response<Success> = (
            await axiosClient
                .patch(
                    '/v1/users/emailReset',
                    { newEmail },
                    {
                        headers: {
                            Authorization: napiToken,
                            'x-mfa': code,
                        },
                    }
                )
                .catch((e) => reject(e))
        )?.data;

        resolve(email?.body?.data);
    });
}

export async function patchPassword({ oldPassword, newPassword, code }: PasswordPatch): Promise<(Success & User) | undefined> {
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
                            Authorization: napiToken,
                            'x-mfa': code,
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
                            Authorization: napiToken,
                        },
                    }
                )
                .catch((e) => reject(e))
        )?.data;

        resolve(user?.body?.data);
    });
}

export async function patchAvatar({ file }: AvatarPatch): Promise<User | undefined> {
    return new Promise(async (resolve, reject) => {
        const avatar: Response<User> = (
            await axiosClient
                .patch(
                    '/v1/users/me/avatar',
                    { file },
                    {
                        headers: {
                            Authorization: napiToken,
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                )
                .catch((e) => reject(e))
        )?.data;

        resolve(avatar?.body?.data);
    });
}

export async function patchMfa({ code }: MfaPatch): Promise<Mfa | undefined> {
    return new Promise(async (resolve, reject) => {
        const mfa: Response<Mfa> = (
            await axiosClient
                .patch(
                    '/v1/users/me/mfa',
                    {},
                    {
                        headers: {
                            Authorization: napiToken,
                            'x-mfa': code,
                        },
                    }
                )
                .catch((e) => reject(e))
        )?.data;

        resolve(mfa?.body?.data);
    });
}

export async function activateMfa({ code, cancel }: MfaPatch): Promise<Mfa | undefined> {
    return new Promise(async (resolve, reject) => {
        const mfa: Response<Mfa> = (
            await axiosClient
                .patch(
                    '/v1/users/me/mfa/activate',
                    { cancel },
                    {
                        headers: {
                            Authorization: napiToken,
                            'x-mfa': code,
                        },
                    }
                )
                .catch((e) => reject(e))
        )?.data;

        resolve(mfa?.body?.data);
    });
}

export async function disableUser({ id, data, reason, code }: UserDisable): Promise<Success | undefined> {
    return new Promise(async (resolve, reject) => {
        const userDisable: Response<Success> = !data.disabled
            ? (
                  await axiosClient
                      .post(
                          `/v1/admin/users/${id}/disable`,
                          { reason },
                          {
                              headers: {
                                  Authorization: napiToken,
                                  'x-mfa': code,
                              },
                          }
                      )
                      .catch((e) => reject(e))
              )?.data
            : (
                  await axiosClient
                      .delete(`/v1/admin/users/${id}/disable`, {
                          headers: {
                              Authorization: napiToken,
                              'x-mfa': code,
                          },
                      })
                      .catch((e) => reject(e))
              )?.data;

        resolve(userDisable?.body?.data);
    });
}

export async function deleteUser({ id, reason, code }: UserDelete): Promise<Success | undefined> {
    return new Promise(async (resolve, reject) => {
        const userDelete: Response<Success> = (
            await axiosClient
                .patch(
                    `/v1/admin/users/${id}/delete`,
                    { reason },
                    {
                        headers: {
                            Authorization: napiToken,
                            'x-mfa': code,
                        },
                    }
                )
                .catch((e) => reject(e))
        )?.data;

        resolve(userDelete?.body?.data);
    });
}

export async function deleteMe({ password, code }: MeDelete): Promise<Success | undefined> {
    return new Promise(async (resolve, reject) => {
        const remove: Response<Success> = (
            await axiosClient
                .patch(
                    '/v1/users/me/delete',
                    { password },
                    {
                        headers: {
                            Authorization: napiToken,
                            'x-mfa': code,
                        },
                    }
                )
                .catch((e) => reject(e))
        )?.data;

        resolve(remove?.body?.data);
    });
}
