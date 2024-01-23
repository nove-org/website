'use client';

import o from '@sass/blog.module.sass';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function BlogImage({ text }: { text: string }) {
    const [postBackground, setPostBackground] = useState<{ src: string; alt: string }>({
        src: '/no_image.png',
        alt: 'Empty image',
    });

    useEffect(() => {
        const postDOM = document.createElement('div');
        postDOM.classList.add('postDOM');
        postDOM.innerHTML = text;
        setPostBackground({
            src: postDOM.getElementsByTagName('img')[0].src,
            alt: postDOM.getElementsByTagName('img')[0].alt,
        });
    }, [text]);

    return <Image className={o.banner} src={postBackground.src} alt={postBackground.alt} width="500" height="222" />;
}
