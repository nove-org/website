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
import { ENABLE_REGISTER_PAGE } from '@util/CONSTS';

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

    return (
        <>
            <section className={o.hero}>
                <div className={o.text}>
                    <h1 dangerouslySetInnerHTML={{ __html: lang.getProp('hero-h1') }} />
                    <p>{lang.getProp('hero-description')}</p>
                    <div className={o.buttons}>
                        {process.env.DONATE_LINK && (
                            <Link href={process.env.DONATE_LINK} className={`btn ${o.highlight}`}>
                                Donate
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M16.256,3.005C13.515,3.117,12,5.09,12,5.09s-1.515-1.973-4.256-2.085C5.906,2.93,4.221,3.845,3.111,5.312 c-3.862,5.104,3.45,11.075,5.17,12.678c1.029,0.959,2.299,2.098,3.057,2.773c0.379,0.338,0.944,0.338,1.323,0 c0.758-0.675,2.028-1.814,3.057-2.773c1.72-1.603,9.033-7.574,5.17-12.678C19.779,3.845,18.094,2.93,16.256,3.005z"></path>
                                </svg>
                            </Link>
                        )}
                        <Link href={user ? '/account' : ENABLE_REGISTER_PAGE ? '/register' : '/login'} className="btn">
                            {user ? 'My profile' : ENABLE_REGISTER_PAGE ? 'Sign up today' : 'Log in'}
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
                        Instance 1
                        <div className={o.actions}>
                            <h1>Action Log</h1>
                            <ul>
                                <li className={o.action}>
                                    <img src="https://api.nove.team/v1/users/00000000/avatar.webp" alt="wnm210's avatar" width={20} height={20} />
                                    wnm210 uploaded <strong>backup.sql</strong>
                                </li>
                                <li className={o.action + ' ' + o.nd}>
                                    <img src="https://api.nove.team/v1/users/00000001/avatar.webp" alt="dawid's avatar" width={20} height={20} />
                                    <span>
                                        Dawid<i>@instance-2</i>
                                    </span>{' '}
                                    viewed <strong>backup.sql</strong>
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
                                @ars<i>@instance-4</i>
                            </span>
                        </div>
                    </div>
                    <div className={o.origin}>
                        <div className={o.bubble}>
                            <img src="https://api.nove.team/v1/users/OzcH9li3/avatar.webp" width={36} height={36} />
                            <span className={o.holo}>
                                @slavistapl<i>@instance-3</i>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={o.text}>
                    <h1>
                        Because <strong>decentralization</strong> is the future.
                    </h1>
                    <p>All of our services are made with decentralization and self-hosting in mind. So you can run your own instance easily if you don't want or can't trust us.</p>
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
                                Online
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
                                Online
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
                                Online
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
                    <h1>With all the great features you expect, and more...</h1>
                    <p>Including the modern design, intuitive user interface and accessibility options.</p>
                </div>
                <ul>
                    <li>
                        <img src="/secure.jpg" width="285" height="110" alt="Image shows how encryption works (simplified): abc <---> $2e." />
                        <h1>{lang.getProp('word-card1-title')}</h1>
                        <p>{lang.getProp('word-card1-description')}</p>
                    </li>
                    <li>
                        <img
                            src="/no_tracking.jpg"
                            width="285"
                            height="110"
                            alt="Image shows a car with tinted windows following another car at a distance. Scissors cut the road between the cars."
                        />
                        <h1>{lang.getProp('word-card2-title')}</h1>
                        <p>{lang.getProp('word-card2-description')}</p>
                    </li>
                    <li>
                        <img
                            src="/donations.jpg"
                            width="285"
                            height="110"
                            alt="Image shows two buttons. On the left a download button with an expand arrow to the right. On the right donate button with a coin icon to the right."
                        />
                        <h1>{lang.getProp('word-card3-title')}</h1>
                        <p>{lang.getProp('word-card3-description')}</p>
                    </li>
                </ul>
            </section>
            <section className={o.community}>
                <aside className={o.code}>
                    <div className={o.editor}>
                        <div className={o.committer}>
                            <img src="https://api.nove.team/v1/users/00000001/avatar.webp" alt="dawid's avatar" width={48} height={48} />
                            <h1>
                                Dawid-03 <span>committed on Jun 10, 2024</span>
                            </h1>
                            <p>feat: full name and id display</p>
                        </div>
                        <div className={o.navbar}>
                            <div className={o.file}>
                                <img src="/go.png" width={24} alt="Golang logo" />
                                main.go
                            </div>
                            <div className={o.file}>
                                <img src="/go.png" width={24} alt="Golang logo" />
                                api.go
                            </div>
                        </div>
                        <ul className={o.lines}>
                            <li className={o.line}>
                                1 &nbsp;<span className={o.red}>package</span> <span className={o.white}>main</span>
                            </li>
                            <li className={o.line}>2</li>
                            <li className={o.line}>
                                3 &nbsp;<span className={o.red}>func</span> <span className={o.lightblue}>main</span>
                                <span className={o.blue}>()</span> <span className={o.yellow}>{'{'}</span>
                            </li>
                            <li className={o.line}>
                                4 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={o.white}>name</span> <span className={o.red}>:=</span> <span className={o.white}>fmt.</span>
                                <span className={o.lightblue}>ReadLine</span>
                                <span className={o.blue}>()</span>
                            </li>
                            <li className={o.line}>
                                5 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={o.white}>user</span> <span className={o.red}>:=</span> <span className={o.lightblue}>GetUser</span>
                                <span className={o.blue}>
                                    (<span className={o.white}>name</span>)
                                </span>
                            </li>
                            <li className={o.line}>6</li>
                            <li className={o.line + ' ' + o.highlight}>
                                7 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={o.white}>fmt.</span>
                                <span className={o.lightblue}>Println</span>
                                <span className={o.blue}>(</span>
                                <span className={o.white}>user.Id</span>
                                <span className={o.blue}>)</span>
                            </li>
                            <li className={o.line + ' ' + o.highlight}>
                                8 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={o.white}>fmt.</span>
                                <span className={o.lightblue}>Println</span>
                                <span className={o.blue}>(</span>
                                <span className={o.white}>user.FullName</span>
                                <span className={o.blue}>)</span>
                            </li>
                            <li className={o.line}>
                                9 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={o.white}>fmt.</span>
                                <span className={o.lightblue}>Println</span>
                                <span className={o.blue}>(</span>
                                <span className={o.white}>user.PermissionLevel</span>
                                <span className={o.blue}>)</span>
                            </li>
                            <li className={o.line}>10 &nbsp;&nbsp;&nbsp;&nbsp;...</li>
                        </ul>
                    </div>
                </aside>
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
                <h1>{lang.getProp('ready-h1')}</h1>
                <p>{lang.getProp('ready-p')}</p>
                <Link href="/register" className="btn">
                    {lang.getProp('ready-btn')}
                </Link>
            </section>
        </>
    );
}
