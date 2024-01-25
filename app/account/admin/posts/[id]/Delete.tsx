'use client';

import { errorHandler } from '@util/helpers/Main';
import { deletePost } from '@util/helpers/client/Blog';
import { AxiosError } from 'axios';
import { Response } from '@util/schema';
import { useRouter } from 'next/navigation';

export default function Delete({ lang, id }: { lang: { btn: string }; id: string }) {
    const router = useRouter();

    const handleDelete = async () =>
        deletePost({ id })
            .then((r) => router.replace('/account/admin/posts'))
            .catch((err: AxiosError) => alert(errorHandler(err.response?.data as Response<null>)));

    return <button onClick={handleDelete}>{lang.btn}</button>;
}
