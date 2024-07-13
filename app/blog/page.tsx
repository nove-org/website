import NAPI from '@util/helpers/NAPI';
import o from '../Blog.module.sass';
import Link from 'next/link';
import { cookies, headers } from 'next/headers';
import Image from 'next/image';
import LanguageHandler from '@util/handlers/LanguageHandler';

export default async function Blog() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const blog = await api.blog().getPosts({ caching: true });
    const lang = await new LanguageHandler('main/blog', user).init(headers());

    return (
        <div className={o.content}>
            <div className={o.header}>
                <h1 className={o.title}>{lang.getProp('title')}</h1>
                {user?.permissionLevel === 2 && (
                    <Link className="btn" href="/account/blog">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M 21.808594 0 C 21.652219 0 21.495953 0.0601875 21.376953 0.1796875 L 20.154297 1.4003906 L 22.599609 3.8457031 L 23.820312 2.6230469 C 24.059313 2.3840469 24.059313 1.9977656 23.820312 1.7597656 L 22.240234 0.1796875 C 22.120734 0.0601875 21.964969 0 21.808594 0 z M 19.289062 2.265625 L 12 9.5566406 L 12 12 L 14.443359 12 L 21.734375 4.7089844 L 19.289062 2.265625 z M 5 3 C 3.897 3 3 3.897 3 5 L 3 19 C 3 20.103 3.897 21 5 21 L 19 21 C 20.103 21 21 20.103 21 19 L 21 8.2714844 L 19.001953 10.271484 L 19.001953 19 L 5 19 L 5 9 L 9.7285156 9 L 11.728516 7 L 5 7 L 5 5 L 13.728516 5 L 15.728516 3 L 5 3 z"></path>
                        </svg>
                        {lang.getProp('new-post')}
                    </Link>
                )}
            </div>
            <Link href={'/blog/' + blog[0].title.toLowerCase().split(' ').join('-') + '-' + blog[0].id.split('-')[blog[0].id.split('-').length - 1]} className={o.featured}>
                <h2 className={o.header + ' ' + o.highlight}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M15.5 10.2l.971 2.329L18.8 13.5l-2.329.971L15.5 16.8l-.971-2.329L12.2 13.5l2.329-.971L15.5 10.2M15.5 5L13 11l-6 2.5 6 2.5 2.5 6 2.5-6 6-2.5L18 11 15.5 5 15.5 5zM4.125 7.875L5.5 12 6.875 7.875 11 6.5 6.875 5.125 5.5 1 4.125 5.125 0 6.5zM6.375 18.625L5.5 16 4.625 18.625 2 19.5 4.625 20.375 5.5 23 6.375 20.375 9 19.5z"></path>
                    </svg>
                    {lang.getProp('featured')}
                </h2>
                <Image className={o.decor} src={blog[0].header} alt={blog[0].headerAlt} title={blog[0].headerAlt} width={1000} height={444} />
                <aside className={o.info}>
                    <h1>{blog[0].title.substring(0, 94) + (blog[0].title.length > 94 ? '...' : '')}</h1>
                    <div className={o.meta}>
                        <div
                            className={o.time}
                            dangerouslySetInnerHTML={{
                                __html: lang.getProp('published-on', {
                                    date: `<time>${new Date(blog[0].createdAt).toLocaleDateString(user?.language || 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</time>`,
                                }),
                            }}
                        />
                        <div
                            className={o.footer}
                            dangerouslySetInnerHTML={{
                                __html: lang.getProp('by-author', {
                                    author: `<img src="${blog[0].authorAvatar}" alt="User's avatar" width="16" height="16" /> ${blog[0].authorUsername}`,
                                }),
                            }}
                        />
                    </div>
                </aside>
            </Link>
            <h2 className={o.header}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                    <path d="M 4 3 C 3.448 3 3 3.448 3 4 L 3 6 C 3 6.552 3.448 7 4 7 L 6 7 C 6.552 7 7 6.552 7 6 L 7 4 C 7 3.448 6.552 3 6 3 L 4 3 z M 11 3 C 10.448 3 10 3.448 10 4 L 10 6 C 10 6.552 10.448 7 11 7 L 13 7 C 13.552 7 14 6.552 14 6 L 14 4 C 14 3.448 13.552 3 13 3 L 11 3 z M 18 3 C 17.448 3 17 3.448 17 4 L 17 6 C 17 6.552 17.448 7 18 7 L 20 7 C 20.552 7 21 6.552 21 6 L 21 4 C 21 3.448 20.552 3 20 3 L 18 3 z M 4 10 C 3.448 10 3 10.448 3 11 L 3 13 C 3 13.552 3.448 14 4 14 L 6 14 C 6.552 14 7 13.552 7 13 L 7 11 C 7 10.448 6.552 10 6 10 L 4 10 z M 11 10 C 10.448 10 10 10.448 10 11 L 10 13 C 10 13.552 10.448 14 11 14 L 13 14 C 13.552 14 14 13.552 14 13 L 14 11 C 14 10.448 13.552 10 13 10 L 11 10 z M 18 10 C 17.448 10 17 10.448 17 11 L 17 13 C 17 13.552 17.448 14 18 14 L 20 14 C 20.552 14 21 13.552 21 13 L 21 11 C 21 10.448 20.552 10 20 10 L 18 10 z M 4 17 C 3.448 17 3 17.448 3 18 L 3 20 C 3 20.552 3.448 21 4 21 L 6 21 C 6.552 21 7 20.552 7 20 L 7 18 C 7 17.448 6.552 17 6 17 L 4 17 z M 11 17 C 10.448 17 10 17.448 10 18 L 10 20 C 10 20.552 10.448 21 11 21 L 13 21 C 13.552 21 14 20.552 14 20 L 14 18 C 14 17.448 13.552 17 13 17 L 11 17 z M 18 17 C 17.448 17 17 17.448 17 18 L 17 20 C 17 20.552 17.448 21 18 21 L 20 21 C 20.552 21 21 20.552 21 20 L 21 18 C 21 17.448 20.552 17 20 17 L 18 17 z"></path>
                </svg>
                {lang.getProp('other')}
            </h2>
            <ul className={o.articles}>
                {blog.slice(1).map((post) => (
                    <li key={post.id}>
                        <Link href={'/blog/' + post.title.toLowerCase().split(' ').join('-') + '-' + post.id.split('-')[post.id.split('-').length - 1]} title={post.title}>
                            <Image src={post.header} alt={post.headerAlt} title={post.headerAlt} width={1000} height={444} />
                            <div className={o.info}>
                                <h1>{post.title.substring(0, 44) + (post.title.length > 44 ? '...' : '')}</h1>
                                <div
                                    className={o.time}
                                    dangerouslySetInnerHTML={{
                                        __html: lang.getProp('published-on', {
                                            date: `<time>${new Date(post.createdAt).toLocaleDateString(user?.language || 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</time>`,
                                        }),
                                    }}
                                />
                                <div
                                    className={o.footer}
                                    dangerouslySetInnerHTML={{
                                        __html: lang.getProp('by-author', {
                                            author: `<img src="${post.authorAvatar}" alt="User's avatar" width="16" height="16" /> ${post.authorUsername}`,
                                        }),
                                    }}
                                />
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
