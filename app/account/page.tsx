import LanguageHandler from '@util/handlers/LanguageHandler';
import NAPI from '@util/helpers/NAPI';
import o from './Account.module.sass';
import i from './Info.module.sass';
import { cookies, headers } from 'next/headers';
import Image from 'next/image';

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

    const cards = [
        {
            title: lang.getProp('card-1-h1'),
            description: lang.getProp('card-1-p'),
            d: 'M 12 2 C 8.741068 2 5.8486894 3.5773875 4.0214844 6 L 4 6 L 4 6.0273438 C 2.7499527 7.6966931 2 9.7603852 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 15 4.5839844 C 17.935098 5.7673596 20 8.6326468 20 12 C 20 14.087831 19.200587 15.978318 17.898438 17.400391 C 17.642583 16.590687 16.894567 16 16 16 L 15 16 L 15 13 C 15 12.448 14.552 12 14 12 L 9 12 L 9 10 L 10 10 C 10.552 10 11 9.552 11 9 L 11 7 L 13 7 C 14.105 7 15 6.105 15 5 L 15 4.5839844 z M 4.2070312 10.207031 L 6 12 L 9 15 L 9 16 C 9 17.105 9.895 18 11 18 L 11 19.931641 C 7.0457719 19.441154 4 16.090654 4 12 C 4 11.382188 4.0755245 10.784033 4.2070312 10.207031 z',
        },
        {
            title: user?.trackActivity ? lang.getProp('card-2-h1') : lang.getProp('card-3-h1'),
            description: user?.trackActivity ? lang.getProp('card-2-p') : lang.getProp('card-3-p'),
            d: user?.trackActivity
                ? 'M16.5,3C13.605,3,12,5.09,12,5.09S10.395,3,7.5,3C4.462,3,2,5.462,2,8.5C2,9.003,2.075,9.505,2.203,10h3.464l2.579-1.934 l2,3L11.667,10h1.611C13.624,9.405,14.262,9,15,9c1.105,0,2,0.895,2,2c0,1.105-0.895,2-2,2c-0.738,0-1.376-0.405-1.723-1h-0.944 l-2.579,1.934l-2-3L6.333,12h-3.31c1.514,2.764,4.282,5.08,5.257,5.99C9.858,19.46,12,21.35,12,21.35s2.142-1.89,3.719-3.36 C17.088,16.713,22,12.671,22,8.5C22,5.462,19.538,3,16.5,3z'
                : 'M 7 5 C 3.134 5 0 8.134 0 12 C 0 15.866 3.134 19 7 19 C 10.170669 19 12.846171 16.890989 13.707031 14 L 18 14 L 18 17 L 22 17 L 22 14 L 24 14 L 24 10 L 13.707031 10 C 12.846171 7.1090112 10.170669 5 7 5 z M 7 9 C 8.657 9 10 10.343 10 12 C 10 13.657 8.657 15 7 15 C 5.343 15 4 13.657 4 12 C 4 10.343 5.343 9 7 9 z',
        },
        {
            title: lang.getProp('card-4-h1'),
            description: lang.getProp('card-4-p'),
            d: 'M 2 7 L 2 16 L 11 16 L 7.3789062 12.378906 C 8.7653195 11.211569 10.5449 10.5 12.5 10.5 C 16.034 10.5 19.024984 12.794656 20.083984 15.972656 L 22.451172 15.183594 C 21.062172 11.012594 17.138 8 12.5 8 C 9.8543339 8 7.4570807 8.9979817 5.6152344 10.615234 L 2 7 z',
        },
    ];

    return user ? (
        <div className={o.content}>
            <Image src={user.avatar} width={84} height={84} alt="User's avatar" />
            <h1>{lang.getProp('hello', { user: user.username })}</h1>
            <p>{lang.getProp('hello-p')}</p>
            <div className={o.links}>
                {cards.map((card) => (
                    <div key={card.d} className={o.card}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 24 24">
                            <path fill="currentColor" d={card.d}></path>
                        </svg>
                        <h1>{card.title}</h1>
                        <p>{card.description}</p>
                    </div>
                ))}
            </div>
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
