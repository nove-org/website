/* 
 Tool to manage your Nove account through NAPI
 Copyright (C) 2019 Nove Group

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

export const dynamic = 'force-dynamic';
import o from '@sass/page.module.sass';
import Link from 'next/link';
import { DONATE_LINK, REPOSITORY } from '@util/CONSTS';
import Image from 'next/image';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { headers } from 'next/headers';
import { getUser } from '@util/helpers/User';

export async function generateMetadata() {
    const lang = await new LanguageHandler('main/landing', await getUser()).init(headers());
    const title: string = `${lang.getProp('title')} | Nove`;
    const description: string = 'Ditch the government, Google, Facebook and others that share data, profile and track you. Take back control over this.';
    const images: { url: string; alt: string; width: number; height: number }[] = [
        {
            url: '/banner.png',
            alt: 'Campaign banner filled with text from the title and description. "your privacy" highlighted in brand color (gradient pink-red).',
            width: 860,
            height: 470,
        },
    ];

    return {
        title,
        description,
        openGraph: { title, description, images },
        twitter: { card: 'summary_large_image', title, description, images },
    };
}

export default async function Home() {
    const user = await getUser();
    const lang = await new LanguageHandler('main/landing', user).init(headers());

    return (
        <>
            <section className={o.hero}>
                <h1 dangerouslySetInnerHTML={{ __html: lang.getProp('hero-h1') }} />
                <p>{lang.getProp('hero-description')}</p>
                <ul>
                    <li>
                        <a href="/register" className={o.button}>
                            {!user?.username ? lang.getProp('hero-btn') : lang.getCustomProp('dashboard.layout.ul-profile')}
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 30 30">
                                <path
                                    fill="currentColor"
                                    d="M 9.9902344 3.9902344 A 1.0001 1.0001 0 0 0 9.2929688 5.7070312 L 18.585938 15 L 9.2929688 24.292969 A 1.0001 1.0001 0 1 0 10.707031 25.707031 L 20.707031 15.707031 A 1.0001 1.0001 0 0 0 20.707031 14.292969 L 10.707031 4.2929688 A 1.0001 1.0001 0 0 0 9.9902344 3.9902344 z"></path>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href={DONATE_LINK} className={o.button}>
                            {lang.getCustomProp('modules.navigation.ul-donate')}
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M16.256,3.005C13.515,3.117,12,5.09,12,5.09s-1.515-1.973-4.256-2.085C5.906,2.93,4.221,3.845,3.111,5.312 c-3.862,5.104,3.45,11.075,5.17,12.678c1.029,0.959,2.299,2.098,3.057,2.773c0.379,0.338,0.944,0.338,1.323,0 c0.758-0.675,2.028-1.814,3.057-2.773c1.72-1.603,9.033-7.574,5.17-12.678C19.779,3.845,18.094,2.93,16.256,3.005z"></path>
                            </svg>
                        </a>
                    </li>
                </ul>
            </section>

            <section className={o.word}>
                <h1>{lang.getProp('word-h1')}</h1>
                <ul>
                    <li>
                        <Image src="/secure.jpg" width="285" height="110" alt="Image shows how encryption works (simplified): abc <---> $2e." />
                        <div className={o.content}>
                            <h1>{lang.getProp('word-card1-title')}</h1>
                            <p>{lang.getProp('word-card1-description')}</p>
                        </div>
                    </li>
                    <li>
                        <Image
                            src="/no_tracking.jpg"
                            width="285"
                            height="110"
                            alt="Image shows a car with tinted windows following another car at a distance. Scissors cut the road between the cars."
                        />
                        <div className={o.content}>
                            <h1>{lang.getProp('word-card2-title')}</h1>
                            <p>{lang.getProp('word-card2-description')}</p>
                        </div>
                    </li>
                    <li>
                        <Image
                            src="/donations.jpg"
                            width="285"
                            height="110"
                            alt="Image shows two buttons. On the left a download button with an expand arrow to the right. On the right donate button with a coin icon to the right."
                        />

                        <div className={o.content}>
                            <h1>{lang.getProp('word-card3-title')}</h1>
                            <p>{lang.getProp('word-card3-description')}</p>
                        </div>
                    </li>
                </ul>
                <p>
                    {lang.getProp('word-trust') + ' '}
                    <a className={o.link} target="_blank" rel="noopener noreferrer" href={REPOSITORY}>
                        Gitea
                    </a>
                    .
                </p>
            </section>

            <section className={o.breakup}>
                <aside>
                    <h1>{lang.getProp('breakup-h1')}</h1>
                    <p dangerouslySetInnerHTML={{ __html: lang.getProp('breakup-description') }}></p>
                    <ul>
                        <li>{lang.getProp('breakup-li-1')}</li>
                        <li>{lang.getProp('breakup-li-2')}</li>
                        <li>{lang.getProp('breakup-li-3')}</li>
                    </ul>
                </aside>
                <Image src="/contributing_light.png" width={530} height={560} alt="How contributing works" className={o.light} />
                <Image src="/contributing_dark.png" width={530} height={560} alt="How contributing works" className={o.dark} />
            </section>

            <section className={o.ready}>
                <h1>{lang.getProp('ready-h1')}</h1>
                <p>{lang.getProp('ready-p')}</p>
                <Link href="/register">
                    {!user?.username ? lang.getProp('ready-btn') : lang.getCustomProp('dashboard.layout.ul-profile')}
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 30 30">
                        <path
                            fill="currentColor"
                            d="M 9.9902344 3.9902344 A 1.0001 1.0001 0 0 0 9.2929688 5.7070312 L 18.585938 15 L 9.2929688 24.292969 A 1.0001 1.0001 0 1 0 10.707031 25.707031 L 20.707031 15.707031 A 1.0001 1.0001 0 0 0 20.707031 14.292969 L 10.707031 4.2929688 A 1.0001 1.0001 0 0 0 9.9902344 3.9902344 z"></path>
                    </svg>
                </Link>
            </section>
        </>
    );
}
