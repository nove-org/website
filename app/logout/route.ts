import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { COOKIE_HOSTNAME } from '@util/CONSTS';

export async function GET() {
    cookies().set('napiAuthorizationToken', 'deleted', {
        maxAge: 1,
        domain: COOKIE_HOSTNAME,
        sameSite: 'strict',
        secure: true,
    });

    return redirect('/');
}
