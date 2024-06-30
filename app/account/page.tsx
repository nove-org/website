import LanguageHandler from '@util/handlers/LanguageHandler';
import NAPI from '@util/helpers/NAPI';
import o from './Account.module.sass';
import i from './Info.module.sass';
import { cookies, headers } from 'next/headers';

export async function generateMetadata() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const lang = await new LanguageHandler('dashboard/main', user).init(headers());
    const title: string = `${lang.getProp('title')} | Nove`;

    return {
        title,
        openGraph: { title },
        twitter: { card: 'summary_large_image', title },
    };
}

export default async function Account() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const lang = await new LanguageHandler('dashboard/main', user).init(headers());

    return user ? (
        <div className={o.content}>
            <h1>Overview</h1>
        </div>
    ) : (
        <div className={i.info}>
            <div className={i.container}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 8.7070312 7.2929688 L 7.2929688 8.7070312 L 10.585938 12 L 7.2929688 15.292969 L 8.7070312 16.707031 L 12 13.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13.414062 12 L 16.707031 8.7070312 L 15.292969 7.2929688 L 12 10.585938 L 8.7070312 7.2929688 z"></path>
                </svg>
                <div className={i.content}>
                    <h1>Something went wrong</h1>
                    <p>We couldn't fetch your account information from our servers. Please try again later or try refreshing the page.</p>
                </div>
            </div>
        </div>
    );
}
