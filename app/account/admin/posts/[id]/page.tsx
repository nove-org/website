import { axiosClient } from '@util/axios';
import a from '@sass/account/part.module.sass';
import b from '@sass/blog.module.sass';
import { cookies, headers } from 'next/headers';
import { Response, User, Languages, Post } from '@util/schema';
import { redirect } from 'next/navigation';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { sanitize } from 'isomorphic-dompurify';
import Edit from './Edit';
import Back from './Back';
import Delete from './Delete';

export default async function Blog({ params }: { params: { id: string } }) {
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

    const post: Response<Post> = (await axiosClient.get('/v1/blog/' + params.id).catch((e) => e.response))?.data;

    return user?.body?.data?.username && languages?.body?.data ? (
        <article className={b.blog}>
            <div className={b.flex}>
                <Back
                    lang={{
                        btn: lang.getProp('back-btn'),
                    }}
                />
                <Edit
                    id={post.body.data.id}
                    title={post.body.data.title}
                    content={post.body.data.text}
                    lang={{
                        btn: lang.getProp('edit-btn'),
                        btnCancel: lang.getProp('new-btn-cancel'),
                        btnSubmit: lang.getProp('new-btn-submit'),
                        h1: lang.getProp('edit-h1'),
                        label: lang.getProp('new-label'),
                        labelContent: lang.getProp('new-label-content'),
                    }}
                />
                <Delete id={post.body.data.id} lang={{ btn: lang.getProp('delete-btn') }} />
            </div>
            <h1>{post.body.data.title}</h1>
            <p dangerouslySetInnerHTML={{ __html: sanitize(post.body.data.text) }} />
        </article>
    ) : (
        <div className={a.content}>
            <h1 className={a.title}>{lang.getProp('error-h1')}</h1>
            <p>{lang.getProp('error-p')}</p>
        </div>
    );
}
