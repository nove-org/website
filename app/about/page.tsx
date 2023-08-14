import o from '@sass/about.module.sass';
import Image from 'next/image';

export default function About() {
    return (
        <section className={o.hero}>
            <title>About — Nove</title>
            <h1 className={o.title}>
                Our <b>goal</b> is to make the Internet <span>cleaner</span> and <span>safer</span>.
            </h1>
            <p className={o.desc}>We provide tools free from bloatware, trackers, and annoying advertisements. With free &amp; open-source policy.</p>
            <ul>
                <li>
                    <Image src="https://api.nove.team/v1/users/b9dk4Pdm/avatar.webp" width="64" height="64" alt="Avatar" />
                    <h1>JuzioMiecio520</h1>
                    <p>CEO and back-end developer</p>
                </li>
                <li>
                    <Image src="https://api.nove.team/v1/users/00000000/avatar.webp" width="64" height="64" alt="Avatar" />
                    <h1>wnm210</h1>
                    <p>CEO, front-end developer and UI/UX designer</p>
                </li>
                <li>
                    <Image src="https://api.nove.team/v1/users/00000001/avatar.webp" width="64" height="64" alt="Avatar" />
                    <h1>Dawid</h1>
                    <p>Back-end developer, code maintainer</p>
                </li>
                <li>
                    <Image src="https://api.nove.team/v1/users/00000002/avatar.webp" width="64" height="64" alt="Avatar" />
                    <h1>ArsBeneMoriendi</h1>
                    <p>UI/UX designer and project manager</p>
                </li>
            </ul>
        </section>
    );
}
