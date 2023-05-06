'use client';

import { NextPage } from 'next';
import Link from 'next/link';

import o from '~/account/shortcuts.module.sass';

interface Props {
    name: string;
    description: string;
    url: string;
    option: string | undefined;
    children: any;
}

const Card: NextPage<Props> = ({ name, description, url, option, children }) => {
    return (
        <Link className={o.card} href={url}>
            <header>
                {children}
                <div className={o.items}>
                    <h1>{name}</h1>
                    <p>{description}</p>
                </div>
            </header>
            <div className={o.selected}>
                {option}
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M13.071,12L9.25,8.179c-0.414-0.414-0.414-1.086,0-1.5l0,0c0.414-0.414,1.086-0.414,1.5,0l4.614,4.614 c0.391,0.391,0.391,1.024,0,1.414l-4.614,4.614c-0.414,0.414-1.086,0.414-1.5,0h0c-0.414-0.414-0.414-1.086,0-1.5L13.071,12z"></path>
                </svg>
            </div>
        </Link>
    );
};

export default Card;
