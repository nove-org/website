export const dynamic = 'force-dynamic';
import a from '@sass/account/part.module.sass';
import b from '@sass/blog.module.sass';
import { headers } from 'next/headers';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { sanitize } from 'isomorphic-dompurify';
import Edit from './Edit';
import Back from './Back';
import Delete from './Delete';
import { getUser } from '@util/helpers/User';
import { getPost } from '@util/helpers/Blog';

export default async function Blog({ params }: { params: { id: string } }) {
    const user = await getUser();
    const post = await getPost(params.id);
    const lang = await new LanguageHandler('admin/posts', user).init(headers());

    return user?.username ? (
        <article className={b.blog}>
            <div className={b.content}>
                <div className={b.flex}>
                    <Back
                        lang={{
                            btn: lang.getCustomProp('modules.actions.back'),
                        }}
                    />
                    <Edit
                        id={post.id}
                        title={post.title}
                        content={post.text}
                        lang={{
                            btn: lang.getCustomProp('modules.actions.edit'),
                            btnCancel: lang.getCustomProp('modules.actions.cancel'),
                            btnSubmit: lang.getCustomProp('modules.actions.save-changes'),
                            h1: lang.getProp('edit-h1'),
                            label: lang.getProp('new-label'),
                            labelContent: lang.getProp('new-label-content'),
                        }}
                    />
                    <Delete id={post.id} lang={{ btn: lang.getCustomProp('modules.actions.delete') }} />
                </div>
                <h1>{post.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: sanitize(post.text) }} />
            </div>
        </article>
    ) : (
        <div className={a.content}>
            <h1 className={a.title}>{lang.getCustomProp('modules.errors.header')}</h1>
            <p>{lang.getCustomProp('modules.errors.session')}</p>
        </div>
    );
}
