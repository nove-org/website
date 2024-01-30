import { axiosClient } from '@util/axios';
import { Response, Post } from '@util/schema';

export async function getPosts(): Promise<Post[]> {
    return new Promise(async (resolve, reject) => {
        const posts: Response<Post[]> = (await axiosClient.get('/v1/blog').catch((e) => reject(e)))?.data;

        resolve(posts?.body?.data);
    });
}

export async function getPost(id: string): Promise<Post> {
    return new Promise(async (resolve, reject) => {
        const post: Response<Post> = (await axiosClient.get('/v1/blog/' + id).catch((e) => reject(e)))?.data;

        resolve(post?.body?.data);
    });
}
