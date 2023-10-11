import o from '@sass/about.module.sass';
import Image from 'next/image';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { axiosClient } from '@util/axios';
import { cookies, headers } from 'next/headers';
import { Response, User } from '@util/schema';

export const metadata = {
    title: 'Nove | About',
    description: 'Our goal is to make the Internet more private and safer. Meet our team and learn more about us.',
    openGraph: {
        title: 'Nove | About',
        description: 'Our goal is to make the Internet more private and safer. Meet our team and learn more about us.',
        images: [],
    },
    twitter: {
        title: 'Nove | About',
        description: 'Our goal is to make the Internet more private and safer. Meet our team and learn more about us.',
        images: [],
    },
    keywords: ['nove', 'about nove', 'about'],
};

export default async function About() {
    const user: Response<User> = (
        await axiosClient
            .get('/v1/users/me', {
                headers: { Authorization: `Owner ${cookies()?.get('napiAuthorizationToken')?.value}` },
            })
            .catch((e) => e.response)
    )?.data;

    const lang = await new LanguageHandler('main/about', user?.body?.data).init(headers());

    return (
        <section className={o.hero}>
            <title>{`Nove | ${lang.getProp('title')}`}</title>
            <h1 className={o.title} dangerouslySetInnerHTML={{ __html: lang.getProp('hero-h1') }} />
            <p className={o.desc}>{lang.getProp('hero-p')}</p>
            <ul>
                <li>
                    <Image src="https://api.nove.team/v1/users/00000000/avatar.webp" width="64" height="64" alt="Avatar" />
                    <h1>wnm210</h1>
                    <p>{lang.getProp('pos1')}</p>
                </li>
                <li>
                    <Image src="https://api.nove.team/v1/users/00000001/avatar.webp" width="64" height="64" alt="Avatar" />
                    <h1>Dawid</h1>
                    <p>{lang.getProp('pos2')}</p>
                </li>
                <li>
                    <Image src="https://api.nove.team/v1/users/00000002/avatar.webp" width="64" height="64" alt="Avatar" />
                    <h1>ArsBeneMoriendi</h1>
                    <p>{lang.getProp('pos3')}</p>
                </li>
                <li>
                    <Image src="https://api.nove.team/v1/users/OzcH9li3/avatar.webp" width="64" height="64" alt="Avatar" />
                    <h1>SlavistaPL</h1>
                    <p>{lang.getProp('pos4')}</p>
                </li>
                <li>
                    <Image src="https://api.nove.team/v1/users/b9dk4Pdm/avatar.webp" width="64" height="64" alt="Avatar" />
                    <h1>JuzioMiecio520</h1>
                    <p>{lang.getProp('pos5')}</p>
                </li>
            </ul>
        </section>
    );
}
