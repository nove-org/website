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

import NAPI from '@util/helpers/NAPI';
import LanguageHandler from '@util/handlers/LanguageHandler';
import o from './Home.module.sass';
import { cookies, headers } from 'next/headers';
import Link from 'next/link';
import Image from 'next/image';
import { ENABLE_REGISTER_PAGE, OFFICIAL_LANDING } from '@util/CONSTS';

export async function generateMetadata() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const lang = await new LanguageHandler('main/landing', user).init(headers());
    const title: string = `${lang.getProp('title')} | Nove`;
    const description: string = 'Ditch the government, Google, Facebook and others that share data, profile and track you. Take back control over this.';

    return {
        title,
        description,
        openGraph: { title, description },
        twitter: { card: 'summary_large_image', title, description },
    };
}

export default async function Home() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const lang = await new LanguageHandler('main/landing', user).init(headers());

    return OFFICIAL_LANDING ? (
        <>
            <section className={o.hero}>
                <div className={o.text}>
                    <h1 dangerouslySetInnerHTML={{ __html: lang.getProp('hero-h1') }} />
                    <p>{lang.getProp('hero-description')}</p>
                    <div className={o.buttons}>
                        {process.env.DONATE_LINK && (
                            <Link href={process.env.DONATE_LINK} className={`btn ${o.highlight}`}>
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
                <aside className={o.block}>
                    <div className={o.server}>
                        {lang.getProp('instance')} 1
                        <div className={o.actions}>
                            <h1>{lang.getProp('action-log')}</h1>
                            <ul>
                                <li className={o.action}>
                                    <img src="https://api.nove.team/v1/users/00000000/avatar.webp" alt="wnm210's avatar" width={20} height={20} />
                                    <div dangerouslySetInnerHTML={{ __html: lang.getProp('action-upload', { user: 'wnm210', file: '<strong>backup.sql</strong>' }) }} />
                                </li>
                                <li className={o.action + ' ' + o.nd}>
                                    <img src="https://api.nove.team/v1/users/00000001/avatar.webp" alt="dawid's avatar" width={20} height={20} />
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: lang.getProp('action-view', {
                                                user: `<span>
                                        Dawid<i>@${lang.getProp('instance').toLowerCase()}-2</i>
                                    </span>`,
                                                file: '<strong>backup.sql</strong>',
                                            }),
                                        }}
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                </aside>
            </section>
            <section className={o.decentralization}>
                <div className={o.spheres}>
                    <div className={o.origin}>
                        <div className={o.bubble}>
                            <img src="https://api.nove.team/v1/users/00000002/avatar.webp" width={36} height={36} />
                            <span className={o.holo}>
                                @ars<i>@{lang.getProp('instance').toLowerCase()}-4</i>
                            </span>
                        </div>
                    </div>
                    <div className={o.origin}>
                        <div className={o.bubble}>
                            <img src="https://api.nove.team/v1/users/OzcH9li3/avatar.webp" width={36} height={36} />
                            <span className={o.holo}>
                                @slavistapl<i>@{lang.getProp('instance').toLowerCase()}-3</i>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={o.text}>
                    <h1 dangerouslySetInnerHTML={{ __html: lang.getProp('decentralization-h1') }} />
                    <p>{lang.getProp('decentralization-p')}</p>
                    <div className={o.servers}>
                        <div className={o.server}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M 12 4 A 7.5 7.5 0 0 0 5.3515625 8.0429688 A 6 6 0 0 0 0 14 A 6 6 0 0 0 6 20 L 19 20 A 5 5 0 0 0 24 15 A 5 5 0 0 0 19.34375 10.017578 A 7.5 7.5 0 0 0 12 4 z"></path>
                            </svg>
                            <div className={o.progressBackwards}>
                                <div className={o.line}></div>
                            </div>
                            <div className={o.badge}>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M 19.28125 5.28125 L 9 15.5625 L 4.71875 11.28125 L 3.28125 12.71875 L 8.28125 17.71875 L 9 18.40625 L 9.71875 17.71875 L 20.71875 6.71875 Z"></path>
                                </svg>
                                {lang.getProp('online')}
                            </div>
                        </div>
                        <div className={o.server}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M 12 4 A 7.5 7.5 0 0 0 5.3515625 8.0429688 A 6 6 0 0 0 0 14 A 6 6 0 0 0 6 20 L 19 20 A 5 5 0 0 0 24 15 A 5 5 0 0 0 19.34375 10.017578 A 7.5 7.5 0 0 0 12 4 z"></path>
                            </svg>
                            <div className={o.progressBackwards}>
                                <div className={o.line}></div>
                            </div>
                            <div className={o.badge}>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M 19.28125 5.28125 L 9 15.5625 L 4.71875 11.28125 L 3.28125 12.71875 L 8.28125 17.71875 L 9 18.40625 L 9.71875 17.71875 L 20.71875 6.71875 Z"></path>
                                </svg>
                                {lang.getProp('online')}
                            </div>
                        </div>
                        <div className={o.server}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M 12 4 A 7.5 7.5 0 0 0 5.3515625 8.0429688 A 6 6 0 0 0 0 14 A 6 6 0 0 0 6 20 L 19 20 A 5 5 0 0 0 24 15 A 5 5 0 0 0 19.34375 10.017578 A 7.5 7.5 0 0 0 12 4 z"></path>
                            </svg>
                            <div className={o.progressBackwards}>
                                <div className={o.line}></div>
                            </div>
                            <div className={o.badge}>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M 19.28125 5.28125 L 9 15.5625 L 4.71875 11.28125 L 3.28125 12.71875 L 8.28125 17.71875 L 9 18.40625 L 9.71875 17.71875 L 20.71875 6.71875 Z"></path>
                                </svg>
                                {lang.getProp('online')}
                            </div>
                        </div>
                    </div>
                </div>
                <aside className={o.block}>
                    <div className={o.server + ' ' + o.nd}>Instance 2</div>
                </aside>
            </section>
            <section className={o.why}>
                <div className={o.text}>
                    <h1>{lang.getProp('word-h1')}</h1>
                    <p>{lang.getProp('word-p')}</p>
                </div>
                <ul className={o.whys}>
                    <li className={o.card}>
                        <figure className={o.encryption}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M 12 1 C 8.6761905 1 6 3.6761905 6 7 L 6 8 C 4.9 8 4 8.9 4 10 L 4 20 C 4 21.1 4.9 22 6 22 L 18 22 C 19.1 22 20 21.1 20 20 L 20 10 C 20 8.9 19.1 8 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 8 8 L 8 7 C 8 4.7238095 9.7238095 3 12 3 z M 12 13 C 13.1 13 14 13.9 14 15 C 14 16.1 13.1 17 12 17 C 10.9 17 10 16.1 10 15 C 10 13.9 10.9 13 12 13 z"></path>
                            </svg>
                            <div className={o.st}>Hey! How are you?</div>
                            <div className={o.nd}>#$*%#$*!@#&*#$%*!</div>
                            <div className={o.rd}>!-!$.*&#=!%-#%*$#</div>
                        </figure>
                        <div className={o.content}>
                            <h1>{lang.getProp('word-card1-title')}</h1>
                            <p>{lang.getProp('word-card1-description')}</p>
                        </div>
                    </li>
                    <li className={o.card}>
                        <figure className={o.tracking}>
                            <div className={o.cross}>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="54" height="54" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M 10 2 C 5.589 2 2 5.589 2 10 C 2 14.411 5.589 18 10 18 C 14.411 18 18 14.411 18 10 C 18 5.589 14.411 2 10 2 z M 9.7128906 4.0136719 L 9.7128906 5.0273438 C 9.3738906 5.0703438 7.4765625 5.42875 7.4765625 7.71875 C 7.4765625 11.05975 10.935547 10.069828 10.935547 12.298828 C 10.935547 13.414828 10.213406 13.441406 10.066406 13.441406 C 9.9324062 13.441406 9.0527344 13.512688 9.0527344 11.804688 L 7.1621094 11.804688 C 7.1621094 14.696687 9.2602656 14.927703 9.5722656 14.970703 L 9.5722656 15.978516 C 6.462797 15.757912 4 13.164763 4 10 C 4 6.7878034 6.5375172 4.1647918 9.7128906 4.0136719 z M 10.720703 4.0488281 C 13.69045 4.4063489 16 6.9352803 16 10 C 16 13.11536 13.614798 15.680867 10.574219 15.970703 L 10.574219 14.970703 C 10.912219 14.928703 12.824219 14.613156 12.824219 12.285156 C 12.824219 9.0801563 9.3662344 9.6935625 9.3652344 7.7265625 C 9.3652344 6.5995625 9.9851406 6.5644531 10.119141 6.5644531 C 10.364141 6.5644531 10.947266 6.7812969 10.947266 8.1542969 L 12.837891 8.1542969 C 12.837891 5.5272969 11.041703 5.1176406 10.720703 5.0566406 L 10.720703 4.0488281 z M 19.892578 8.6074219 C 19.956578 9.0644219 20 9.526 20 10 C 20 10.774 19.903328 11.523094 19.736328 12.246094 C 19.906328 12.801094 20 13.39 20 14 C 20 17.309 17.309 20 14 20 C 13.39 20 12.801094 19.906328 12.246094 19.736328 C 11.523094 19.903328 10.774 20 10 20 C 9.526 20 9.0644219 19.956578 8.6074219 19.892578 C 10.031422 21.196578 11.921 22 14 22 C 18.411 22 22 18.411 22 14 C 22 11.921 21.196578 10.031422 19.892578 8.6074219 z"></path>
                                </svg>
                            </div>
                        </figure>
                        <div className={o.content}>
                            <h1>{lang.getProp('word-card2-title')}</h1>
                            <p>{lang.getProp('word-card2-description')}</p>
                        </div>
                    </li>
                    <li className={o.card}>
                        <figure className={o.free}>
                            <p>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M 3.9902344 2.9902344 A 1.0001 1.0001 0 0 0 3 4.1289062 L 3 16 A 1.0001 1.0001 0 0 0 3.2929688 16.707031 L 7.2050781 20.619141 A 1.0001 1.0001 0 0 0 8.1582031 21 L 20 21 A 1.0001 1.0001 0 0 0 21 20 L 21 8.1679688 A 1.0001 1.0001 0 0 0 20.623047 7.2070312 A 1.0001 1.0001 0 0 0 20.617188 7.203125 L 16.707031 3.2929688 A 1.0001 1.0001 0 0 0 16 3 L 4.1171875 3 A 1.0001 1.0001 0 0 0 3.9902344 2.9902344 z M 6.4140625 5 L 15.585938 5 L 17.585938 7 L 8.4140625 7 L 6.4140625 5 z M 5 6.4140625 L 7 8.4140625 L 7 17.585938 L 5 15.585938 L 5 6.4140625 z M 9 9 L 19 9 L 19 19 L 9 19 L 9 9 z"></path>
                                </svg>
                                Compiling from source...
                            </p>
                            <div className={o.progress}></div>
                        </figure>
                        <div className={o.content}>
                            <h1>{lang.getProp('word-card3-title')}</h1>
                            <p>{lang.getProp('word-card3-description')}</p>
                        </div>
                    </li>
                </ul>
            </section>
            <section className={o.community}>
                <div></div>
                <div className={o.text}>
                    <h1>{lang.getProp('breakup-h1')}</h1>
                    <p dangerouslySetInnerHTML={{ __html: lang.getProp('breakup-description') }} />
                    <ul>
                        <li>{lang.getProp('breakup-li-1')}</li>
                        <li>{lang.getProp('breakup-li-2')}</li>
                        <li>{lang.getProp('breakup-li-3')}</li>
                    </ul>
                </div>
            </section>
            <section className={o.call}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="64" height="64" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M 12 1 L 3 5 L 3 11 C 3 18.83 9.439 22.486 12 23 C 14.561 22.486 21 18.83 21 11 L 21 5 L 12 1 z M 12 3.1894531 L 19 6.3007812 L 19 11 C 19 12.835656 18.566184 14.395755 17.90625 15.707031 C 16.345706 14.530951 13.524154 14 12 14 C 10.475819 14 7.6533017 14.530907 6.09375 15.707031 C 5.4338159 14.395755 5 12.835656 5 11 L 5 6.3007812 L 12 3.1894531 z M 12 5.75 C 10.208 5.75 8.75 7.208 8.75 9 C 8.75 10.792 10.208 12.25 12 12.25 C 13.792 12.25 15.25 10.792 15.25 9 C 15.25 7.208 13.792 5.75 12 5.75 z M 12 7.75 C 12.689 7.75 13.25 8.311 13.25 9 C 13.25 9.689 12.689 10.25 12 10.25 C 11.311 10.25 10.75 9.689 10.75 9 C 10.75 8.311 11.311 7.75 12 7.75 z M 12 16 C 14.446733 16 15.977702 16.719961 16.908203 17.314453 C 15.340222 19.376141 13.256661 20.550006 12 20.9375 C 10.743339 20.550006 8.6597782 19.376141 7.0917969 17.314453 C 8.0222976 16.719961 9.5532669 16 12 16 z"></path>
                </svg>
                <h1>{lang.getProp('ready-h1')}</h1>
                <p>{lang.getProp('ready-p')}</p>
                <Link href="/register" className="btn">
                    {lang.getProp('ready-btn')}
                </Link>
            </section>
        </>
    ) : (
        <section className={o.welcome}>
            <h1>{lang.getProp('welcome-h1')}</h1>
            <p>{lang.getProp('welcome-p')}</p>
            <div className={o.buttons}>
                {process.env.DONATE_LINK && (
                    <Link href={process.env.DONATE_LINK} className={`btn ${o.highlight}`}>
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
