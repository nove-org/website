import o from '@sass/blog.module.sass';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@util/schema';
import BlogImage from './BlogImage';

export default function BlogCard({ post }: { post: Post }) {
    const date = new Date(post.createdAt);
    const blogLink: string = post.title.toLowerCase().split(' ').join('-') + '-' + post.id.split('-')[post.id.split('-').length - 1];

    return (
        <li title={post.title} key={post.id}>
            <Link href={`/blog/${blogLink}`}>
                <BlogImage text={post.text} />
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
