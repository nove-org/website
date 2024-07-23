import { COOKIE_HOSTNAME } from '@util/CONSTS';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET() {
    cookies().set('napiAuthorizationToken', '', {
        maxAge: 1,
        expires: 1,
        domain: COOKIE_HOSTNAME,
    });
    cookies().set('tempAuthId', '', {
        maxAge: 1,
        expires: 1,
        domain: COOKIE_HOSTNAME,
    });

    return redirect('/');
}
