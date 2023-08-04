import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
    cookies().set('napiAuthorizationToken', 'null');

    return redirect('/');
}
