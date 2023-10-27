import { axiosClient } from '@util/axios';
import b from '@sass/blog.module.sass';
import { Response, Post, User } from '@util/schema';
import { sanitize } from 'isomorphic-dompurify';
import { cookies, headers } from 'next/headers';
import LanguageHandler from '@util/handlers/LanguageHandler';
import Back from './Back';
import Comment from './Comment';
import Image from 'next/image';
import Delete from './Delete';

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
                <h1>{post?.body?.data?.post?.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: sanitize(post?.body?.data?.post?.text) }} />
            </div>
            <div className={b.comments}>
                <h1>Comments ({post?.body?.data?.comments?.length})</h1>
                <Comment post={post?.body?.data} user={user?.body?.data} />
                <ul>
                    {post?.body?.data?.comments?.map((comment) => {
                        const date = new Date(comment.createdAt);
                        return (
                            <li key={comment.id}>
                                <div className={b.container}>
                                    <header>
                                        <Image src={comment.authorAvatar} alt={comment.authorUsername + ' avatar'} width={18} height={18} />
                                        {comment.authorUsername}
                                    </header>
                                    {comment.text} {comment.createdAt !== comment.updatedAt ? <span>(edited)</span> : null}
                                </div>
                                <aside>
                                    {comment.authorId === user?.body?.data?.id || user?.body?.data?.permissionLevel === 2 ? (
                                        <>
                                            <Delete post={post.body.data} id={comment.id} />
                                        </>
                                    ) : null}
                                    <time>{date.toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
                                </aside>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </article>
    );
}
