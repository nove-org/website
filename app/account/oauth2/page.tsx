import LanguageHandler from '@util/handlers/LanguageHandler';
import NAPI from '@util/helpers/NAPI';
import Error from '../Error';
import Link from 'next/link';
import o from './OAuth2.module.sass';
import { cookies, headers } from 'next/headers';
import { Connection } from '@util/helpers/Schema';

export async function generateMetadata() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const lang = await new LanguageHandler('dashboard/oauth2', user).init(headers());
    const title: string = `${lang.getCustomProp('dashboard.layout.ul-oauth2')} | Nove`;

    return {
        title,
        openGraph: { title },
        twitter: { card: 'summary_large_image', title },
    };
}

export default async function OAuth2() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const authorizations = await api.user().getConnections({ caching: true });
    const lang = await new LanguageHandler('dashboard/oauth2', user).init(headers());

    let connections: Connection[] = [];
    if (authorizations)
        for (const authorization of authorizations) {
            const existing = connections.find((v) => v.app.name === authorization.app.name);
            if (existing) {
                existing.updatedAt = authorization.createdAt;
            } else {
                connections.push(authorization);
            }
        }

    return user ? (
        <div className={o.content}>
            <h1 className={o.title}>{lang.getCustomProp('dashboard.layout.ul-oauth2')}</h1>
            <p className={o.description}>{lang.getProp('description')}</p>
            <div className={o.connections}>
                {connections?.reverse()?.map((connection) => (
                    <div key={connection.id} className={o.card}>
                        <div className={o.header}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M 4 4 C 2.9069372 4 2 4.9069372 2 6 L 2 18 C 2 19.093063 2.9069372 20 4 20 L 20 20 C 21.093063 20 22 19.093063 22 18 L 22 6 C 22 4.9069372 21.093063 4 20 4 L 4 4 z M 4 6 L 20 6 L 20 18 L 4 18 L 4 6 z M 14.5 11 L 11 15 L 8.5 12.5 L 5.7773438 16 L 18.25 16 L 14.5 11 z"></path>
                            </svg>
                            <div className={o.info}>
                                <h1>{connection.app.name}</h1>
                                <p>
                                    {connection.app.description} &middot; By {connection.app.owner}
                                </p>
                            </div>
                        </div>
                        <h1 className={o.sectionTitle}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M 6 7 C 3.239 7 1 9.239 1 12 C 1 14.761 3.239 17 6 17 L 10 17 L 10 15 L 6 15 C 4.343 15 3 13.657 3 12 C 3 10.343 4.343 9 6 9 L 10 9 L 10 7 L 6 7 z M 14 7 L 14 9 L 18 9 C 19.657 9 21 10.343 21 12 C 21 13.657 19.657 15 18 15 L 14 15 L 14 17 L 18 17 C 20.761 17 23 14.761 23 12 C 23 9.239 20.761 7 18 7 L 14 7 z M 7 11 L 7 13 L 17 13 L 17 11 L 7 11 z"></path>
                            </svg>
                            Links
                        </h1>
                        <div className={o.links}>
                            <Link className="btn" href={connection.app.link_homepage}>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z"></path>
                                </svg>
                                Home page
                            </Link>
                            <Link className="btn" href={connection.app.link_privacy_policy}>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M 5 1 C 3.9 1 3 1.9 3 3 L 3 17 L 5 17 L 5 3 L 17 3 L 17 1 L 5 1 z M 9 5 C 7.9 5 7 5.9 7 7 L 7 21 C 7 22.1 7.9 23 9 23 L 20 23 C 21.1 23 22 22.1 22 21 L 22 7 C 22 5.895 21.105 5 20 5 L 9 5 z M 9 7 L 20 7 L 20 21 L 9 21 L 9 7 z M 11 9 L 11 11 L 18 11 L 18 9 L 11 9 z M 11 13 L 11 15 L 18 15 L 18 13 L 11 13 z M 11 17 L 11 19 L 18 19 L 18 17 L 11 17 z"></path>
                                </svg>
                                Privacy Policy
                            </Link>
                            <Link className="btn" href={connection.app.link_tos}>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M 5 1 C 3.9 1 3 1.9 3 3 L 3 17 L 5 17 L 5 3 L 17 3 L 17 1 L 5 1 z M 9 5 C 7.9 5 7 5.9 7 7 L 7 21 C 7 22.1 7.9 23 9 23 L 20 23 C 21.1 23 22 22.1 22 21 L 22 7 C 22 5.895 21.105 5 20 5 L 9 5 z M 9 7 L 20 7 L 20 21 L 9 21 L 9 7 z M 11 9 L 11 11 L 18 11 L 18 9 L 11 9 z M 11 13 L 11 15 L 18 15 L 18 13 L 11 13 z M 11 17 L 11 19 L 18 19 L 18 17 L 11 17 z"></path>
                                </svg>
                                Terms of Service
                            </Link>
                        </div>
                        <h1 className={o.sectionTitle}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M 12 2 C 6.5 2 2 6.5 2 12 C 2 17.5 6.5 22 12 22 C 17.5 22 22 17.5 22 12 C 22 6.5 17.5 2 12 2 z M 12 4 C 16.4 4 20 7.6 20 12 C 20 16.4 16.4 20 12 20 C 7.6 20 4 16.4 4 12 C 4 7.6 7.6 4 12 4 z M 6 11 L 6 13 L 18 13 L 18 11 L 6 11 z"></path>
                            </svg>
                            Permissions
                        </h1>
                        <ul className={o.scopes}>
                            {connection.scopes.map((scope) => (
                                <li key={scope}>{scope}</li>
                            ))}
                        </ul>
                        <div className={o.footer}>
                            First accessed on
                            {' ' +
                                new Date(connection.createdAt).toLocaleDateString(user.language, {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit',
                                })}
                            <br />
                            Last successful login on{' '}
                            {' ' +
                                new Date(connection.updatedAt).toLocaleDateString(user.language, {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit',
                                })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <Error />
    );
}
