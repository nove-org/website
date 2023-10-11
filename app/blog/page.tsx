import { axiosClient } from '@util/axios';
import o from '@sass/blog.module.sass';
import { Response, Post } from '@util/schema';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
    title: 'Nove | Blog',
    openGraph: {
        title: 'Nove | Blog',
        images: [],
    },
    twitter: {
        title: 'Nove | Blog',
        images: [],
    },
    keywords: ['nove', 'nove blog', 'about'],
};

export default async function BlogList() {
    const posts: Response<Post[]> = (await axiosClient.get('/v1/blog').catch((e) => e.response))?.data;

    return (
        <div className={o.posts}>
            <header className={o.warning}>
                <h1 className={o.header}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                        <path d="M17.196,3H6.804l-5.195,9l5.195,9h10.393l5.195-9L17.196,3z M13,17h-2v-2h2V17z M13,13h-2V7h2V13z"></path>
                    </svg>
                    Warning
                </h1>
                <p className={o.description}>Right now, we only share posts in English but it will change in the future as we evolve.</p>
            </header>
            <ul className={o.posts}>
                {posts?.body?.data.map((post) => (
                    <li key={post.id}>
                        <Link href={`/blog/${post.id}`}>
                            <h1>
                                {post.title}
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 30 30">
                                    <path
                                        fill="currentColor"
                                        d="M 9.9902344 3.9902344 A 1.0001 1.0001 0 0 0 9.2929688 5.7070312 L 18.585938 15 L 9.2929688 24.292969 A 1.0001 1.0001 0 1 0 10.707031 25.707031 L 20.707031 15.707031 A 1.0001 1.0001 0 0 0 20.707031 14.292969 L 10.707031 4.2929688 A 1.0001 1.0001 0 0 0 9.9902344 3.9902344 z"></path>
                                </svg>
                            </h1>
                            <p>
                                by <Image src={`https://api.nove.team/v1/users/${post.authorId}/avatar.webp`} alt="avatar" width="18" height="18" /> wnm210
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
