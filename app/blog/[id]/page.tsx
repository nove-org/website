export const dynamic = 'force-dynamic';
import b from '@sass/blog.module.sass';
import { Post } from '@util/schema';
import { sanitize } from 'isomorphic-dompurify';
import { headers } from 'next/headers';
import LanguageHandler from '@util/handlers/LanguageHandler';
import Back from './Back';
import Comment from './Comment';
import Image from 'next/image';
import Delete from './Delete';
import { getUser } from '@util/helpers/User';
import { getPost, getPosts } from '@util/helpers/Blog';

async function getPostData(id: string): Promise<Post | undefined> {
    return new Promise(async (resolve, reject) => {
        const posts = await getPosts();
        const searchParam: string = id.toLowerCase();
        let pid: string = posts?.filter((post) => post.title.toLowerCase().split(' ').join('-') + '-' + post.id.split('-')[post.id.split('-').length - 1] === searchParam)[0]?.id;

        resolve(await getPost(pid || id));
    });
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
            <div className={b.content}>
                <Back lang={{ btn: lang.getCustomProp('modules.actions.back') }} />
                <h1>{post.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: sanitize(post.text) }} />
            </div>
            <div className={b.author}>
                <h1>This article was written by</h1>
                <div className={b.card}>
                    <Image src={post.authorAvatar} alt="" width="64" height="64" />
                    <div className={b.id}>
                        <h1>{post.authorUsername}</h1>
                        <p>Lorem ipsum dolor sit amet description</p>
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M 12 2 C 8.741068 2 5.8486894 3.5773875 4.0214844 6 L 4 6 L 4 6.0273438 C 2.7499527 7.6966931 2 9.7603852 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 15 4.5839844 C 17.935098 5.7673596 20 8.6326468 20 12 C 20 14.087831 19.200587 15.978318 17.898438 17.400391 C 17.642583 16.590687 16.894567 16 16 16 C 15.448 16 15 15.552 15 15 L 15 13 C 15 12.448 14.552 12 14 12 L 10 12 C 9.448 12 9 11.552 9 11 C 9 10.448 9.448 10 10 10 C 10.552 10 11 9.552 11 9 L 11 8 C 11 7.448 11.448 7 12 7 L 13 7 C 14.105 7 15 6.105 15 5 L 15 4.5839844 z M 4.2070312 10.207031 L 9 15 L 9 16 C 9 17.105 9.895 18 11 18 L 11 19.931641 C 7.0457719 19.441154 4 16.090654 4 12 C 4 11.382188 4.0755242 10.784034 4.2070312 10.207031 z"></path>
                            </svg>
                            Website
                        </a>
                    </div>
                </div>
            </div>
            <div className={b.comments}>
                <h1>Comments</h1>
                <div className={b.flex}>
                    {user ? <Comment post={post} user={user} /> : null}
                    <ul>
                        {post.comments.length < 1 ? <p>No one commented on this post yet</p> : null}
                        {post.comments.map((comment) => {
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
