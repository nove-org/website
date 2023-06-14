'use client';

import { useEffect, useState } from 'react';
import { axiosClient } from '@/utils';
import Image from 'next/image';
import Card from './card';

import o from '~/open-source/page.module.sass';

export default function Projects() {
    const [filesVersion, setFilesVersion] = useState<string>('0.000.0');
    const [jfVersion, setJFVersion] = useState<string>('0.0.0');

    useEffect(() => {
        const fetchVersions = async () => {
            await axiosClient
                .get('https://files-api.nove.team/v1/service/release')
                .then((res) => (res.data.body ? setFilesVersion(res.data.body.data.version) : setFilesVersion('?')))
                .catch(() => setFilesVersion('?'));

            await axiosClient
                .get('https://api.github.com/repos/nove-org/JuzioFont/releases')
                .then((res) => setJFVersion(res.data[0].tag_name))
                .catch(() => setJFVersion('?'));
        };

        fetchVersions();
    }, []);

    return (
        <main>
            <title>Projects — Nove</title>
            <section className={o.projects}>
                <h1 className={o.title}>
                    <span>O</span>pen-source
                </h1>
                <p className={o.description}>
                    Because <span>open-source</span> software takes essential part in working together, protecting users privacy, and ensuring app reliability.
                </p>
                <h2 className={o.sectionTitle}>Projects</h2>
                <div className={o.wrapper}>
                    <Card
                        name="Files"
                        description="Revolutionary file hosting, just as it is. Browse, upload, and share files up to 20MB; increase if needed. Start using Files today."
                        img="/cdn/assets/filesBanner.png"
                        tags={['Beta', 'Open-source']}
                        version={filesVersion}
                        url="https://files.nove.team"
                    />
                    <Card
                        name="JuzioFont"
                        description="Type like a boss. Be like @JuzioMiecio520. First font in the world that everyone will love! Now open-sourced."
                        img="/cdn/assets/juziofont.png"
                        tags={['Open-source']}
                        version={jfVersion}
                        url="https://github.com/nove-org/JuzioFont"
                    />
                    <a>
                        <div className={o.card + ' ' + o.light}>
                            <figure>
                                <h1>NAPI Auth</h1>
                            </figure>
                            <h1>NAPI Auth</h1>
                            <p className={o.text}>
                                Create new account or login with ease to websites with NAPI system hooked. Are you a developer? Go to docs and read more about implementing NAPI to
                                your app.
                            </p>
                            <div className={o.tags}>
                                <div className={o.tag}>Beta</div>
                                <div className={o.version}>0.1.0</div>
                            </div>
                        </div>
                    </a>
                </div>
                <h2 className={o.sectionTitle}>Follow us on GitHub</h2>
                <ul className={o.links}>
                    <a href="https://github.com/nove-org/" target="_blank">
                        <li>
                            <Image src="/cdn/assets/logo.png" width={28} height={28} alt="Logo" />
                            <header>
                                <h1>Nove</h1>
                                <p>github.com/nove-org</p>
                            </header>
                        </li>
                    </a>
                    <a href="https://github.com/justvave/" target="_blank">
                        <li>
                            <Image src="/cdn/assets/vave.png" width={28} height={28} alt="Logo" />
                            <header>
                                <h1>vave</h1>
                                <p>github.com/justvave</p>
                            </header>
                        </li>
                    </a>
                </ul>
            </section>
        </main>
    );
}
