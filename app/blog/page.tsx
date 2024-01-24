export const dynamic = 'force-dynamic';
import o from '@sass/blog.module.sass';
import { axiosClient } from '@util/axios';
import { Response, Post } from '@util/schema';
import { headers } from 'next/headers';
import LanguageHandler from '@util/handlers/LanguageHandler';
import BlogCard from './BlogCard';
import { getUser } from '@util/helpers/User';

export async function generateMetadata() {
    const title: string = 'Homepage | Nove Blog';

    return {
        title,
        openGraph: { title },
        twitter: { title },
    };
}

export default async function BlogList() {
    const user = await getUser();
    const lang = await new LanguageHandler('main/blog', user).init(headers());
    const posts: Response<Post[]> = (await axiosClient.get('/v1/blog').catch((e) => e.response))?.data;

    return (
        <div className={o.posts}>
            <header className={o.warning}>
                <h1 className={o.header}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M17.196,3H6.804l-5.195,9l5.195,9h10.393l5.195-9L17.196,3z M13,17h-2v-2h2V17z M13,13h-2V7h2V13z"></path>
                    </svg>
                    {lang.getProp('warn-h1')}
                </h1>
                <p className={o.description}>{lang.getProp('warn-p')}</p>
            </header>
            <ul className={o.posts}>
                {posts?.body?.data.map((post) => {
                    return <BlogCard key={post.id} post={post} />;
                })}
            </ul>
        </div>
    );
}
