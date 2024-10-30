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
import mountains from '../public/mountains.png';
import lake from '../public/lake.png';
import eagle from '../public/eagle.png';
import island from '../public/island.png';
import encourage from '../public/encourage.png';
import HomeRepo from './HomeRepo';
import HomeApp from './HomeApp';

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

    const applications = [
        { link: 'procurel.com', theme: o.blue },
        { link: 'peekr.org', theme: o.green },
    ];

    const repositories = [
        'git.nove.team/nove-org/NAPI',
        'git.nove.team/nove-org/website',
        'git.nove.team/peekr/frontend',
        'git.nove.team/peekr/python-crawler',
        'git.nove.team/nove-org/crm.frontend',
        'git.nove.team/nove-org/crm.backend',
        'git.nove.team/nove-org/gsm',
        'git.nove.team/tasks/frontend',
        'git.nove.team/tasks/backend',
    ];

    return OFFICIAL_LANDING ? (
        <>
            <section className={o.hero}>
                <figure className={o.background}>
                    <Image className={o.eagle} src={eagle} alt="Eagle" />
                    <Image className={o.mountains} src={mountains} alt="Mountainous landscape" priority />
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
            <figure className={o.background + ' ' + o.detached}>
                <Image className={o.mountains} src={lake} alt="Mountainous landscape with a lake" priority />
            </figure>
            <section className={o.applications}>
                <div className={o.text}>
                    <h1>Applications that actually make your life easier.</h1>
                    <p>With the power of open-source software, beautiful layout and design, our community and, of course, you.</p>
                    <ul className={o.applications}>
                        {applications.map((app) => (
                            <HomeApp key={app.link} link={app.link} className={app.theme} />
                        ))}
                        <li>
                            <div className={o.more}>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M15.5 5L13 11 7 13.5 13 16 15.5 22 18 16 24 13.5 18 11 15.5 5zM4.125 7.875L5.5 12 6.875 7.875 11 6.5 6.875 5.125 5.5 1 4.125 5.125 0 6.5zM6.375 18.625L5.5 16 4.625 18.625 2 19.5 4.625 20.375 5.5 23 6.375 20.375 9 19.5z"></path>
                                </svg>
                                More coming soon...
                            </div>
                        </li>
                    </ul>
                    <ul className={o.repositories}>
                        {repositories.map((repo) => (
                            <HomeRepo key={repo} link={repo} />
                        ))}
                    </ul>
                </div>
            </section>
            <section className={o.community}>
                <Image src={island} alt="island" width={900} />
                <div className={o.text}>
                    <svg className={o.header} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M12,1L3,5c0,0,0,4,0,6c0,7.83,6.439,11.486,9,12c2.561-0.514,9-4.17,9-12c0-2,0-6,0-6L12,1z M19,11 c0,6.134-4.785,9.254-7,9.937C9.785,20.254,5,17.134,5,11V6.3l7-3.111L19,6.3V11z"></path>
                    </svg>
                    <h1>Because trust begins with openness.</h1>
                    <p>
                        Suggest new features, report bugs, improve code or audit it through our <Link href="https://git.nove.team">Gitea</Link>.
                    </p>
                    <div className={o.contributors}>
                        <h2>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M 4 3 C 3.448 3 3 3.448 3 4 L 3 11 L 5 9 L 10 9 C 10 9.552 10.448 10 11 10 L 19 10 L 21 12 L 21 5 C 21 4.448 20.552 4 20 4 L 14 4 C 14 3.448 13.552 3 13 3 L 4 3 z M 5 5 L 12 5 L 12 7 L 5 7 L 5 5 z M 14 6 L 19 6 L 19 8 L 14 8 L 14 6 z M 7 12 A 2 2 0 0 0 5 14 A 2 2 0 0 0 7 16 A 2 2 0 0 0 9 14 A 2 2 0 0 0 7 12 z M 17 12 A 2 2 0 0 0 15 14 A 2 2 0 0 0 17 16 A 2 2 0 0 0 19 14 A 2 2 0 0 0 17 12 z M 7 18 C 5.665 18 3 18.67 3 20 L 3 21 L 11 21 L 11 20 C 11 18.67 8.335 18 7 18 z M 17 18 C 15.665 18 13 18.67 13 20 L 13 21 L 21 21 L 21 20 C 21 18.67 18.335 18 17 18 z"></path>
                            </svg>
                            With help from over 13 contributors
                        </h2>
                        <ul>
                            <li>
                                <Image src="https://api.nove.team/v1/users/00000000/avatar.webp" width={48} height={48} alt="Avatar" />
                            </li>
                            <li>
                                <Image src="https://api.nove.team/v1/users/00000001/avatar.webp" width={48} height={48} alt="Avatar" />
                            </li>
                            <li>
                                <Image src="https://api.nove.team/v1/users/00000002/avatar.webp" width={48} height={48} alt="Avatar" />
                            </li>
                            <li>
                                <Image src="https://api.nove.team/v1/users/alexyell/avatar.webp" width={48} height={48} alt="Avatar" />
                            </li>
                            <li>
                                <Image src="https://api.nove.team/v1/users/y6SEEEVc/avatar.webp" width={48} height={48} alt="Avatar" />
                            </li>
                            <li>
                                <Image src="https://api.nove.team/v1/users/c6IRqw0I/avatar.webp" width={48} height={48} alt="Avatar" />
                            </li>
                            <li>
                                <Image src="https://api.nove.team/v1/users/DaHGttJg/avatar.webp" width={48} height={48} alt="Avatar" />
                            </li>
                            <li>
                                <Image src="https://api.nove.team/v1/users/eWdAiosV/avatar.webp" width={48} height={48} alt="Avatar" />
                            </li>
                            <li>
                                <Image src="https://api.nove.team/v1/users/OzcH9li3/avatar.webp" width={48} height={48} alt="Avatar" />
                            </li>
                            <li>
                                <Image src="https://api.nove.team/v1/users/ZXw4EtgV/avatar.webp" width={48} height={48} alt="Avatar" />
                            </li>
                            <li>
                                <Image src="https://api.nove.team/v1/users/zpPOQO4s/avatar.webp" width={48} height={48} alt="Avatar" />
                            </li>
                            <li>
                                <Image src="https://api.nove.team/v1/users/SXMo6PfT/avatar.webp" width={48} height={48} alt="Avatar" />
                            </li>
                        </ul>
                    </div>
                    <div className={o.buttons}>
                        <Link className="btn" href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M8,5v14l11-7L8,5z M10,8.643L15.275,12L10,15.357V8.643z"></path>
                            </svg>
                            Start contributing*
                        </Link>
                        <Link className="btn" href="https://git.nove.team/nove-org">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M19,3h-4.184C14.403,1.837,13.304,1,12,1S9.597,1.837,9.184,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14 c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M12,3c0.552,0,1,0.448,1,1c0,0.552-0.448,1-1,1s-1-0.448-1-1 C11,3.448,11.448,3,12,3z M9,17H7v-2l6.146-6.146l2,2L9,17z M16.854,9.146l-1,1l-2-2l1-1c0.195-0.195,0.512-0.195,0.707,0 l1.293,1.293C17.049,8.635,17.049,8.951,16.854,9.146z M19,19H5V5h14V19z"></path>
                            </svg>
                            View projects
                        </Link>
                    </div>
                    <p className={o.footnote}>* - Nove account is required to sign up on Gitea.</p>
                </div>
            </section>
            <section className={o.encourage}>
                <Image src={encourage} alt="Gradient-colored circles" />
                <div className={o.overlay}>
                    <svg className={o.header} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="64" height="64" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M 3.9902344 2.9902344 A 1.0001 1.0001 0 0 0 3 4.1289062 L 3 16 C 3 16.266 3.1049687 16.520031 3.2929688 16.707031 L 7.2050781 20.619141 A 1.0001 1.0001 0 0 0 8.1582031 21 L 14 21 L 14 19 L 9 19 L 9 9 L 19 9 L 19 11.111328 L 21 13.035156 L 21 8.1679688 A 1.0001 1.0001 0 0 0 20.623047 7.2070312 A 1.0001 1.0001 0 0 0 20.617188 7.203125 L 16.707031 3.2929688 C 16.520031 3.1049687 16.266 3 16 3 L 4.1171875 3 A 1.0001 1.0001 0 0 0 3.9902344 2.9902344 z M 6.4140625 5 L 15.585938 5 L 17.585938 7 L 8.4140625 7 L 6.4140625 5 z M 5 6.4140625 L 7 8.4140625 L 7 17.585938 L 5 15.585938 L 5 6.4140625 z M 16 11 L 16 21 L 18.273438 18.837891 L 20.306641 23.523438 L 22.353516 22.556641 L 20.291016 18 L 23.273438 18 L 16 11 z"></path>
                    </svg>
                    <h1>Choose the world where your freedom matters.</h1>
                    <p>Start using your favourite open-source tools and applications for free today. Or host it on your own hardware with our deployment guide.</p>
                    <div className={o.buttons}>
                        <Link href="/register" className="btn">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M 12 2 C 6.477 2 2 6.477 2 12 C 2 17.523 6.477 22 12 22 C 17.523 22 22 17.523 22 12 C 22 6.477 17.523 2 12 2 z M 12 4 C 16.418 4 20 7.582 20 12 C 20 13.597292 19.525404 15.081108 18.71875 16.330078 L 17.949219 15.734375 C 16.397219 14.537375 13.537 14 12 14 C 10.463 14 7.6017813 14.537375 6.0507812 15.734375 L 5.28125 16.332031 C 4.4740429 15.082774 4 13.597888 4 12 C 4 7.582 7.582 4 12 4 z M 12 5.75 C 10.208 5.75 8.75 7.208 8.75 9 C 8.75 10.792 10.208 12.25 12 12.25 C 13.792 12.25 15.25 10.792 15.25 9 C 15.25 7.208 13.792 5.75 12 5.75 z M 12 7.75 C 12.689 7.75 13.25 8.311 13.25 9 C 13.25 9.689 12.689 10.25 12 10.25 C 11.311 10.25 10.75 9.689 10.75 9 C 10.75 8.311 11.311 7.75 12 7.75 z M 12 16 C 15.100714 16 16.768095 17.168477 17.548828 17.753906 C 16.109984 19.141834 14.156852 20 12 20 C 9.843148 20 7.8900164 19.141834 6.4511719 17.753906 C 7.231905 17.168477 8.899286 16 12 16 z M 6.0546875 17.339844 C 6.1756559 17.473131 6.297271 17.605851 6.4257812 17.730469 C 6.2971141 17.605286 6.1747276 17.473381 6.0546875 17.339844 z M 17.912109 17.375 C 17.802435 17.495543 17.692936 17.616825 17.576172 17.730469 C 17.692621 17.617521 17.801457 17.494978 17.912109 17.375 z"></path>
                            </svg>
                            Create an account
                        </Link>
                        <Link href="https://git.nove.team/" className="btn">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M 3 1 L 3 3 L 5 3 L 5 1 L 3 1 z M 7 1 L 7 3 L 9 3 L 9 1 L 7 1 z M 11 1 L 11 3 L 13 3 L 13 1 L 11 1 z M 15 1 L 15 3 L 17 3 L 17 1 L 15 1 z M 19 1 L 19 3 L 21 3 L 21 1 L 19 1 z M 4 5 C 2.9069372 5 2 5.9069372 2 7 L 2 17 C 2 18.093063 2.9069372 19 4 19 L 20 19 C 21.093063 19 22 18.093063 22 17 L 22 7 C 22 5.9069372 21.093063 5 20 5 L 4 5 z M 4 7 L 20 7 L 20 17 L 4 17 L 4 7 z M 7 13 A 1 1 0 0 0 6 14 A 1 1 0 0 0 7 15 A 1 1 0 0 0 8 14 A 1 1 0 0 0 7 13 z M 3 21 L 3 23 L 5 23 L 5 21 L 3 21 z M 7 21 L 7 23 L 9 23 L 9 21 L 7 21 z M 11 21 L 11 23 L 13 23 L 13 21 L 11 21 z M 15 21 L 15 23 L 17 23 L 17 21 L 15 21 z M 19 21 L 19 23 L 21 23 L 21 21 L 19 21 z"></path>
                            </svg>
                            Deploy on your hardware
                        </Link>
                    </div>
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
