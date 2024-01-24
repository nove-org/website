export const dynamic = 'force-dynamic';
import o from '@sass/article.module.sass';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { getUser } from '@util/helpers/User';
import { headers } from 'next/headers';

export async function generateMetadata() {
    const lang = await new LanguageHandler('documents/terms-of-service', await getUser()).init(headers());
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
    const lang = await new LanguageHandler('documents/terms-of-service', await getUser()).init(headers());

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
