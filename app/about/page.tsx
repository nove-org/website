import o from '@sass/about.module.sass';
import Image from 'next/image';

export const metadata = {
    title: 'Nove | About',
    description: 'Our goal is to make the Internet more private and safer. Meet our team and learn more about us.',
    openGraph: {
        title: 'Nove | Free and open-source software (FOSS)',
        description: 'Our goal is to make the Internet more private and safer. Meet our team and learn more about us.',
        images: [],
    },
    twitter: {
        title: 'Nove | Free and open-source software (FOSS)',
        description: 'Our goal is to make the Internet more private and safer. Meet our team and learn more about us.',
        images: [],
    },
    keywords: ['nove', 'about nove', 'about'],
};

export default function About() {
    return (
        <section className={o.hero}>
            <title>Nove | About</title>
            <h1 className={o.title}>
                Our <b>goal</b> is to make the Internet <span>more private</span> and <span>safer</span>.
            </h1>
            <p className={o.desc}>We provide tools free from bloatware, trackers, and annoying advertisements. With free &amp; open-source policy.</p>
            <ul>
                <li>
                    <Image src="https://api.nove.team/v1/users/00000000/avatar.webp" width="64" height="64" alt="Avatar" />
                    <h1>wnm210</h1>
                    <p>CEO, front-end developer and UI/UX designer</p>
                </li>
                <li>
                    <Image src="https://api.nove.team/v1/users/00000001/avatar.webp" width="64" height="64" alt="Avatar" />
                    <h1>Dawid</h1>
                    <p>Main back-end developer, code maintainer</p>
                </li>
                <li>
                    <Image src="https://api.nove.team/v1/users/00000002/avatar.webp" width="64" height="64" alt="Avatar" />
                    <h1>ArsBeneMoriendi</h1>
                    <p>UI/UX designer and project manager</p>
                </li>
                <li>
                    <Image src="https://api.nove.team/v1/users/b9dk4Pdm/avatar.webp" width="64" height="64" alt="Avatar" />
                    <h1>JuzioMiecio520</h1>
                    <p>Retired back-end developer</p>
                </li>
            </ul>
        </section>
    );
}
