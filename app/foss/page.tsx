export const dynamic = 'force-dynamic';
import o from '@sass/foss.module.sass';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { headers } from 'next/headers';
import { getUser } from '@util/helpers/User';

export async function generateMetadata() {
    const lang = await new LanguageHandler('main/foss', await getUser()).init(headers());
    const title: string = `${lang.getCustomProp('modules.footer.ul-foss')} | Nove`;
    const description: string = 'List of our projects that are FOSS. Learn about our free and open-source software nature.';

    return {
        title,
        description,
        openGraph: { title, description },
        twitter: { title, description },
    };
}

export default async function FOSS() {
    const lang = await new LanguageHandler('main/foss', await getUser()).init(headers());

    return (
        <section className={o.hero}>
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
