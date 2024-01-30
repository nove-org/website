import { axiosClient } from '@util/axios';
import { Response, Post } from '@util/schema';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts: Response<Post[]> = (await axiosClient.get('/v1/blog').catch((e) => e.response))?.data;
    const array: {
        url: string;
        lastModified?: string | Date | undefined;
        changeFrequency?: 'yearly' | 'daily' | 'monthly' | 'always' | 'hourly' | 'weekly' | 'never' | undefined;
        priority?: number | undefined;
    }[] = [
        {
            url: 'https://nove.team',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://nove.team/blog',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: 'https://nove.team/about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://nove.team/foss',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://nove.team/privacy',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: 'https://nove.team/terms',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
    ];

    for (const post of posts?.body?.data) {
        const blogLink: string = post.title.toLowerCase().split(' ').join('-') + '-' + post.id.split('-')[post.id.split('-').length - 1];

        array.push({
            url: 'https://nove.team/blog/' + blogLink,
            lastModified: new Date(post.createdAt),
            changeFrequency: 'monthly',
            priority: 0.9,
        });
    }

    return array;
}
