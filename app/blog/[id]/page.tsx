export const dynamic = 'force-dynamic';
import { axiosClient } from '@util/axios';
import b from '@sass/blog.module.sass';
import { Response, Post, User } from '@util/schema';
import { sanitize } from 'isomorphic-dompurify';
import { headers } from 'next/headers';
import LanguageHandler from '@util/handlers/LanguageHandler';
import Back from './Back';
import Comment from './Comment';
import Image from 'next/image';
import Delete from './Delete';
import { getUser } from '@util/helpers/User';

async function getPostData(id: string) {
    const post: Response<Post> = (await axiosClient.get('/v1/blog/' + id).catch((e) => e.response))?.data;

    return post;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
    const post = await getPostData(params.id);
    const title = post?.body?.data ? post.body.data.title + ' | Nove Blog' : '404 | Nove Blog';

    return {
        title,
        openGraph: {
            title,
        },
        twitter: {
            title,
        },
    };
}

export default async function Blog({ params }: { params: { id: string } }) {
    const user = await getUser();
    const lang = await new LanguageHandler('main/blog', user).init(headers());
    const post = await getPostData(params.id);

    return (
        <article className={b.blog}>
            <header className={b.warning}>
                <h1 className={b.header}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M17.196,3H6.804l-5.195,9l5.195,9h10.393l5.195-9L17.196,3z M13,17h-2v-2h2V17z M13,13h-2V7h2V13z"></path>
                    </svg>
                    {lang.getProp('warn-h1')}
                </h1>
                <p className={b.description}>{lang.getProp('warn-p')}</p>
            </header>
            <div className={b.content}>
                <Back lang={{ btn: lang.getCustomProp('modules.actions.back') }} />
                <h1>{post?.body?.data?.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: sanitize(post?.body?.data?.text) }} />
            </div>
            <div className={b.comments}>
                <h1>Comments ({post?.body?.data?.comments?.length})</h1>
                {user ? <Comment post={post?.body?.data} user={user} /> : null}
                <ul>
                    {post?.body?.data?.comments?.map((comment) => {
                        const date = new Date(comment.createdAt);
                        return (
                            <li key={comment.id}>
                                <div className={b.container}>
                                    <Image src={comment.authorAvatar} alt={comment.authorUsername + ' avatar'} width={32} height={32} />
                                    <header>
                                        <h1>{comment.authorUsername}</h1>
                                        <p>
                                            {comment.text} {comment.createdAt !== comment.updatedAt ? <span>(edited)</span> : null}
                                        </p>
                                    </header>
                                </div>
                                <aside>
                                    {comment.authorId === user?.id || user?.permissionLevel === 2 ? (
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
