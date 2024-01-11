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

    console.log(user);

    if (user.body.data.permissionLevel < 1) return redirect('/account');

    const languages: Response<Languages> = (await axiosClient.get('/v1/languages').catch((e) => e.response))?.data;
    const lang = await new LanguageHandler('admin/posts', user?.body?.data).init(headers());

    const post: Response<Post> = (await axiosClient.get('/v1/blog/' + params.id).catch((e) => e.response))?.data;
    console.log(post);

    return user?.body?.data?.username && languages?.body?.data ? (
        <article className={b.blog}>
            <div className={b.content}>
                <div className={b.flex}>
                    <Back
                        lang={{
                            btn: lang.getCustomProp('modules.actions.back'),
                        }}
                    />
                    <Edit
                        id={post.body.data.id}
                        title={post.body.data.title}
                        content={post.body.data.text}
                        lang={{
                            btn: lang.getCustomProp('modules.actions.edit'),
                            btnCancel: lang.getCustomProp('modules.actions.cancel'),
                            btnSubmit: lang.getCustomProp('modules.actions.save-changes'),
                            h1: lang.getProp('edit-h1'),
                            label: lang.getProp('new-label'),
                            labelContent: lang.getProp('new-label-content'),
                        }}
                    />
                    <Delete id={post.body.data.id} lang={{ btn: lang.getCustomProp('modules.actions.delete') }} />
                </div>
                <h1>{post.body.data.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: sanitize(post.body.data.text) }} />
            </div>
        </article>
    ) : (
        <div className={a.content}>
            <h1 className={a.title}>{lang.getCustomProp('modules.errors.header')}</h1>
            <p>{lang.getCustomProp('modules.errors.session')}</p>
        </div>
    );
}
