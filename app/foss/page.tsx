import o from '@sass/foss.module.sass';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { axiosClient } from '@util/axios';
import { cookies, headers } from 'next/headers';

export const metadata = {
    title: 'Nove | FOSS projects',
    description: 'List of our projects that are FOSS. Learn about our free and open-source software nature.',
    openGraph: {
        title: 'Nove | Free and open-source projects',
        description: 'List of our projects that are FOSS. Learn about our free and open-source software nature.',
        images: [],
    },
    twitter: {
        title: 'Nove | Free and open-source projects',
        description: `List of our projects that are FOSS. Learn about our free and open-source software nature.`,
        images: [],
    },
    keywords: ['nove', 'foss', 'open source'],
};

export default async function FOSS() {
    const user = await axiosClient
        .get('/v1/users/me', {
            headers: { Authorization: `Owner ${cookies()?.get('napiAuthorizationToken')?.value}` },
        })
        .catch((e) => e.response);

    const browserLanguage: string | undefined = headers().get('Accept-Language')?.split(',')[0];
    const lang = await new LanguageHandler('main/foss', user.data.body.data).init(browserLanguage);

    return (
        <section className={o.hero}>
            <title>{`Nove | ${lang.getProp('title')}`}</title>
            <h1 className={o.title} dangerouslySetInnerHTML={{ __html: lang.getProp('hero-h1') }} />{' '}
            <p className={o.desc} dangerouslySetInnerHTML={{ __html: lang.getProp('hero-p') }} />
            <ul>
                <li>
                    <a target="_blank" rel="noopener noreferrer" href="https://git.nove.team/nove-org/NAPI">
                        <h1>NAPI</h1>
                        <p>{lang.getProp('ul-napi')}</p>
                    </a>
                </li>
                <li>
                    <a target="_blank" rel="noopener noreferrer" href="https://git.nove.team/nove-org/website">
                        <h1>Manager</h1>
                        <p>{lang.getProp('ul-manager')}</p>
                    </a>
                </li>
                <li>
                    <a target="_blank" rel="noopener noreferrer" href="https://git.nove.team/nove-org/files.backend">
                        <h1>Files</h1>
                        <p>{lang.getProp('ul-files')}</p>
                    </a>
                </li>
            </ul>
        </section>
    );
}
