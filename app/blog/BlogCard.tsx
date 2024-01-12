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
        <li title={post.title} key={post.id}>
            <Link href={`/blog/${post.id}`}>
                <Image className={o.banner} src={postBackground.src} alt={postBackground.alt} width="500" height="222" />
                <div className={o.info}>
                    <h1>{post.title}</h1>
                    <time>Published on {date.toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
                    <p>
                        by <Image src={post.authorAvatar} alt="avatar" width="18" height="18" /> {post.authorUsername}
                    </p>
                </div>
            </Link>
        </li>
    );
}
