import o from './About.module.sass';
import Image from 'next/image';
import LanguageHandler from '@util/languages';
import { cookies, headers } from 'next/headers';
import NAPI from '@util/NAPI';
import ftdl from '@app/../public/ftdl.webp';
import fastly from '@app/../public/fastly.webp';
import Link from 'next/link';

export async function generateMetadata() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: false });
    const lang = await new LanguageHandler('main/about', user).init(headers());
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
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: false });
    const lang = await new LanguageHandler('main/about', await user).init(headers());

    return (
        <section className={o.hero}>
            <h1 className={o.title} dangerouslySetInnerHTML={{ __html: lang.getProp('hero-h1') }} />
            <p className={o.description}>{lang.getProp('hero-p')}</p>
            <ul className={o.members}>
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
            </ul>
            <div className={o.thanks}>
                <h1>Proudly sponsored by</h1>
                <ul>
                    <li>
                        <Link href="https://ftdl.pl" rel="noreferrer noopener nofollow" target="_blank">
                            <Image src={ftdl} alt="FTdL logo" />
                        </Link>
                    </li>
                    <li>
                        <Link href="https://fastly.com" rel="noreferrer noopener nofollow" target="_blank">
                            <Image src={fastly} alt="Fastly logo" />
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
    );
}
