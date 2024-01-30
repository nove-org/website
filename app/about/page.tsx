export const dynamic = 'force-dynamic';
import o from '@sass/about.module.sass';
import Image from 'next/image';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { headers } from 'next/headers';
import { getUser } from '@util/helpers/User';

export async function generateMetadata() {
    const lang = await new LanguageHandler('main/foss', await getUser()).init(headers());
    const title: string = `${lang.getCustomProp('modules.navigation.ul-about')} | Nove`;
    const description: string = 'Our goal is to make the Internet more private and safer. Meet our team and learn more about us.';

    return {
        title,
        description,
        openGraph: { title, description },
        twitter: { title, description },
    };
}

export default async function About() {
    const lang = await new LanguageHandler('main/about', await getUser()).init(headers());

    return (
        <section className={o.hero}>
            <h1 className={o.title} dangerouslySetInnerHTML={{ __html: lang.getProp('hero-h1') }} />
            <p className={o.desc}>{lang.getProp('hero-p')}</p>
            <ul>
                <li>
                    <Image src="https://api.nove.team/v1/users/00000000/avatar.webp" width="64" height="64" alt="Avatar" />
                    <h1>Mateusz</h1>
                    <p>{lang.getProp('pos1')}</p>
                </li>
                <li>
                    <Image src="https://api.nove.team/v1/users/00000001/avatar.webp" width="64" height="64" alt="Avatar" />
                    <h1>Dawid</h1>
                    <p>{lang.getProp('pos2')}</p>
                </li>
                <li>
                    <Image src="https://api.nove.team/v1/users/00000002/avatar.webp" width="64" height="64" alt="Avatar" />
                    <h1>Zuzia</h1>
                    <p>{lang.getProp('pos3')}</p>
                </li>
                <li>
                    <Image src="https://api.nove.team/v1/users/OzcH9li3/avatar.webp" width="64" height="64" alt="Avatar" />
                    <h1>Oliwier</h1>
                    <p>{lang.getProp('pos4')}</p>
                </li>
                <li>
                    <Image src="https://api.nove.team/v1/users/b9dk4Pdm/avatar.webp" width="64" height="64" alt="Avatar" />
                    <h1>Mikołaj</h1>
                    <p>{lang.getProp('pos5')}</p>
                </li>
            </ul>
        </section>
    );
}
