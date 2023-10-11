import { axiosClient } from '@util/axios';
import b from '@sass/blog.module.sass';
import { Response, Post, User } from '@util/schema';
import { sanitize } from 'isomorphic-dompurify';
import { cookies, headers } from 'next/headers';
import LanguageHandler from '@util/handlers/LanguageHandler';
import Back from './Back';

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

export default async function Blog({ params }: { params: { id: string } }) {
    const user: Response<User> = (
        await axiosClient
            .get('/v1/users/me', {
                headers: { Authorization: `Owner ${cookies()?.get('napiAuthorizationToken')?.value}` },
            })
            .catch((e) => e.response)
    )?.data;

    const lang = await new LanguageHandler('main/blog', user?.body?.data).init(headers());
    const post: Response<Post> = (await axiosClient.get('/v1/blog/' + params.id).catch((e) => e.response))?.data;

    return (
        <article className={b.blog}>
            <header className={b.warning}>
                <h1 className={b.header}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                        <path d="M17.196,3H6.804l-5.195,9l5.195,9h10.393l5.195-9L17.196,3z M13,17h-2v-2h2V17z M13,13h-2V7h2V13z"></path>
                    </svg>
                    {lang.getProp('warn-h1')}
                </h1>
                <p className={b.description}>{lang.getProp('warn-p')}</p>
            </header>
            <div className={b.content}>
                <Back lang={{ btn: lang.getProp('back-btn') }} />
                <h1>{post?.body?.data?.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: sanitize(post?.body?.data?.text) }} />
            </div>
        </article>
    );
}
