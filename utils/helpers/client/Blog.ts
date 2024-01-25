import { axiosClient } from '@util/axios';
import { Post, Response, Success } from '@util/schema';
import { BlogDelete, BlogPatch, BlogPost } from '@util/bodySchema';
import { getCookie } from 'cookies-next';

export async function createPost({ title, text }: BlogPost): Promise<Post | undefined> {
    return new Promise(async (resolve, reject) => {
        const post: Response<Post> = (
            await axiosClient
                .post(
                    '/v1/blog/create',
                    {
                        title,
                        text,
                    },
                    {
                        headers: {
                            Authorization: `Owner ${getCookie('napiAuthorizationToken')}`,
                        },
                    }
                )
                .catch((e) => reject(e))
        )?.data;

        resolve(post?.body?.data);
    });
}

export async function editPost({ id, title, text }: BlogPatch): Promise<Post | undefined> {
    return new Promise(async (resolve, reject) => {
        const post: Response<Post> = (
            await axiosClient
                .patch(
                    `/v1/blog/${id}`,
                    {
                        title,
                        text,
                    },
                    {
                        headers: {
                            Authorization: `Owner ${getCookie('napiAuthorizationToken')}`,
                        },
                    }
                )
                .catch((e) => reject(e))
        )?.data;

        resolve(post?.body?.data);
    });
}

export async function deletePost({ id }: BlogDelete): Promise<Success | undefined> {
    return new Promise(async (resolve, reject) => {
        const post: Response<Success> = (
            await axiosClient
                .delete(`/v1/blog/${id}`, {
                    headers: {
                        Authorization: `Owner ${getCookie('napiAuthorizationToken')}`,
                    },
                })
                .catch((e) => reject(e))
        )?.data;

        resolve(post?.body?.data);
    });
}
