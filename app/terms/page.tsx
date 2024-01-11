export const dynamic = 'force-dynamic';
import o from '@sass/article.module.sass';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { getUser } from '@util/helpers/User';
import { headers } from 'next/headers';

export const metadata = {
    title: 'Nove | Terms of Service',
    description: 'Read about our Terms of Service and learn what we can do with your account and what you are allowed to do.',
    openGraph: {
        title: 'Nove | Terms of Service',
        description: 'Read about our Terms of Service and learn what we can do with your account and what you are allowed to do.',
        images: [],
    },
    twitter: {
        title: 'Nove | Terms of Service',
        description: `Read about our Terms of Service and learn what we can do with your account and what you are allowed to do.`,
        images: [],
    },
    keywords: ['nove', 'terms', 'tos', 'terms of service'],
};

export default async function Terms() {
    const user = await getUser();
    const lang = await new LanguageHandler('documents/terms-of-service', user).init(headers());

    return (
        <article className={o.content}>
            <title>{`Nove | ${lang.getProp('title')}`}</title>
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
