'use client';

import Image from 'next/image';

import o from '~/about/page.module.sass';

export default function About() {
    return (
        <main>
            <title>About — Nove</title>
            <section className={o.about}>
                <h1 className={o.title}>
                    <span>A</span>bout
                </h1>
                <p className={o.description}>
                    Our <span className={o.orange}>goal</span> is to make the Internet <span>cleaner</span> and <span>safer</span>. We provide tools free from bloatware, trackers,
                    and annoying advertisements. With an open-source policy. We are working since 2019 as a small team of four people. At first, we started with a Discord bot
                    called vave, then we worked on a couple of projects that helped us launch Cheems and will help launch others in 2023 and later. This is who we are, we are Nove.
                </p>
                <h2 className={o.sectionTitle}>Meet the team</h2>
                <div className={o.team}>
                    <div className={o.card}>
                        <Image src="https://api.nove.team/v1/users/00000001/avatar.webp" width={42} height={42} alt="wnm210" />
                        <div className={o.user}>
                            <h1>JuzioMiecio520</h1>
                            <p>Owner and back-end developer</p>
                        </div>
                    </div>
                    <div className={o.card}>
                        <Image src="https://api.nove.team/v1/users/00000000/avatar.webp" width={42} height={42} alt="wnm210" />
                        <div className={o.user}>
                            <h1>wnm210</h1>
                            <p>Owner, web-developer and UI/UX designer</p>
                        </div>
                    </div>
                    <div className={o.card}>
                        <Image src="https://api.nove.team/v1/users/00000002/avatar.webp" width={42} height={42} alt="wnm210" />
                        <div className={o.user}>
                            <h1>Dejwidson</h1>
                            <p>Back-end developer</p>
                        </div>
                    </div>
                    <div className={o.card}>
                        <Image src="https://api.nove.team/v1/users/1empqas0/avatar.webp" width={42} height={42} alt="wnm210" />
                        <div className={o.user}>
                            <h1>ArsBeneMoriendi</h1>
                            <p>UI/UX designer and manager</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
