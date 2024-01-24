'use client';

import { errorHandler } from '@util/helpers/Main';
import { patchUser } from '@util/helpers/client/User';
import { Response, Device } from '@util/schema';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

export default function Opt({ data, optOut, enable }: { data: Device[]; optOut: string; enable: string }) {
    const router = useRouter();

    const handleOpt = async () =>
        await patchUser({ trackActivity: !data })
            .then(() => router.refresh())
            .catch((err: AxiosError) => alert(errorHandler(err.response?.data as Response<null>)));

    return <a onClick={handleOpt}>{data ? optOut : enable}</a>;
}
