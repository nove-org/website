import LanguageHandler from '@util/handlers/LanguageHandler';
import NAPI from '@util/helpers/NAPI';
import o from './AccountErrorHandler.module.sass';
import { cookies, headers } from 'next/headers';
import ObjectHelper from '@util/helpers/Object';
import { redirect } from 'next/navigation';

export async function generateMetadata() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const lang = await new LanguageHandler('modules/errors', user).init(headers());
    const title: string = `${lang.getProp('verify-email')} | Nove`;

    return {
        title,
        openGraph: { title },
        twitter: { card: 'summary_large_image', title },
    };
}

export default async function AccountErrorHandler({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const next: string | undefined = ObjectHelper.getValueByStringPath(searchParams, 'next');
    const lang = await new LanguageHandler('modules/errors', user).init(headers());

    if (!user?.id) redirect('/login' + (next ? `?next=${next}` : ''));

    if (user?.code === 'verify_email')
        return (
            <section className={o.information}>
                <h1>{lang.getProp('verify-email')}</h1>
                <p>{lang.getProp('verify-email-p')}</p>
                <a href={`/aeh` + (next ? `?next=${next}` : '')}>{lang.getProp('verify-email-button')}</a>
            </section>
        );
    else if (user.disabled)
        return (
            <section className={o.information}>
                <h1>{lang.getProp('account-suspended')}</h1>
                <p>{lang.getProp('account-suspended-p')}</p>
            </section>
        );
    else redirect(next ? next : '/account');
}
