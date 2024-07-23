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
    const title: string = `${lang.getProp('header')} | Nove`;

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

    if (!user?.id) redirect('/login' + (next ? `?next=${encodeURIComponent(next)}` : ''));

    if (user?.code === 'verify_email')
        return (
            <section className={o.information}>
                <svg className={o.header} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M 6 2 L 6 5.4921875 L 2.9921875 7.2460938 C 2.3801875 7.6030938 2 8.2656094 2 8.9746094 L 2 19 C 2 20.103 2.897 21 4 21 L 20 21 C 21.103 21 22 20.103 22 19 L 22 8.9746094 C 22 8.2656094 21.619812 7.6030937 21.007812 7.2460938 L 18 5.4921875 L 18 2 L 6 2 z M 8 4 L 16 4 L 16 11.333984 L 12 13.822266 L 8 11.332031 L 8 4 z M 6 7.8066406 L 6 10.087891 L 4.1074219 8.9101562 L 6 7.8066406 z M 18 7.8085938 L 19.892578 8.9121094 L 18 10.089844 L 18 7.8085938 z M 4 11.199219 L 12 16.177734 L 20 11.199219 L 20.001953 19 L 4 19 L 4 11.199219 z"></path>
                </svg>
                <h1>{lang.getProp('verify-email')}</h1>
                <p>{lang.getProp('verify-email-p')}</p>
                <a className="btn" href={`/aeh` + (next ? `?next=${encodeURIComponent(next)}` : '')}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                        <path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"></path>
                    </svg>
                    {lang.getProp('verify-email-btn')}
                </a>
            </section>
        );
    else if (user.disabled)
        return (
            <section className={o.information}>
                <svg className={o.header} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 17 L 13 17 L 13 7 L 11 7 z"></path>
                </svg>
                <h1>{lang.getProp('account-suspended')}</h1>
                <p>{lang.getProp('account-suspended-p')}</p>
            </section>
        );
    else redirect(next ? next : '/account');
}
