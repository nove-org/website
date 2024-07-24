import o from '../../Blog.module.sass';
import NAPI from '@util/helpers/NAPI';
import { sanitize } from 'isomorphic-dompurify';
import { Post } from '@util/helpers/Schema';
import { cookies, headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import Databox from '@app/Databox';
import { redirect } from 'next/navigation';
import Comment from './Comment';
import ObjectHelper from '@util/helpers/Object';
import LanguageHandler from '@util/handlers/LanguageHandler';
import FormError from '@app/account/FormError';

async function getPostData(api: NAPI, id: string): Promise<Post | undefined> {
    const posts = await api.blog().getPosts({ caching: false });
    const searchParam: string = id.toLowerCase();
    let pid: string = posts?.filter((post) => post.title.toLowerCase().split(' ').join('-') + '-' + post.id.split('-')[post.id.split('-').length - 1] === searchParam)[0]?.id;

    return await api.blog().getPost({ id: pid || id, caching: true });
}

export async function generateMetadata({ params }: { params: { id: string } }) {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const post = await getPostData(api, params.id);
    const title: string = post?.title ? post.title + ' | Nove Blog' : '404 | Nove Blog';

    return {
        title,
        openGraph: { title },
        twitter: { title },
    };
}

export default async function BlogParams({ params, searchParams }: { params: { id: string }; searchParams: { [key: string]: string | string[] | undefined } }) {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: false });
    const post = await getPostData(api, params.id);
    const error: string | undefined = ObjectHelper.getValueByStringPath(searchParams, 'et');
    const lang = await new LanguageHandler('main/blog', user).init(headers());

    const commentCreate = async (e: FormData) => {
        'use server';

        const text = e.get('comment')?.toString();
        if (!text) redirect('?et=nd');

        const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
        const comment = await api.blog().createComment({ id: post?.id as string, text });

        if (!comment?.code) redirect('?s=' + new Date().getTime());
        else redirect('?et=rf');
    };

    return post?.title ? (
        <article className={o.blog}>
            <div className={o.text}>
                <div className={o.header}>
                    <h1>
                        {post.title}
                        <div className={o.buttons}>
                            <Link href="/blog" className="btn">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M 4 3 C 3.448 3 3 3.448 3 4 L 3 6 C 3 6.552 3.448 7 4 7 L 6 7 C 6.552 7 7 6.552 7 6 L 7 4 C 7 3.448 6.552 3 6 3 L 4 3 z M 11 3 C 10.448 3 10 3.448 10 4 L 10 6 C 10 6.552 10.448 7 11 7 L 13 7 C 13.552 7 14 6.552 14 6 L 14 4 C 14 3.448 13.552 3 13 3 L 11 3 z M 18 3 C 17.448 3 17 3.448 17 4 L 17 6 C 17 6.552 17.448 7 18 7 L 20 7 C 20.552 7 21 6.552 21 6 L 21 4 C 21 3.448 20.552 3 20 3 L 18 3 z M 4 10 C 3.448 10 3 10.448 3 11 L 3 13 C 3 13.552 3.448 14 4 14 L 6 14 C 6.552 14 7 13.552 7 13 L 7 11 C 7 10.448 6.552 10 6 10 L 4 10 z M 11 10 C 10.448 10 10 10.448 10 11 L 10 13 C 10 13.552 10.448 14 11 14 L 13 14 C 13.552 14 14 13.552 14 13 L 14 11 C 14 10.448 13.552 10 13 10 L 11 10 z M 18 10 C 17.448 10 17 10.448 17 11 L 17 13 C 17 13.552 17.448 14 18 14 L 20 14 C 20.552 14 21 13.552 21 13 L 21 11 C 21 10.448 20.552 10 20 10 L 18 10 z M 4 17 C 3.448 17 3 17.448 3 18 L 3 20 C 3 20.552 3.448 21 4 21 L 6 21 C 6.552 21 7 20.552 7 20 L 7 18 C 7 17.448 6.552 17 6 17 L 4 17 z M 11 17 C 10.448 17 10 17.448 10 18 L 10 20 C 10 20.552 10.448 21 11 21 L 13 21 C 13.552 21 14 20.552 14 20 L 14 18 C 14 17.448 13.552 17 13 17 L 11 17 z M 18 17 C 17.448 17 17 17.448 17 18 L 17 20 C 17 20.552 17.448 21 18 21 L 20 21 C 20.552 21 21 20.552 21 20 L 21 18 C 21 17.448 20.552 17 20 17 L 18 17 z"></path>
                                </svg>
                                View all
                            </Link>
                            {user?.permissionLevel === 2 && (
                                <Link href={`/account/blog/${post.id}`} className="btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M 15 3 C 11.698375 3 9 5.6983746 9 9 C 9 9.5259934 9.157478 9.9941578 9.2851562 10.472656 L 4.6347656 15.123047 C 3.1294504 15.513823 2 16.878977 2 18.5 C 2 20.421152 3.578848 22 5.5 22 C 7.1210229 22 8.486177 20.87055 8.8769531 19.365234 L 13.527344 14.714844 C 14.005842 14.842522 14.474007 15 15 15 C 18.301625 15 21 12.301625 21 9 C 21 8.2201415 20.839011 7.4833762 20.578125 6.8164062 L 20.021484 5.3925781 L 17.707031 7.7070312 L 17.705078 7.7070312 C 17.506764 7.9059013 17.258094 8 17 8 C 16.741906 8 16.493283 7.9059014 16.294922 7.7070312 L 16.292969 7.7070312 C 15.894042 7.3081043 15.894042 6.6918957 16.292969 6.2929688 L 18.607422 3.9785156 L 17.183594 3.421875 C 16.516624 3.1609894 15.779858 3 15 3 z M 14.814453 5.0371094 C 13.778085 6.2088531 13.759143 8.0013308 14.878906 9.1210938 C 15.460545 9.7042236 16.234094 10 17 10 C 17.708672 10 18.399092 9.6873874 18.962891 9.1875 C 18.860525 11.314481 17.15379 13 15 13 C 14.493858 13 14.007952 12.895958 13.544922 12.714844 L 12.935547 12.476562 L 8.5625 16.849609 C 8.2370689 16.251687 7.7483126 15.762931 7.1503906 15.4375 L 11.523438 11.064453 L 11.285156 10.455078 C 11.104042 9.9920482 11 9.5061415 11 9 C 11 6.8455427 12.686533 5.1384927 14.814453 5.0371094 z M 5.5 17 C 6.3402718 17 7 17.659728 7 18.5 C 7 19.340272 6.3402718 20 5.5 20 C 4.6597282 20 4 19.340272 4 18.5 C 4 17.659728 4.6597282 17 5.5 17 z"></path>
                                    </svg>{' '}
                                    Manage
                                </Link>
                            )}
                        </div>
                    </h1>
                    <p>
                        <Image src={post.authorAvatar} width={16} height={16} alt="User's avatar" />
                        <b>{post.authorUsername}</b> &middot;{' '}
                        <time>{new Date(post.createdAt).toLocaleDateString(user?.language || 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</time>
                    </p>
                    <Image src={post.header} alt={post.headerAlt} title={post.headerAlt} width={1000} height={444} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: sanitize(post.text) }} />
                {post.commentsAllowed && (
                    <div className={o.comments}>
                        <h1>Comments ({post.comments.length})</h1>
                        {user?.id && (
                            <form action={commentCreate} className={o.new}>
                                {error && (
                                    <FormError
                                        text={
                                            error === 'nd'
                                                ? lang.getCustomProp('modules.errors.no-data')
                                                : error === 'rf'
                                                  ? lang.getCustomProp('modules.errors.rate-limit')
                                                  : lang.getCustomProp('modules.errors.other')
                                        }
                                    />
                                )}
                                <Databox type="textarea" title={`Comment as ${user.username}...`} placeholder="..." required={true} id="comment" />
                                <button type="submit">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M 11 3 L 11 11 L 3 11 L 3 13 L 11 13 L 11 21 L 13 21 L 13 13 L 21 13 L 21 11 L 13 11 L 13 3 L 11 3 z"></path>
                                    </svg>
                                    Post
                                </button>
                            </form>
                        )}
                        <ul>
                            {post.comments.map((comment) => (
                                <Comment key={comment.id} user={user} comment={comment} />
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </article>
    ) : (
        <>not found</>
    );
}
