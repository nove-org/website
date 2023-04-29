/*

*/

'use client';

import { useState, useEffect } from 'react';
import { Response, User } from './Interfaces';
import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';
import Loader from './loader';
import axios from 'axios';
import config from '@/config.json';

export default function Navigation() {
    const [loading, setLoading] = useState<boolean>(true);
    const [switcher, setSwitcher] = useState<boolean>(false);
    const [data, setData] = useState<Response<User>>();

    useEffect(() => {
        const getData = async () => {
            await axios
                .get('/users/me', {
                    baseURL: config.api,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Owner ${localStorage.getItem('key')}`,
                    },
                })
                .then((res) => (res.data ? setData(res.data) : null, setLoading(false)))
                .catch((err) => (err.response?.data ? setData(err.response.data) : null, setLoading(false)));
        };

        getData();
    }, []);

    return (
        <>
            <Script id="border-nav" strategy="afterInteractive">
                {`const el = document.querySelector(".navBox");
                const observer = new IntersectionObserver(([e]) => e.target.classList.toggle("is-pinned", e.intersectionRatio < 1), { threshold: [1] });
                observer.observe(el);`}
            </Script>
            {switcher ? <div onClick={() => setSwitcher((switcher) => !switcher)} className="background"></div> : null}
            <nav className="navBox">
                <div className="container">
                    <Link href="/">
                        <header>
                            <Image src="/cdn/assets/watermark.png" width={22} height={22} alt="Logo grayscale" />
                            <h1>Nove</h1>
                        </header>
                    </Link>
                    <ul>
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                        <li>
                            <Link href="/docs">Docs</Link>
                        </li>
                        <li>
                            <a href="https://github.com/nove-org/" target="_blank">
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/orgs/nove-org/discussions/categories/announcements" target="_blank">
                                Announcements
                            </a>
                        </li>
                        <li>
                            <Link href="/open-source">Open source</Link>
                        </li>
                        <li>
                            <a>Legal</a>
                        </li>
                    </ul>
                    <ul>
                        {loading ? (
                            <Loader type="classic" />
                        ) : data?.body?.data ? (
                            <figure onClick={() => setSwitcher((switcher) => !switcher)}>
                                <Image src={data.body.data.avatar} width={24} height={24} alt="Account avatar" />
                                {switcher ? (
                                    <div className="switcher">
                                        <header>
                                            <Image src={data.body.data.avatar} width={24} height={24} alt="Account avatar" />
                                            <h1>{data.body.data.username}</h1>
                                        </header>
                                        <ul>
                                            <li>
                                                <Link href="/account">
                                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                                        <path
                                                            fill="currentColor"
                                                            d="M 12 3 A 4 4 0 0 0 8 7 A 4 4 0 0 0 12 11 A 4 4 0 0 0 16 7 A 4 4 0 0 0 12 3 z M 12 14 C 8.996 14 3 15.508 3 18.5 L 3 20 C 3 20.552 3.448 21 4 21 L 20 21 C 20.552 21 21 20.552 21 20 L 21 18.5 C 21 15.508 15.004 14 12 14 z"></path>
                                                    </svg>
                                                    Account
                                                </Link>
                                            </li>
                                            <li>
                                                <a onClick={() => (localStorage.removeItem('key'), window.location.reload())}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                                        <path
                                                            fill="currentColor"
                                                            d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M19.707,12.707 l-3.3,3.3C16.212,16.202,15.956,16.3,15.7,16.3s-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414L16.586,13H9 c-0.553,0-1-0.447-1-1s0.447-1,1-1h7.586l-1.593-1.593c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0l3.3,3.3 C20.098,11.684,20.098,12.316,19.707,12.707z"></path>
                                                    </svg>
                                                    Logout
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                ) : null}
                            </figure>
                        ) : (
                            <>
                                <li className="login">
                                    <Link href="/login">Login</Link>
                                </li>
                                <li className="button">
                                    <Link href="/sign-up">Sign up</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    );
}
