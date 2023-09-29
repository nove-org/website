'use client';

import { axiosClient } from '@util/axios';
import { Device } from '@util/schema';
import { getCookie } from 'cookies-next';

export default function Opt({ data, optOut, enable }: { data: Device[]; optOut: string; enable: string }) {
    const handleOpt = async () =>
        await axiosClient
            .patch('/v1/users/me', { trackActivity: !data }, { headers: { Authorization: `Owner ${getCookie('napiAuthorizationToken')}` } })
            .then(() => window.location.reload())
            .catch((e) => alert('Something went wrong while changing your trackActivity state'));

    return <a onClick={handleOpt}>{data ? optOut : enable}</a>;
}
