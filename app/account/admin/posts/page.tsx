import { axiosClient } from '@util/axios';
import a from '@sass/account/part.module.sass';
import o from '@sass/account/admin/blog.module.sass';
import { cookies, headers } from 'next/headers';
import { Response, User, Languages, Post } from '@util/schema';
import { redirect } from 'next/navigation';
import LanguageHandler from '@util/handlers/LanguageHandler';
import Image from 'next/image';
import Link from 'next/link';
import NewPost from './NewPost';

export default async function BlogList() {
    const user: Response<User> = (
        await axiosClient
            .get('/v1/users/me', {
                headers: { Authorization: `Owner ${cookies()?.get('napiAuthorizationToken')?.value}` },
            })
            .catch((e) => e.response)
    )?.data;

    if (user.body.data.permissionLevel < 1) return redirect('/account');

    const languages: Response<Languages> = (await axiosClient.get('/v1/languages').catch((e) => e.response))?.data;
    const lang = await new LanguageHandler('admin/posts', user?.body?.data).init(headers());

    const posts: Response<Post[]> = (await axiosClient.get('/v1/blog').catch((e) => e.response))?.data;

    return user?.body?.data?.username && languages?.body?.data ? (
        <div className={a.content}>
            <h1 className={a.title}>{lang.getProp('header', { number: posts.body.data.length })}</h1>
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
                {posts.body.data.map((post) => (
                    <li key={post.id}>
                        <Link href={`/account/admin/posts/${post.id}`}>
                            <aside>
                                <header>
                                    <Image src={`https://api.nove.team/v1/users/${post.authorId}/avatar.webp`} width={18} height={18} alt="Avatar" />
                                    {'wnm210'}
                                </header>
                                <h1>{post.title}</h1>
                            </aside>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 30 30">
                                <path
                                    fill="currentColor"
                                    d="M 9.9902344 3.9902344 A 1.0001 1.0001 0 0 0 9.2929688 5.7070312 L 18.585938 15 L 9.2929688 24.292969 A 1.0001 1.0001 0 1 0 10.707031 25.707031 L 20.707031 15.707031 A 1.0001 1.0001 0 0 0 20.707031 14.292969 L 10.707031 4.2929688 A 1.0001 1.0001 0 0 0 9.9902344 3.9902344 z"></path>
                            </svg>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    ) : (
        <div className={a.content}>
            <h1 className={a.title}>{lang.getCustomProp('modules.errors.header')}</h1>
            <p className={a.desc}>{lang.getCustomProp('modules.errors.p-session')}</p>
        </div>
    );
}
