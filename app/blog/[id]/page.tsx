import { axiosClient } from '@util/axios';
import b from '@sass/blog.module.sass';
import { Response, Post } from '@util/schema';
import { sanitize } from 'isomorphic-dompurify';

export default async function Blog({ params }: { params: { id: string } }) {
    const post: Response<Post> = (await axiosClient.get('/v1/blog/' + params.id).catch((e) => e.response))?.data;

    return (
        <article className={b.blog}>
            <header className={b.warning}>
                <h1 className={b.header}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                        <path d="M17.196,3H6.804l-5.195,9l5.195,9h10.393l5.195-9L17.196,3z M13,17h-2v-2h2V17z M13,13h-2V7h2V13z"></path>
                    </svg>
                    Warning
                </h1>
                <p className={b.description}>Right now, we only share posts in English but it will change in the future as we evolve.</p>
            </header>
            <h1>{post?.body?.data?.title}</h1>
            <p dangerouslySetInnerHTML={{ __html: sanitize(post?.body?.data?.text) }} />
        </article>
    );
}
