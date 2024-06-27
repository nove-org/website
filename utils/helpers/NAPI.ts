import { AxiosError } from 'axios';
import { axiosClient } from './Axios';
import { Connection, Device, Languages, Post, Response, User } from './Schema';

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
    options?: object;
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
    return (response?.body?.data || response?.body?.error) as T & { code?: string };
}

async function getCachedData<T>({ path, options, type, body }: DataGet) {
    const all = { path, options, type, body };
    const { cache } = await import('react');
    const getCache = cache(async <T>(all: DataGet) => await getData<T>(all));
    return getCache<T>(all);
}

export default class NAPI {
    private key?: string;
    private authorization?: string;

    constructor(authorization?: string, type?: AuthorizationType) {
        this.key = authorization;
        this.authorization = type === AuthorizationType.Bearer ? `Bearer` : `Owner` + ` ${authorization}`;
    }

    language() {
        return {
            get: async ({ caching }: MethodOptions) => {
                const config = { path: '/v1/languages' };
                return caching ? await getCachedData<Languages>(config) : await getData<Languages>(config);
            },
        };
    }

    blog() {
        return {
            getPosts: async ({ caching }: MethodOptions) => {
                const config = { path: '/v1/blog' };
                return caching ? await getCachedData<Post[]>(config) : await getData<Post[]>(config);
            },
            getPost: async ({ id, caching }: MethodOptions & { id: string }) => {
                const config = { path: '/v1/blog/' + id };
                return caching ? await getCachedData<Post>(config) : await getData<Post>(config);
            },
        };
    }

    user() {
        const options = { headers: { Authorization: this.authorization } };

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
            authorize: async ({ body }: { body: { username: string; password: string } }) => {
                return await getData<User>({ path: '/v1/users/login', type: RequestType.Post, body });
            },
        };
    }
}
