import { PostComment, User } from '@util/schema';
import Image from 'next/image';
import o from '../../Blog.module.sass';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import NAPI from '@util/NAPI';

export default function Comment({ user, comment }: { user: User | undefined; comment: PostComment }) {
    const commentDelete = async (e: FormData) => {
        'use server';

        const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
        const com = await api.blog().deleteComment({ id: comment.blogPostId, commentId: comment.id });

        if (!com?.code) redirect('?s=' + new Date().getTime());
        else redirect('?et=rc');
    };

    return (
        <li key={comment.id}>
            <div className={o.user}>
                <div className={o.card}>
                    <Image src={comment.authorAvatar} width={20} height={20} alt="User's avatar" />
                    {comment.authorUsername}
                </div>
                &middot;
                {' ' +
                    new Date(comment.createdAt).toLocaleDateString(user?.language || 'en-US', { year: 'numeric', month: 'short', day: 'numeric' }) +
                    (comment.createdAt !== comment.updatedAt ? ' (edited)' : '')}
            </div>
            <p>{comment.text}</p>
            {(comment.authorId === user?.id || user?.permissionLevel === 2) && (
                <div className={o.actions}>
                    <form action={commentDelete}>
                        <button type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"></path>
                            </svg>
                        </button>
                    </form>
                </div>
            )}
        </li>
    );
}
