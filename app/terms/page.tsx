export const dynamic = 'force-dynamic';
import o from '@sass/article.module.sass';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { getUser } from '@util/helpers/User';
import { headers } from 'next/headers';

export async function generateMetadata() {
    const user = await getUser();
    const lang = await new LanguageHandler('documents/terms-of-service', user).init(headers());

    return {
        title: `${lang.getProp('title')} | Nove`,
        description: 'Read about our Terms of Service and learn what we can do with your account and what you are allowed to do.',
        openGraph: {
            title: `${lang.getProp('title')} | Nove`,
            description: 'Read about our Terms of Service and learn what we can do with your account and what you are allowed to do.',
        },
        twitter: {
            title: `${lang.getProp('title')} | Nove`,
            description: `Read about our Terms of Service and learn what we can do with your account and what you are allowed to do.`,
        },
    };
}

export default async function Terms() {
    const user = await getUser();
    const lang = await new LanguageHandler('documents/terms-of-service', user).init(headers());

    return (
        <article className={o.content}>
            <h1>{lang.getProp('title')}</h1>
            <h2 dangerouslySetInnerHTML={{ __html: lang.getProp('last-modified') }} />
            <p>{lang.getProp('p1')}</p>
            <p>{lang.getProp('p2')}</p>
            <p>{lang.getProp('p3')}</p>
            <ul>
                <li>{lang.getProp('li-1')}</li>
                <li>{lang.getProp('li-2')}</li>
                <li>{lang.getProp('li-3')}</li>
                <li>{lang.getProp('li-4')}</li>
                <li>
                    {lang.getProp('li-5')}
                    <ul>
                        <li>{lang.getProp('li-5-li-1')}</li>
                        <li>{lang.getProp('li-5-li-2')}</li>
                        <li>{lang.getProp('li-5-li-3')}</li>
                    </ul>
                </li>
                <li>{lang.getProp('li-6')}</li>
            </ul>
            <p>{lang.getProp('p4')}</p>
            <p>{lang.getProp('p5')}</p>
        </article>
    );
}
