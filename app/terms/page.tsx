import o from '../Blog.module.sass';
import LanguageHandler from '@util/handlers/LanguageHandler';
import NAPI from '@util/helpers/NAPI';
import { cookies, headers } from 'next/headers';

export async function generateMetadata() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const lang = await new LanguageHandler('documents/terms-of-service', user).init(headers());
    const title: string = `${lang.getProp('title')} | Nove`;
    const description: string = 'Read about our Terms of Service and learn what we can do with your account and what you are allowed to do.';

    return {
        title,
        description,
        openGraph: { title, description },
        twitter: { title, description },
    };
}

export default async function Terms() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const lang = await new LanguageHandler('documents/terms-of-service', user).init(headers());

    return (
        <article className={o.blog}>
            <div className={o.text}>
                <h1>{lang.getProp('title')}</h1>
                <time>
                    {lang.getProp('last-modified', {
                        time: new Date(2024, 6, 12).toLocaleString(user?.language || 'en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
                    })}
                </time>
                <div>
                    <p>{lang.getProp('s1-p1')}</p>
                    <p>{lang.getProp('s1-p2')}</p>

                    <h2>{lang.getProp('s2')}</h2>
                    <ul>
                        <li dangerouslySetInnerHTML={{ __html: lang.getProp('u1-l1') }} />
                        <li>{lang.getProp('u1-l2')}</li>
                        <li dangerouslySetInnerHTML={{ __html: lang.getProp('u1-l3') }} />
                        <li>{lang.getProp('u1-l4')}</li>
                        <li>{lang.getProp('u1-l5')}</li>
                        <li>{lang.getProp('u1-l6')}</li>
                        <li>{lang.getProp('u1-l7')}</li>
                    </ul>

                    <h2>{lang.getProp('s3')}</h2>
                    <p dangerouslySetInnerHTML={{ __html: lang.getProp('s3-p1') }} />
                    <ul>
                        <li dangerouslySetInnerHTML={{ __html: lang.getProp('u2-l1') }} />
                        <li>{lang.getProp('u2-l2')}</li>
                        <li>{lang.getProp('u2-l3')}</li>
                    </ul>
                </div>
            </div>
        </article>
    );
}
