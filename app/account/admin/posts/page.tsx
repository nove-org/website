export const dynamic = 'force-dynamic';
import a from '@sass/account/part.module.sass';
import o from '@sass/account/admin/blog.module.sass';
import { headers } from 'next/headers';
import LanguageHandler from '@util/handlers/LanguageHandler';
import Image from 'next/image';
import Link from 'next/link';
import NewPost from './NewPost';
import { getPosts } from '@util/helpers/Blog';
import { getUser } from '@util/helpers/User';

export default async function BlogList() {
    const user = await getUser();
    const lang = await new LanguageHandler('admin/posts', user).init(headers());
    const posts = await getPosts();

    return user?.username ? (
        <div className={a.content}>
            <h1 className={a.title}>{lang.getProp('header', { number: posts?.length })}</h1>
            <NewPost
                lang={{
                    btn: lang.getProp('new-btn'),
                    btnCancel: lang.getCustomProp('modules.actions.cancel'),
                    btnSubmit: lang.getCustomProp('modules.actions.create'),
                    h1: lang.getProp('new-h1'),
                    label: lang.getProp('new-label'),
                    labelContent: lang.getProp('new-label-content'),
                }}
            />
            <ul className={o.posts}>
                {posts?.map((post) => {
                    const created = new Date(post.createdAt);
                    const updated = new Date(post.updatedAt);
                    return (
                        <li key={post.id}>
                            <Link href={`/account/admin/posts/${post.id}`}>
                                <div className={o.side}>
                                    <header>
                                        <Image src={`https://api.nove.team/v1/users/${post.authorId}/avatar.webp`} width={18} height={18} alt="Avatar" />
                                        {post.authorUsername}
                                    </header>
                                    <h1>{post.title}</h1>
                                    <div className={o.time}>
                                        <time>Created &middot; {created.toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
                                        <time>Updated &middot; {updated.toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 30 30">
                                    <path
                                        fill="currentColor"
                                        d="M 9.9902344 3.9902344 A 1.0001 1.0001 0 0 0 9.2929688 5.7070312 L 18.585938 15 L 9.2929688 24.292969 A 1.0001 1.0001 0 1 0 10.707031 25.707031 L 20.707031 15.707031 A 1.0001 1.0001 0 0 0 20.707031 14.292969 L 10.707031 4.2929688 A 1.0001 1.0001 0 0 0 9.9902344 3.9902344 z"></path>
                                </svg>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    ) : (
        <div className={a.content}>
            <h1 className={a.title}>{lang.getCustomProp('modules.errors.header')}</h1>
            <p className={a.desc}>{lang.getCustomProp('modules.errors.session')}</p>
        </div>
    );
}
