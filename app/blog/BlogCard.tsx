'use client';

import o from '@sass/blog.module.sass';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@util/schema';

export default function BlogCard({ post }: { post: Post }) {
    const date = new Date(post.createdAt);

    const postDOM = document.createElement('div');
    postDOM.classList.add('postDOM');
    postDOM.innerHTML = post.text;
    const postBackground = postDOM.getElementsByTagName('img')[0];

    return (
        <li key={post.id}>
            <Link href={`/blog/${post.id}`}>
                <Image className={o.banner} src={postBackground.src} alt={postBackground.alt} width="500" height="222" />
                <div className={o.info}>
                    <h1>
                        {post.title}
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 30 30">
                            <path
                                fill="currentColor"
                                d="M 9.9902344 3.9902344 A 1.0001 1.0001 0 0 0 9.2929688 5.7070312 L 18.585938 15 L 9.2929688 24.292969 A 1.0001 1.0001 0 1 0 10.707031 25.707031 L 20.707031 15.707031 A 1.0001 1.0001 0 0 0 20.707031 14.292969 L 10.707031 4.2929688 A 1.0001 1.0001 0 0 0 9.9902344 3.9902344 z"></path>
                        </svg>
                    </h1>
                    <time>Published on {date.toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
                    <p>
                        by <Image src={post.authorAvatar} alt="avatar" width="18" height="18" /> {post.authorUsername}
                    </p>
                </div>
            </Link>
        </li>
    );
}
