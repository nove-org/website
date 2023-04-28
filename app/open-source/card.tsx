'use client';

import { NextPage } from 'next';
import Image from 'next/image';

import o from '~/open-source/page.module.sass';

interface Props {
    name: string;
    description: string;
    url: string;
    tags: string[];
    version?: string;
    img: string;
}

const Card: NextPage<Props> = ({ name, description, url, tags, version, img }) => {
    return (
        <a href={url} target="_blank">
            <div className={o.card + ' ' + o.dark}>
                <figure>
                    <Image src={img} alt="Card banner" width={320} height={180} />
                </figure>
                <h1>{name}</h1>
                <p className={o.text}>{description}</p>
                <div className={o.tags}>
                    <>
                        {tags.map((tag) => (
                            <div key={tag} className={o.tag}>
                                {tag}
                            </div>
                        ))}
                    </>
                    {version ? <div className={o.version}>{version}</div> : null}
                </div>
            </div>
        </a>
    );
};

export default Card;
