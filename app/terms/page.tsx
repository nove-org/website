import o from '@sass/article.module.sass';
import { axiosClient } from '@util/axios';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { Response, User } from '@util/schema';
import { cookies, headers } from 'next/headers';

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
    const user: Response<User> = (
        await axiosClient
            .get('/v1/users/me', {
                headers: { Authorization: `Owner ${cookies()?.get('napiAuthorizationToken')?.value}` },
            })
            .catch((e) => e.response)
    )?.data;

    const browserLanguage: string | undefined = headers().get('Accept-Language')?.split(',')[0];
    const lang = await new LanguageHandler('documents/terms-of-service', user?.body?.data).init(browserLanguage);

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
