import { AxiosError, AxiosRequestConfig } from 'axios';
import { axiosClient } from '@util/axios';
import { Connection, Device, Languages, Mfa, Post, PostComment, Response, User } from '@util/schema';

export enum AuthorizationType {
    Owner,
    Bearer,
}

enum RequestType {
    Get,
    Patch,
    Post,
    Delete,
}

interface MethodOptions {
    caching?: boolean;
}

interface DataGet {
    path: string;
    options?: AxiosRequestConfig<any>;
    type?: RequestType;
    body?: object;
}

async function getData<T>({ path, options, type, body }: DataGet) {
    const request =
        type === RequestType.Delete
            ? axiosClient.delete(path, options)
            : type === RequestType.Patch
              ? axiosClient.patch(path, body, options)
              : type === RequestType.Post
                ? axiosClient.post(path, body, options)
                : axiosClient.get(path, options);
    const response = await request.then((r) => r.data).catch((e: AxiosError) => e.response?.data);
    let final = (response?.body?.data || response?.body?.error) as T & {
        code?: string;
        meta?: {
            timestamp: string;
            version: string;
            server: string;
        };
    };
    if (path === '/v1/users/me')
        final = {
            ...final,
            meta: {
                timestamp: response?.meta?.timestamp,
                version: response?.meta?.version,
                server: response?.meta?.server,
            },
        };
    return final;
}

async function getCachedData<T>({ path, options, type, body }: DataGet) {
    const all = { path, options, type, body };
    const { cache } = await import('react');
    const getCache = cache(async <T>(all: DataGet) => await getData<T>(all));
    return getCache<T>(all);
}

export default class NAPI {
    private key?: string;
    private userAgent?: string;
    private authorization?: string;

    constructor(authorization?: string, userAgent?: string, type?: AuthorizationType) {
        this.key = authorization;
        this.userAgent = userAgent;
        this.authorization = type === AuthorizationType.Bearer ? `Bearer` : `Owner` + ` ${authorization}`;
    }

    language() {
        return {
            getAll: async ({ caching }: MethodOptions) => {
                const config: DataGet = { path: '/v1/languages', options: this.userAgent ? { headers: { 'User-Agent': this.userAgent } } : undefined };
                return caching ? await getCachedData<Languages>(config) : await getData<Languages>(config);
            },
        };
    }

    blog() {
        const options = { headers: this.userAgent ? { Authorization: this.authorization, 'User-Agent': this.userAgent } : { Authorization: this.authorization } };
        return {
            getPosts: async ({ caching }: MethodOptions) => {
                const config: DataGet = { path: '/v1/blog', options: this.userAgent ? { headers: { 'User-Agent': this.userAgent } } : undefined };
                return caching ? await getCachedData<Post[]>(config) : await getData<Post[]>(config);
            },
            getPost: async ({ id, caching }: MethodOptions & { id: string }) => {
                const config: DataGet = { path: '/v1/blog/' + id, options: this.userAgent ? { headers: { 'User-Agent': this.userAgent } } : undefined };
                return caching ? await getCachedData<Post>(config) : await getData<Post>(config);
            },
            createComment: async ({ id, text }: { id: string; text: string }) => {
                const config: DataGet = {
                    path: '/v1/blog/' + id + '/comment',
                    options,
                    type: RequestType.Post,
                    body: { text },
                };
                return await getData<PostComment>(config);
            },
            deleteComment: async ({ id, commentId }: { id: string; commentId: string }) => {
                const config: DataGet = {
                    path: '/v1/blog/' + id + '/comment/' + commentId,
                    options,
                    type: RequestType.Delete,
                };
                return await getData<PostComment>(config);
            },
        };
    }

    user() {
        const options = { headers: this.userAgent ? { Authorization: this.authorization, 'User-Agent': this.userAgent } : { Authorization: this.authorization } };

        return {
            get: async ({ caching }: MethodOptions) => {
                if (!this.key) return undefined;
                const config = { path: '/v1/users/me', options };
                return caching ? await getCachedData<User>(config) : await getData<User>(config);
            },
            getAll: async ({ mfa, caching }: MethodOptions & { mfa: string }) => {
                if (!this.key) return undefined;
                const config = { path: '/v1/admin/users', options: { headers: { ...options.headers, 'x-mfa': mfa } } };
                return caching ? await getCachedData<User[]>(config) : await getData<User[]>(config);
            },
            getDevices: async ({ caching }: MethodOptions) => {
                if (!this.key) return undefined;
                const config = { path: '/v1/users/me/activity', options };
                return caching ? await getCachedData<Device[]>(config) : await getData<Device[]>(config);
            },
            getConnections: async ({ caching }: MethodOptions) => {
                if (!this.key) return undefined;
                const config = { path: '/v1/users/me/connections', options };
                return caching ? await getCachedData<Connection[]>(config) : await getData<Connection[]>(config);
            },
            getRecovery: async ({ mfa, caching }: MethodOptions & { mfa: string }) => {
                if (!this.key) return undefined;
                const config = { path: '/v1/users/me/mfa/securityCodes', options: { headers: { ...options.headers, 'x-mfa': mfa } } };
                return caching ? await getCachedData<string[]>(config) : await getData<string[]>(config);
            },
            update: async ({
                body,
            }: {
                body: {
                    username?: string;
                    bio?: string;
                    website?: string;
                    pubkey?: string;
                    language?: string;
                    trackActivity?: boolean;
                    activityNotify?: boolean;
                    profilePublic?: boolean;
                };
            }) => {
                return await getData<User>({
                    path: '/v1/users/me',
                    options,
                    type: RequestType.Patch,
                    body,
                });
            },
            updateAvatar: async ({ body }: { body: { file: File } }) => {
                const data = new FormData();
                data.append('file', body.file);

                return await getData<User>({
                    path: '/v1/users/me/avatar',
                    options: { headers: { ...options.headers, 'Content-Type': 'multipart/form-data' } },
                    type: RequestType.Patch,
                    body: data,
                });
            },
            updatePassword: async ({ body }: { body: { oldPassword: string; newPassword: string; code?: string } }) => {
                return await getData<{ success: boolean } & User>({
                    path: '/v1/users/password',
                    options: { headers: { ...options.headers, 'x-mfa': body.code } },
                    type: RequestType.Patch,
                    body,
                });
            },
            updateEmail: async ({ body }: { body: { newEmail: string; code?: string } }) => {
                return await getData<{ success: boolean }>({
                    path: '/v1/users/emailReset',
                    options: { headers: { ...options.headers, 'x-mfa': body.code } },
                    type: RequestType.Patch,
                    body,
                });
            },
            setMFA: async ({ body }: { body: { code?: string } }) => {
                return await getData<Mfa>({
                    path: '/v1/users/me/mfa',
                    options: { headers: { ...options.headers, 'x-mfa': body.code } },
                    type: RequestType.Patch,
                    body,
                });
            },
            activateMFA: async ({ body }: { body: { code: string } }) => {
                return await getData<Mfa>({
                    path: '/v1/users/me/mfa/activate',
                    options: { headers: { ...options.headers, 'x-mfa': body.code } },
                    type: RequestType.Patch,
                    body,
                });
            },
            authorize: async ({ body, mfa }: { body: { username: string; password: string; address?: string }; mfa?: string }) => {
                return await getData<User>({
                    path: '/v1/users/login',
                    options: mfa
                        ? this.userAgent
                            ? { headers: { 'x-mfa': mfa, 'User-Agent': this.userAgent } }
                            : { headers: { 'x-mfa': mfa } }
                        : this.userAgent
                          ? { headers: { 'User-Agent': this.userAgent } }
                          : undefined,
                    type: RequestType.Post,
                    body,
                });
            },
            delete: async ({ body }: { body: { password: string; code?: string } }) => {
                return await getData<Mfa>({
                    path: '/v1/users/me/delete',
                    options: { headers: { ...options.headers, 'x-mfa': body.code } },
                    type: RequestType.Post,
                    body,
                });
            },
            resetPassword: async ({ body }: { body: { email: string; newPassword: string } }) => {
                return await getData<{ success: boolean }>({
                    path: '/v1/users/passwordRecovery',
                    options: this.userAgent ? { headers: { 'User-Agent': this.userAgent } } : undefined,
                    type: RequestType.Post,
                    body,
                });
            },
            confirmResetPassword: async ({ body }: { body: { code: string; userId: string; password: string } }) => {
                return await getData<User & { success: boolean }>({
                    path: '/v1/users/passwordKey',
                    options: this.userAgent ? { headers: { 'User-Agent': this.userAgent } } : undefined,
                    type: RequestType.Post,
                    body,
                });
            },
            register: async ({ body }: { body: { email: string; username: string; password: string; language?: string } }) => {
                return await getData<User>({
                    path: '/v1/users/register',
                    options: this.userAgent ? { headers: { 'User-Agent': this.userAgent } } : undefined,
                    type: RequestType.Post,
                    body,
                });
            },
        };
    }
}
