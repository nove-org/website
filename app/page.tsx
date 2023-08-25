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

import o from '@sass/page.module.sass';
import Link from 'next/link';
import { REPOSITORY } from '@util/config';

export default async function Home() {
    return (
        <>
            <section className={o.hero}>
                <svg className={o.top} width="398" height="414" viewBox="0 0 398 414" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_129_277)">
                        <path d="M398.366 304.581C-87.4477 597.456 169.864 164.052 0.339547 -2.96743" stroke="url(#paint0_linear_129_277)" strokeWidth="3" />
                        <path d="M404.814 320.509C-9.78467 591.199 193.939 164.303 33.9129 -15.5305" stroke="url(#paint1_linear_129_277)" strokeWidth="3" />
                    </g>
                    <defs>
                        <linearGradient id="paint0_linear_129_277" x1="261.774" y1="377.542" x2="104.764" y2="-42.0433" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#DD0B0B" />
                            <stop offset="0.895833" stopColor="#DB3283" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_129_277" x1="287.709" y1="387.056" x2="124.392" y2="-49.3878" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#DD0B0B" />
                            <stop offset="0.895833" stopColor="#DB3283" />
                        </linearGradient>
                        <clipPath id="clip0_129_277">
                            <rect width="398" height="414" fill="white" />
                        </clipPath>
                    </defs>
                </svg>

                <h1>
                    Meet the world where <span>your privacy</span> matters.
                </h1>
                <p>
                    Ditch Google, Facebook and other companies that sell data, profile and track you. Take back control over this and start using our FOSS and privacy-respecting
                    solutions. Currently in beta stage (report any bugs through GitHub or mail).
                </p>
                <ul>
                    <li>
                        <a href="/register" className={o.button}>
                            Sign up today
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 30 30">
                                <path
                                    fill="currentColor"
                                    d="M 9.9902344 3.9902344 A 1.0001 1.0001 0 0 0 9.2929688 5.7070312 L 18.585938 15 L 9.2929688 24.292969 A 1.0001 1.0001 0 1 0 10.707031 25.707031 L 20.707031 15.707031 A 1.0001 1.0001 0 0 0 20.707031 14.292969 L 10.707031 4.2929688 A 1.0001 1.0001 0 0 0 9.9902344 3.9902344 z"></path>
                            </svg>
                        </a>
                    </li>
                    <li>
                        Don&apos;t take our word for this. View the{' '}
                        <a className={o.link} target="_blank" rel="noopener noreferrer" href={REPOSITORY}>
                            code
                        </a>{' '}
                        yourself
                    </li>
                </ul>
            </section>

            <section className={o.word}>
                <svg className={o.top} width="358" height="299" viewBox="0 0 358 299" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_129_277)">
                        <path d="M-43.2459 6.70783C788.803 -14.2173 -33.4171 123.573 -26.9288 336.457" stroke="url(#paint0_linear_129_277)" strokeWidth="3" />
                        <path d="M-11.9686 37.1331C820.08 16.208 -32.979 148.655 -26.4907 361.538" stroke="url(#paint1_linear_129_277)" strokeWidth="3" />
                    </g>
                    <defs>
                        <linearGradient id="paint0_linear_129_277" x1="185.097" y1="8.50555" x2="147.236" y2="422.68" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#DD0B0B" />
                            <stop offset="0.895833" stopColor="#DB3283" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_129_277" x1="216.374" y1="38.9308" x2="178.513" y2="453.106" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#DD0B0B" />
                            <stop offset="0.895833" stopColor="#DB3283" />
                        </linearGradient>
                        <clipPath id="clip0_129_277">
                            <rect width="358" height="299" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                <h1>In our ecosystem, your data belongs to you, and only you.</h1>
                <ul>
                    <li>
                        <h1>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M 6 2 C 4.895 2 4 2.895 4 4 L 4 6 C 4 6.552 4.448 7 5 7 L 19 7 C 19.552 7 20 6.552 20 6 L 20 4 C 20 2.895 19.105 2 18 2 L 6 2 z M 5 9 C 4.448 9 4 9.448 4 10 L 4 14 C 4 14.552 4.448 15 5 15 L 12.605469 15 C 13.516469 13.22 15.364 12 17.5 12 C 18.401 12 19.249 12.221469 20 12.605469 L 20 10 C 20 9.448 19.552 9 19 9 L 5 9 z M 17.5 14 C 15.567 14 14 15.567 14 17.5 C 14 19.433 15.567 21 17.5 21 C 17.965 21 18.4065 20.905234 18.8125 20.740234 L 22.072266 24 L 24 24 L 24 22.072266 L 20.740234 18.8125 C 20.904234 18.4065 21 17.965 21 17.5 C 21 15.567 19.433 14 17.5 14 z M 17 16 C 17.552 16 18 16.448 18 17 C 18 17.552 17.552 18 17 18 C 16.448 18 16 17.552 16 17 C 16 16.448 16.448 16 17 16 z M 5 17 C 4.448 17 4 17.448 4 18 L 4 20 C 4 21.105 4.895 22 6 22 L 14.34375 22 C 12.92775 21.005 12 19.362 12 17.5 C 12 17.331 12.010391 17.165 12.025391 17 L 5 17 z"></path>
                            </svg>
                            Stored securely
                        </h1>
                        <p>We encrypt your data whenever possible to protect it from governments, hackers and tech companies including us.</p>
                    </li>
                    <li>
                        <h1>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M 4.5 2 C 2.57 2 1 3.6583125 1 5.6953125 C 1 7.0983125 3.1363125 11.070234 4.0703125 12.740234 C 4.2643125 13.086234 4.7356875 13.086234 4.9296875 12.740234 C 5.8636875 11.070234 8 7.0983125 8 5.6953125 C 8 3.6583125 6.43 2 4.5 2 z M 19.5 12 C 17.57 12 16 13.658312 16 15.695312 C 16 17.098312 18.136313 21.070234 19.070312 22.740234 C 19.264312 23.086234 19.735688 23.086234 19.929688 22.740234 C 20.863687 21.070234 23 17.098312 23 15.695312 C 23 13.658312 21.43 12 19.5 12 z M 5 15 A 1 1 0 0 0 4 16 A 1 1 0 0 0 5 17 A 1 1 0 0 0 6 16 A 1 1 0 0 0 5 15 z M 9 15 A 1 1 0 0 0 8 16 A 1 1 0 0 0 9 17 A 1 1 0 0 0 10 16 A 1 1 0 0 0 9 15 z M 13 15 A 1 1 0 0 0 12 16 A 1 1 0 0 0 13 17 A 1 1 0 0 0 14 16 A 1 1 0 0 0 13 15 z"></path>
                            </svg>
                            No tracking nor selling
                        </h1>
                        <p>We never track you by default. And, we never sell your data to third-parties. It belongs to you, not to us or them.</p>
                    </li>
                    <li>
                        <h1>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M17.478,14.084c-0.348-0.609-0.89-1.144-1.624-1.603c-0.735-0.46-1.758-0.881-3.068-1.264 c-1.31-0.382-2.251-0.807-2.822-1.276C9.392,9.474,9.106,8.845,9.106,8.056c0-0.85,0.271-1.514,0.813-1.989 c0.541-0.476,1.323-0.713,2.345-0.713c0.979,0,1.758,0.321,2.333,0.964c0.27,0.301,0.476,0.651,0.62,1.05 c0.071,0.199,0.199,0.659,0.206,0.679C15.624,8.649,15.967,9,16.559,9c0.654,0,1.184-0.414,1.184-1.184 c0-0.145-0.031-0.298-0.05-0.388c-0.18-0.896-0.535-1.645-1.067-2.248c-0.804-0.91-1.927-1.455-3.371-1.632L13.25,3.547V2 c0-0.552-0.448-1-1-1s-1,0.448-1,1v1.551C9.858,3.716,8.756,4.19,7.953,4.983C7.132,5.794,6.721,6.832,6.721,8.098 c0,1.243,0.419,2.268,1.257,3.075c0.838,0.806,2.172,1.461,4.002,1.963c1.315,0.394,2.249,0.834,2.804,1.32 c0.553,0.487,0.831,1.085,0.831,1.795c0,0.842-0.323,1.506-0.967,1.992c-0.645,0.486-1.53,0.729-2.656,0.729 c-1.151,0-2.165-0.289-2.792-0.868c-0.422-0.389-0.701-0.89-0.839-1.503c-0.005-0.023-0.078-0.258-0.13-0.355 c-0.196-0.37-0.595-0.619-1.044-0.619C6.532,15.625,6,16.157,6,16.813c0,0.288,0.144,0.696,0.188,0.816 c0.225,0.615,0.59,1.174,1.047,1.625c0.883,0.869,2.225,1.37,3.765,1.517V22c0,0.552,0.447,1,0.999,1s1-0.448,1-1v-1.21l0.025-0.001 c1.572-0.147,2.795-0.617,3.667-1.413C17.563,18.581,18,17.531,18,16.227C18,15.409,17.825,14.694,17.478,14.084z"></path>
                            </svg>
                            Free forever no matter what
                        </h1>
                        <p>Most of our services include free forever plan so you don&apos;t have to trust us on the first place. Start your journey today!</p>
                    </li>
                </ul>
                <p>
                    All of this is easily verifiable, check out our source code. It is open to everyone, view it on{' '}
                    <a className={o.link} target="_blank" rel="noopener noreferrer" href={REPOSITORY}>
                        GitHub
                    </a>
                    .
                </p>
            </section>

            <section className={o.breakup}>
                <aside>
                    <h1>Built by privacy enthusiasts and the community</h1>
                    <p>
                        At Nove, we create open-source and we appreciate any support from the community to our projects. Because <b>privacy and safety</b> goes with{' '}
                        <b>open-source and auditable</b>.
                    </p>
                    <ul>
                        <li>Easily accessible projects through GitHub</li>
                        <li>Contribute by catching bugs, improving the code or suggesting some changes</li>
                        <li>Host your own fork of our software directly on your hardware</li>
                    </ul>
                </aside>
            </section>

            <svg className={o.line} width="114" height="21" viewBox="0 0 114 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1 14.9935C22 5.4935 31.5 3.4935 37.5 3.4935C43.5 3.4935 43 6.9935 47 11.4935C54.9451 20.4317 69.5 -2.60486 82 1.49349C106.4 9.49349 112.5 17.1602 112.5 19.9935"
                    stroke="black"
                    strokeWidth="2"
                />
            </svg>

            <section className={o.ready}>
                <h1>Are you ready to dive into the world of privacy?</h1>
                <p>Start your journey, sign up for free today.</p>
                <Link href="/register">
                    Sign up with just few clicks
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
