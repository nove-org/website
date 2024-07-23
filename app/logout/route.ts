import { COOKIE_HOSTNAME } from '@util/CONSTS';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET() {
    cookies().set('napiAuthorizationToken', '', {
        expires: 1,
        domain: COOKIE_HOSTNAME,
    });
    cookies().set('tempAuthId', '', {
        expires: 1,
        domain: COOKIE_HOSTNAME,
    });

    return redirect('/');
}
