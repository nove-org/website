'use client';

import { axiosClient } from '@util/axios';
import { Device } from '@util/schema';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export default function Opt({ data, optOut, enable }: { data: Device[]; optOut: string; enable: string }) {
    const router = useRouter();

    const handleOpt = async () =>
        await axiosClient
            .patch('/v1/users/me', { trackActivity: !data }, { headers: { Authorization: `Owner ${getCookie('napiAuthorizationToken')}` } })
            .then(() => router.refresh())
            .catch((e) => alert('Something went wrong while changing your trackActivity state'));

    return <a onClick={handleOpt}>{data ? optOut : enable}</a>;
}
