import LanguageHandler from '@util/handlers/LanguageHandler';
import NAPI from '@util/helpers/NAPI';
import Error from '../Error';
import Device from './Device';
import o from './Security.module.sass';
import { cookies, headers } from 'next/headers';

export async function generateMetadata() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const lang = await new LanguageHandler('dashboard/security', user).init(headers());
    const title: string = `${(lang.getCustomProp('dashboard.layout.ul-security') as string).replace(/<.*?>/g, '')} | Nove`;

    return {
        title,
        openGraph: { title },
        twitter: { card: 'summary_large_image', title },
    };
}

export default async function Account() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const devices = await api.user().getDevices({ caching: true });
    const lang = await new LanguageHandler('dashboard/security', user).init(headers());

    return user ? (
        <div className={o.content}>
            <h1 className={o.title}>{(lang.getCustomProp('dashboard.layout.ul-security') as string).replace(/<.*?>/g, '')}</h1>
            <div className={o.devices}>
                <header className={o.title}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M 5 3 C 3.897 3 3 3.897 3 5 L 3 8 C 3 9.103 3.897 10 5 10 L 9 10 C 10.103 10 11 9.103 11 8 L 11 5 C 11 3.897 10.103 3 9 3 L 5 3 z M 15 10 C 13.897 10 13 10.897 13 12 L 13 19 C 13 20.103 13.897 21 15 21 L 19 21 C 20.103 21 21 20.103 21 19 L 21 12 C 21 10.897 20.103 10 19 10 L 15 10 z M 5 12 L 5 14 L 7 14 L 7 12 L 5 12 z M 5 16 L 5 18 L 7 18 L 7 16 L 5 16 z M 9 16 L 9 18 L 11 18 L 11 16 L 9 16 z M 17 17 C 17.552 17 18 17.448 18 18 C 18 18.552 17.552 19 17 19 C 16.448 19 16 18.552 16 18 C 16 17.448 16.448 17 17 17 z"></path>
                    </svg>
                    <div className={o.info}>
                        <h1>Your devices</h1>
                        <p>
                            List of devices that logged into your account in last month. We use ifconfig.net to get location information during sign ins. Data is encrypted.
                            <button>Disable this feature</button>
                        </p>
                    </div>
                </header>
                <ul className={o.devices}>{devices?.slice(0, 3)?.map((device) => <Device key={device.id} device={device} lang={user.language} />)}</ul>
                <div className={o.more}>
                    <details>
                        <summary>
                            <span className={o.closed}>Show more</span>
                            <span className={o.open}>Show less</span>
                        </summary>
                    </details>
                    <ul className={o.devices}>{devices?.slice(3)?.map((device) => <Device key={device.id} device={device} lang={user.language} />)}</ul>
                </div>
            </div>
        </div>
    ) : (
        <Error />
    );
}
