'use client';

import Image from 'next/image';
import Link from 'next/link';
import o from './AccountLayout.module.sass';
import { Post, User } from '@util/helpers/Schema';
import { usePathname, useRouter } from 'next/navigation';

export default function Sidebar({
    user,
    blog,
    lang,
}: {
    user?: User;
    blog: Post[];
    lang: {
        header: string;
        overview: string;
        oauth2: string;
        security: string;
        profile: string;
        language: string;
        headerAdmin: string;
        users: string;
        posts: string;
        logs: string;
        latestNews: string;
        logout: string;
    };
}) {
    const router = useRouter();
    const pathname = usePathname();
    const halloween = new Date().getMonth() == 9 && new Date().getDate() == 31;

    if (!user) router.replace('/login?redirectBack=' + pathname);

    const links = [
        {
            label: lang.overview,
            path: '/account',
            d: 'M 5 2 C 3.347656 2 2 3.347656 2 5 L 2 17 C 2 18.652344 3.347656 20 5 20 L 7.375 20 L 15.65625 21.9375 C 15.878906 21.988281 16.09375 22 16.3125 22 C 17.679688 22 18.929688 21.042969 19.25 19.65625 L 21.9375 7.96875 C 22.304688 6.355469 21.265625 4.742188 19.65625 4.375 L 15.5625 3.4375 C 15.035156 2.582031 14.078125 2 13 2 Z M 5 4 L 13 4 C 13.550781 4 14 4.449219 14 5 L 14 17 C 14 17.550781 13.550781 18 13 18 L 5 18 C 4.449219 18 4 17.550781 4 17 L 4 5 C 4 4.449219 4.449219 4 5 4 Z M 16 5.59375 L 19.21875 6.3125 C 19.757813 6.433594 20.089844 6.996094 19.96875 7.53125 L 17.28125 19.21875 C 17.15625 19.753906 16.621094 20.089844 16.09375 19.96875 L 14.46875 19.59375 C 15.375 19.078125 16 18.117188 16 17 Z M 9 6 C 9 6 5 9.238281 5 11.0625 C 5 12.277344 5.988281 13.28125 7.1875 13.28125 C 7.605469 13.28125 8.019531 13.132813 8.375 12.90625 L 7.65625 15 L 10.34375 15 L 9.625 12.9375 C 9.953125 13.148438 10.351563 13.28125 10.8125 13.28125 C 12.011719 13.28125 13 12.277344 13 11.0625 C 13 9.242188 9 6 9 6 Z',
            admin: false,
        },
        {
            label: lang.oauth2,
            path: '/account/oauth2',
            d: 'M 11 2 L 11 3 L 6 3 C 4.897 3 4 3.897 4 5 L 4 20 C 4 21.103 4.897 22 6 22 L 13.757812 22 L 11.757812 20 L 6 20 L 6 5 L 11 5 L 11 6 L 13 6 L 13 5 L 18 5 L 18 17.757812 L 20 15.757812 L 20 5 C 20 3.897 19.103 3 18 3 L 13 3 L 13 2 L 11 2 z M 12 9 A 2 2 0 0 0 10 11 A 2 2 0 0 0 12 13 A 2 2 0 0 0 14 11 A 2 2 0 0 0 12 9 z M 12 14 C 9.815 14 8 14.908797 8 16.216797 L 8 17 L 16 17 L 16 16.216797 C 16 14.908797 14.185 14 12 14 z M 22.292969 16.292969 L 18 20.585938 L 15.707031 18.292969 L 14.292969 19.707031 L 18 23.414062 L 23.707031 17.707031 L 22.292969 16.292969 z',
            admin: false,
        },
        {
            label: lang.security,
            path: '/account/security',
            d: 'M 12 1 L 3 5 L 3 11 C 3 18.83 9.439 22.486 12 23 C 14.561 22.486 21 18.83 21 11 L 21 5 L 12 1 z M 12 3.1894531 L 19 6.3007812 L 19 11 C 19 17.134 14.215 20.2545 12 20.9375 C 9.785 20.2545 5 17.134 5 11 L 5 6.3007812 L 12 3.1894531 z M 16.792969 7.7949219 L 11 13.585938 L 8.2285156 10.814453 L 6.8144531 12.228516 L 11 16.414062 L 18.205078 9.2070312 L 16.792969 7.7949219 z',
            admin: false,
        },
        {
            label: lang.profile,
            path: '/account/profile',
            d: halloween
                ? 'M 12 2 C 7.075285 2 3 5.7814669 3 10.5 C 3 11.874168 3.3880168 13.153187 4 14.294922 L 4 16 C 4 17.093063 4.9069372 18 6 18 L 7 18 L 7 20 C 7 21.093063 7.9069372 22 9 22 L 15 22 C 16.093063 22 17 21.093063 17 20 L 17 18 L 18 18 C 19.093063 18 20 17.093063 20 16 L 20 14.294922 C 20.611983 13.153187 21 11.874168 21 10.5 C 21 5.7814669 16.924715 2 12 2 z M 12 4 C 15.911285 4 19 6.9345331 19 10.5 C 19 11.625516 18.687454 12.673054 18.138672 13.601562 L 18 13.837891 L 18 16 L 15 16 L 15 20 L 9 20 L 9 16 L 6 16 L 6 13.837891 L 5.8613281 13.601562 C 5.3125457 12.673055 5 11.625516 5 10.5 C 5 6.9345331 8.088715 4 12 4 z M 9 11 A 2 2 0 0 0 7 13 A 2 2 0 0 0 9 15 A 2 2 0 0 0 11 13 A 2 2 0 0 0 9 11 z M 15 11 A 2 2 0 0 0 13 13 A 2 2 0 0 0 15 15 A 2 2 0 0 0 17 13 A 2 2 0 0 0 15 11 z M 12 15.400391 C 11.5 15.500391 10.699219 16.8 10.699219 17.5 C 10.699219 17.8 10.999219 18 11.199219 18 C 11.599219 18 11.9 17.600781 12 17.300781 C 12.1 17.600781 12.300781 18 12.800781 18 C 13.100781 18 13.300781 17.8 13.300781 17.5 C 13.300781 16.8 12.5 15.500391 12 15.400391 z'
                : 'M 12 2 C 6.477 2 2 6.477 2 12 C 2 17.523 6.477 22 12 22 C 17.523 22 22 17.523 22 12 C 22 6.477 17.523 2 12 2 z M 12 4 C 16.418 4 20 7.582 20 12 C 20 16.418 16.418 20 12 20 C 7.582 20 4 16.418 4 12 C 4 7.582 7.582 4 12 4 z M 8.5 8 A 1.5 1.5 0 0 0 7 9.5 A 1.5 1.5 0 0 0 8.5 11 A 1.5 1.5 0 0 0 10 9.5 A 1.5 1.5 0 0 0 8.5 8 z M 15.5 8 A 1.5 1.5 0 0 0 14 9.5 A 1.5 1.5 0 0 0 15.5 11 A 1.5 1.5 0 0 0 17 9.5 A 1.5 1.5 0 0 0 15.5 8 z M 6.890625 14 C 7.690625 16.04 9.67 17.5 12 17.5 C 14.33 17.5 16.309375 16.04 17.109375 14 L 6.890625 14 z',
            admin: false,
        },
        {
            label: lang.language,
            path: '/account/language',
            d: 'M 12 2 C 8.741068 2 5.8486894 3.5773875 4.0214844 6 L 4 6 L 4 6.0273438 C 2.7499527 7.6966931 2 9.7603852 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 15 4.5839844 C 17.935098 5.7673596 20 8.6326468 20 12 C 20 14.087831 19.200587 15.978318 17.898438 17.400391 C 17.642583 16.590687 16.894567 16 16 16 C 15.448 16 15 15.552 15 15 L 15 13 C 15 12.448 14.552 12 14 12 L 10 12 C 9.448 12 9 11.552 9 11 C 9 10.448 9.448 10 10 10 C 10.552 10 11 9.552 11 9 L 11 8 C 11 7.448 11.448 7 12 7 L 13 7 C 14.105 7 15 6.105 15 5 L 15 4.5839844 z M 4.2070312 10.207031 L 9 15 L 9 16 C 9 17.105 9.895 18 11 18 L 11 19.931641 C 7.0457719 19.441154 4 16.090654 4 12 C 4 11.382188 4.0755242 10.784034 4.2070312 10.207031 z',
            admin: false,
        },
        {
            label: lang.users,
            path: '/account/users',
            d: 'M 12 3 C 9.794 3 8 4.794 8 7 C 8 9.206 9.794 11 12 11 C 14.206 11 16 9.206 16 7 C 16 4.794 14.206 3 12 3 z M 12 5 C 13.103 5 14 5.897 14 7 C 14 8.103 13.103 9 12 9 C 10.897 9 10 8.103 10 7 C 10 5.897 10.897 5 12 5 z M 18 13 C 15.2 13 13 15.2 13 18 C 13 20.8 15.2 23 18 23 C 19 23 20.000781 22.699219 20.800781 22.199219 L 22.599609 24 L 24 22.599609 L 22.199219 20.800781 C 22.699219 20.000781 23 19 23 18 C 23 15.2 20.8 13 18 13 z M 12 14 C 8.859 14 3 15.546 3 18.5 L 3 21 L 11.683594 21 C 11.387594 20.378 11.181078 19.707 11.080078 19 L 5 19 L 5 18.5 C 5 17.693 8.1951094 16.231391 11.287109 16.025391 C 11.501109 15.295391 11.830859 14.617813 12.255859 14.007812 C 12.170859 14.005813 12.081 14 12 14 z M 18 15 C 19.7 15 21 16.3 21 18 C 21 19.7 19.7 21 18 21 C 16.3 21 15 19.7 15 18 C 15 16.3 16.3 15 18 15 z',
            admin: true,
        },
        {
            label: lang.posts,
            path: '/account/posts',
            d: 'M 4 4 C 2.895 4 2 4.895 2 6 L 2 18 C 2 19.105 2.895 20 4 20 L 20 20 C 21.105 20 22 19.105 22 18 L 22 6 C 22 4.895 21.105 4 20 4 L 4 4 z M 4 6 L 20 6 L 20 7.0019531 L 12 12 L 4 7.0019531 L 4 6 z M 4 9.0019531 L 12 14 L 20 9.0019531 L 20 18 L 4 18 L 4 9.0019531 z',
            admin: true,
        },
        {
            label: lang.logs,
            path: '/account/logs',
            d: 'M 3 3 L 3 5 L 4 5 L 20 5 L 21 5 L 21 3 L 20 3 L 4 3 L 3 3 z M 5 7 C 3.897 7 3 7.897 3 9 L 3 11 C 3 12.103 3.897 13 5 13 L 7 13 C 8.103 13 9 12.103 9 11 L 9 9 C 9 7.897 8.103 7 7 7 L 5 7 z M 11 7 L 11 9 L 12 9 L 20 9 L 21 9 L 21 7 L 20 7 L 12 7 L 11 7 z M 5 9 L 7 9 L 7 11 L 5 11 L 5 9 z M 11 11 L 11 13 L 12 13 L 17 13 L 18 13 L 18 11 L 17 11 L 12 11 L 11 11 z M 5 15 C 3.897 15 3 15.897 3 17 L 3 19 C 3 20.103 3.897 21 5 21 L 7 21 C 8.103 21 9 20.103 9 19 L 9 17 C 9 15.897 8.103 15 7 15 L 5 15 z M 11 15 L 11 17 L 12 17 L 20 17 L 21 17 L 21 15 L 20 15 L 12 15 L 11 15 z M 5 17 L 7 17 L 7 19 L 5 19 L 5 17 z M 11 19 L 11 21 L 12 21 L 17 21 L 18 21 L 18 19 L 17 19 L 12 19 L 11 19 z',
            admin: true,
        },
    ];
    return user ? (
        <aside className={o.navigation}>
            <div className={o.top}>
                <div className={o.header}>
                    <Link href="/">
                        <Image src="/logo_w.png" width={28} height={28} alt="Nove logo" />
                    </Link>
                    <span>{lang.header}</span>
                </div>
                <div className={o.links}>
                    {links
                        .filter((v) => !v.admin)
                        .map((link) => (
                            <Link key={link.path} href={link.path} className={pathname === link.path ? o.active : ''}>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 24 24">
                                    <path fill="currentColor" d={link.d}></path>
                                </svg>
                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
                            </Link>
                        ))}
                </div>
                {user.permissionLevel > 0 && (
                    <div className={o.links + ' ' + o.admin}>
                        <h2>{lang.headerAdmin}</h2>
                        {links
                            .filter((v) => v.admin)
                            .map((link) => (
                                <Link key={link.path} href={link.path} className={pathname === link.path ? o.active : ''}>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 24 24">
                                        <path fill="currentColor" d={link.d}></path>
                                    </svg>
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                </Link>
                            ))}
                    </div>
                )}
            </div>
            <div className={o.bottom}>
                {blog.length > 0 && (
                    <div className={o.blog}>
                        <h2>{lang.latestNews}</h2>
                        <Link href={'https://nove.team/blog/' + blog[0].id} className={o.card}>
                            <Image src="https://files-api.nove.team/v1/uploads/p2e8ppfnlab/file" width={500} height={222} alt="text" />
                            <div className={o.shadow}></div>
                            <span>{blog[0].title}</span>
                        </Link>
                    </div>
                )}
                <div className={o.user}>
                    <div className={o.profile}>
                        <Image src={user.avatar} alt="User's avatar" width={24} height={24} />
                        <span>{user.username}</span>
                    </div>
                    <a href="/logout">{lang.logout}</a>
                </div>
            </div>
        </aside>
    ) : (
        <></>
    );
}
