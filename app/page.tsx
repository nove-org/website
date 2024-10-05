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

import NAPI from '@util/NAPI';
import LanguageHandler from '@util/languages';
import Link from 'next/link';
import o from './Home.module.sass';
import { cookies, headers } from 'next/headers';
import { DONATE_LINK, ENABLE_REGISTER_PAGE, OFFICIAL_LANDING } from '@util/CONSTS';
import Image from 'next/image';
import banner from '../public/banner.png';
import eagle from '../public/eagle.png';

export async function generateMetadata() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: false });
    const lang = await new LanguageHandler('main/landing', user).init(headers());
    const title: string = `${lang.getProp('title')} | Nove`;
    const description: string =
        "Truly free and open source software for your day-to-day tasks. A great alternative to big tech with focus on design and users' privacy. This is us, this is Nove.";

    return {
        title,
        description,
        openGraph: { title, description },
        twitter: { card: 'summary_large_image', title, description },
    };
}

export default async function Home() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: false });
    const lang = await new LanguageHandler('main/landing', user).init(headers());

    return OFFICIAL_LANDING ? (
        <>
            <section className={o.hero}>
                <figure className={o.background}>
                    <Image className={o.eagle} src={eagle} alt="Eagle" />
                    <Image className={o.mountains} src={banner} alt="Mountainous landscape" priority />
                </figure>
                <div className={o.attribution}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M 19.482422 2.0058594 C 18.868574 1.9915414 18.249155 2.192726 17.753906 2.6132812 A 1.0001 1.0001 0 0 0 17.751953 2.6152344 L 8.3789062 10.615234 A 1.0001 1.0001 0 0 0 8.3203125 10.667969 C 7.9401303 11.048151 7.749803 11.551289 7.7441406 12.056641 C 6.7948776 12.094998 5.8649059 12.457923 5.1621094 13.224609 C 4.7030913 13.725356 4.4103292 14.348544 4.0703125 15.107422 C 3.7302958 15.8663 3.3965424 16.733841 3.0976562 17.560547 C 2.4998841 19.21396 2.0429687 20.708984 2.0429688 20.708984 A 1.0001 1.0001 0 0 0 3.2773438 21.960938 C 3.2773438 21.960938 4.7752791 21.530148 6.4335938 20.943359 C 7.262751 20.649965 8.1338056 20.318263 8.8984375 19.970703 C 9.6630694 19.623143 10.300401 19.31288 10.806641 18.806641 C 11.512656 18.100625 11.887063 17.190234 11.958984 16.267578 C 12.464062 16.260355 12.966543 16.067655 13.345703 15.6875 A 1.0001 1.0001 0 0 0 13.398438 15.628906 L 21.392578 6.2402344 A 1.0001 1.0001 0 0 0 21.398438 6.234375 C 22.103009 5.3938552 22.01447 4.2763512 21.496094 3.3632812 A 1.0001 1.0001 0 0 0 21.181641 2.6933594 A 1.0001 1.0001 0 0 0 21.181641 2.6914062 C 20.706254 2.2485471 20.09627 2.0201774 19.482422 2.0058594 z M 19.435547 3.9960938 C 19.571089 3.9995614 19.705747 4.0531447 19.816406 4.15625 C 20.046562 4.3725474 20.068483 4.7067505 19.865234 4.9492188 L 14.394531 11.373047 L 12.634766 9.6132812 L 19.048828 4.1367188 C 19.16358 4.039274 19.300005 3.9926261 19.435547 3.9960938 z M 11.107422 10.914062 L 13.09375 12.900391 L 11.925781 14.271484 L 9.7382812 12.083984 L 11.107422 10.914062 z M 7.9785156 14.035156 C 8.484248 14.049476 9.006494 14.254162 9.4238281 14.636719 C 10.201008 15.349133 10.219383 16.565773 9.3925781 17.392578 C 9.2988171 17.486338 8.7494306 17.839747 8.0703125 18.148438 C 7.3911944 18.457128 6.5614677 18.775035 5.765625 19.056641 C 5.143343 19.276833 5.0772593 19.281794 4.5761719 19.441406 C 4.7432123 18.936798 4.751237 18.868877 4.9785156 18.240234 C 5.2671295 17.441941 5.587673 16.6087 5.8945312 15.923828 C 6.2013896 15.238956 6.5457368 14.675425 6.6367188 14.576172 C 6.9835763 14.197782 7.4727833 14.02084 7.9785156 14.035156 z"></path>
                    </svg>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: lang.getProp('hero-attribution', {
                                author: `<a rel="noreferrer noopener nofollow" href="https://mastodon.social/@orbite">Orbite</a>`,
                                link: `<a rel="noreferrer noopener nofollow" href="https://ko-fi.com/orbitelambda">Ko-Fi</a>`,
                            }),
                        }}
                    />
                </div>
                <div className={o.text}>
                    <h1 dangerouslySetInnerHTML={{ __html: lang.getProp('hero-h1') }} />
                    <p>{lang.getProp('hero-description')}</p>
                    <div className={o.buttons}>
                        {DONATE_LINK && (
                            <Link href={DONATE_LINK} className={`btn ${o.highlight}`}>
                                {lang.getCustomProp('modules.navigation.ul-donate')}
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M16.256,3.005C13.515,3.117,12,5.09,12,5.09s-1.515-1.973-4.256-2.085C5.906,2.93,4.221,3.845,3.111,5.312 c-3.862,5.104,3.45,11.075,5.17,12.678c1.029,0.959,2.299,2.098,3.057,2.773c0.379,0.338,0.944,0.338,1.323,0 c0.758-0.675,2.028-1.814,3.057-2.773c1.72-1.603,9.033-7.574,5.17-12.678C19.779,3.845,18.094,2.93,16.256,3.005z"></path>
                                </svg>
                            </Link>
                        )}
                        <Link href={user ? '/account' : ENABLE_REGISTER_PAGE ? '/register' : '/login'} className="btn">
                            {user
                                ? lang.getCustomProp('dashboard.layout.ul-profile')
                                : ENABLE_REGISTER_PAGE
                                  ? lang.getProp('hero-btn')
                                  : lang.getCustomProp('modules.navigation.login-btn')}
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M 14 4.9296875 L 12.5 6.4296875 L 17.070312 11 L 3 11 L 3 13 L 17.070312 13 L 12.5 17.570312 L 14 19.070312 L 21.070312 12 L 14 4.9296875 z"></path>
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className={o.attention}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M 11 3 L 11 17.070312 L 6.4296875 12.5 L 4.9296875 14 L 12 21.070312 L 19.070312 14 L 17.570312 12.5 L 13 17.070312 L 13 3 L 11 3 z"></path>
                    </svg>
                </div>
            </section>
        </>
    ) : (
        <section className={o.welcome}>
            <h1>{lang.getProp('welcome-h1')}</h1>
            <p>{lang.getProp('welcome-p')}</p>
            <div className={o.buttons}>
                {DONATE_LINK && (
                    <Link href={DONATE_LINK} className={`btn ${o.highlight}`}>
                        {lang.getCustomProp('modules.navigation.ul-donate')}
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M16.256,3.005C13.515,3.117,12,5.09,12,5.09s-1.515-1.973-4.256-2.085C5.906,2.93,4.221,3.845,3.111,5.312 c-3.862,5.104,3.45,11.075,5.17,12.678c1.029,0.959,2.299,2.098,3.057,2.773c0.379,0.338,0.944,0.338,1.323,0 c0.758-0.675,2.028-1.814,3.057-2.773c1.72-1.603,9.033-7.574,5.17-12.678C19.779,3.845,18.094,2.93,16.256,3.005z"></path>
                        </svg>
                    </Link>
                )}
                <Link href={user ? '/account' : ENABLE_REGISTER_PAGE ? '/register' : '/login'} className="btn">
                    {user
                        ? lang.getCustomProp('dashboard.layout.ul-profile')
                        : ENABLE_REGISTER_PAGE
                          ? lang.getProp('hero-btn')
                          : lang.getCustomProp('modules.navigation.login-btn')}
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M 14 4.9296875 L 12.5 6.4296875 L 17.070312 11 L 3 11 L 3 13 L 17.070312 13 L 12.5 17.570312 L 14 19.070312 L 21.070312 12 L 14 4.9296875 z"></path>
                    </svg>
                </Link>
            </div>
        </section>
    );
}
