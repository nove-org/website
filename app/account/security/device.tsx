'use client';

import { NextPage } from 'next';
import o from '~/account/page.module.sass';

interface Props {
    icon: 'desktop' | 'phone';
    name: string;
    ip: string;
    date: string;
}

const Device: NextPage<Props> = ({ icon, name, ip, date }) => {
    return (
        <div className={o.device}>
            <header>
                {icon === 'desktop' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M 4 4 C 2.897 4 2 4.897 2 6 L 2 16 C 2 17.103 2.897 18 4 18 L 1 18 C 0.448 18 0 18.448 0 19 C 0 19.552 0.448 20 1 20 L 23 20 C 23.552 20 24 19.552 24 19 C 24 18.448 23.552 18 23 18 L 20 18 C 21.103 18 22 17.103 22 16 L 22 6 C 22 4.897 21.103 4 20 4 L 4 4 z M 4 6 L 20 6 L 20.001953 16 L 4 16 L 4 6 z"></path>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M16.5,1h-9C6.12,1,5,2.12,5,3.5v17C5,21.88,6.12,23,7.5,23h9c1.38,0,2.5-1.12,2.5-2.5v-17C19,2.12,17.88,1,16.5,1z M12,21.125c-0.622,0-1.125-0.503-1.125-1.125s0.503-1.125,1.125-1.125s1.125,0.503,1.125,1.125S12.622,21.125,12,21.125z M16,18H8 c-0.552,0-1-0.448-1-1V5c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1v12C17,17.552,16.552,18,16,18z"></path>
                    </svg>
                )}
                <div className={o.align}>
                    {name}
                    <span>{ip}</span>
                </div>
            </header>
            <time>{date}</time>
        </div>
    );
};

export default Device;
