export const dynamic = 'force-dynamic';
import o from '@sass/article.module.sass';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { getUser } from '@util/helpers/User';
import { headers } from 'next/headers';

export async function generateMetadata() {
    const lang = await new LanguageHandler('documents/privacy-policy', await getUser()).init(headers());
    const title: string = `${lang.getProp('title')} | Nove`;
    const description: string = 'Learn how we process information about you and what we are allowed to know.';

    return {
        title,
        description,
        openGraph: { title, description },
        twitter: { title, description },
    };
}

export default async function Privacy() {
    const lang = await new LanguageHandler('documents/privacy-policy', await getUser()).init(headers());

    return (
        <article className={o.content}>
            <h1>{lang.getProp('title')}</h1>
            <h2 dangerouslySetInnerHTML={{ __html: lang.getProp('last-modified') }}></h2>
            <p>{lang.getProp('p1')}</p>
            <p>{lang.getProp('p2')}</p>
            <p>{lang.getProp('p3')}</p>

            <h2>{lang.getProp('inf-header')}</h2>
            <p dangerouslySetInnerHTML={{ __html: lang.getProp('inf-p1') }} />
            <p>{lang.getProp('inf-p2')}</p>
            <ul>
                <li>{lang.getProp('inf-li-1')}</li>
                <li>{lang.getProp('inf-li-2')}</li>
                <li>{lang.getProp('inf-li-3')}</li>
                <li>{lang.getProp('inf-li-4')}</li>
                <li>{lang.getProp('inf-li-5')}</li>
                <li>{lang.getProp('inf-li-6')}</li>
                <li>{lang.getProp('inf-li-7')}</li>
                <li>{lang.getProp('inf-li-8')}</li>
                <li>{lang.getProp('inf-li-9')}</li>
                <li>{lang.getProp('inf-li-10')}</li>
                <li>{lang.getProp('inf-li-11')}</li>
            </ul>
            <p>{lang.getProp('inf-p3')}</p>
            <p>{lang.getProp('inf-p4')}</p>
            <p>{lang.getProp('inf-p5')}</p>

            <h2>{lang.getProp('drp-header')}</h2>
            <p>{lang.getProp('drp-p1')}</p>
            <p>{lang.getProp('drp-p2')}</p>
            <p>{lang.getProp('drp-p3')}</p>
            <p>{lang.getProp('drp-p4')}</p>
            <p>{lang.getProp('drp-p5')}</p>
            <p>{lang.getProp('drp-p6')}</p>
            <p>{lang.getProp('drp-p7')}</p>
        </article>
    );
}
