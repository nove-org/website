export const dynamic = 'force-dynamic';
import { axiosClient } from '@util/axios';
import b from '@sass/blog.module.sass';
import { Response, Post } from '@util/schema';
import { sanitize } from 'isomorphic-dompurify';
import { headers } from 'next/headers';
import LanguageHandler from '@util/handlers/LanguageHandler';
import Back from './Back';
import Comment from './Comment';
import Image from 'next/image';
import Delete from './Delete';
import { getUser } from '@util/helpers/User';

async function getPostData(id: string) {
    const posts: Response<Post[]> = (await axiosClient.get('/v1/blog').catch((e) => e.response))?.data;
    const searchParam: string = id.toLowerCase();

    let postId: Post = posts?.body?.data?.filter(
        (post) => post.title.toLowerCase().split(' ').join('-') + '-' + post.id.split('-')[post.id.split('-').length - 1] === searchParam
    )[0];

    return ((await axiosClient.get(`/v1/blog/${postId ? postId.id : id}`).catch((e) => e.response))?.data as Response<Post>)?.body?.data;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
    const post = await getPostData(params.id);
    const title: string = post ? post.title + ' | Nove Blog' : '404 | Nove Blog';

    return {
        title,
        openGraph: { title },
        twitter: { title },
    };
}

export default async function Blog({ params }: { params: { id: string } }) {
    const user = await getUser();
    const lang = await new LanguageHandler('main/blog', user).init(headers());
    const post = await getPostData(params.id);

    return post ? (
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
                <h1>{post.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: sanitize(post.text) }} />
            </div>
            <div className={b.comments}>
                <h1>Comments ({post?.comments?.length || 0})</h1>
                {user ? <Comment post={post} user={user} /> : null}
                <ul>
                    {post?.comments?.map((comment) => {
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
                                            <Delete post={post} id={comment.id} />
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
    ) : (
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
                <p>{lang.getCustomProp('modules.errors.not-found')}</p>
            </div>
        </article>
    );
}
