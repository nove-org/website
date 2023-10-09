import Image from 'next/image';
import { axiosClient } from '@util/axios';
import o from '@sass/account/page.module.sass';
import { cookies, headers } from 'next/headers';
import Link from 'next/link';
import { Response, Device, User, Connection } from '@util/schema';
import LanguageHandler from '@util/handlers/LanguageHandler';

export default async function Overview() {
    const user: Response<User> = (
        await axiosClient
            .get('/v1/users/me', {
                headers: { Authorization: `Owner ${cookies()?.get('napiAuthorizationToken')?.value}` },
            })
            .catch((e) => e.response)
    )?.data;
    const device: Response<Device[]> = (
        await axiosClient
            .get('/v1/users/me/activity', {
                headers: { Authorization: `Owner ${cookies()?.get('napiAuthorizationToken')?.value}` },
            })
            .catch((e) => e.response)
    )?.data;
    const connections: Response<Connection[]> = (
        await axiosClient
            .get('/v1/users/me/connections', {
                headers: { Authorization: `Owner ${cookies()?.get('napiAuthorizationToken')?.value}` },
            })
            .catch((e) => e.response)
    )?.data;

    const languageTranslate = new Intl.DisplayNames([user?.body?.data?.language], { type: 'language' });
    const lang = await new LanguageHandler('dashboard/main', user?.body?.data).init(headers());
    let connNames: string[] = [];

    return user?.body?.data?.username ? (
        <div className={o.content}>
            <h1 className={o.title}>{lang.getProp('title')}</h1>
            <ul className={o.overview}>
                <li className={o.profile}>
                    <header>
                        <Image src={user.body.data.avatar} width="72" height="72" alt="Avatar" />
                        <div className={o.data}>
                            <h1>{user.body.data.username}</h1>
                            <p>{user.body.data.email}</p>
                        </div>
                    </header>
                    <h2>{lang.getProp('tips-header')}</h2>
                    <ul>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M 12.890625 3 C 12.383625 3 11.958344 3.3817656 11.902344 3.8847656 L 10.123047 19.896484 C 10.057047 20.485484 10.517375 21 11.109375 21 C 11.615375 21 12.041656 20.618234 12.097656 20.115234 L 13.876953 4.1035156 C 13.942953 3.5145156 13.482625 3 12.890625 3 z M 5.7070312 6.7070312 C 5.4510313 6.7070312 5.195 6.805 5 7 L 0.70703125 11.292969 C 0.31603125 11.683969 0.31603125 12.317031 0.70703125 12.707031 L 5 17 C 5.39 17.39 6.0240625 17.39 6.4140625 17 C 6.8040625 16.61 6.8040625 15.975938 6.4140625 15.585938 L 2.828125 12 L 6.4140625 8.4140625 C 6.8050625 8.0240625 6.8050625 7.39 6.4140625 7 C 6.2190625 6.805 5.9630312 6.7070312 5.7070312 6.7070312 z M 18.292969 6.7070312 C 18.036969 6.7070312 17.780938 6.805 17.585938 7 C 17.195937 7.39 17.195937 8.0240625 17.585938 8.4140625 L 21.171875 12 L 17.585938 15.585938 C 17.195937 15.975938 17.195937 16.61 17.585938 17 C 17.975938 17.39 18.61 17.39 19 17 L 23.292969 12.707031 C 23.683969 12.316031 23.683969 11.682969 23.292969 11.292969 L 19 7 C 18.805 6.805 18.548969 6.7070312 18.292969 6.7070312 z"></path>
                            </svg>
                            {lang.getProp('tips-1')}
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M21.694,15.28L21.694,15.28c-0.399-0.399-1.05-0.389-1.436,0.024l-1.708,1.832L17.414,16l1.293-1.293 c0.39-0.39,0.39-1.023,0-1.413l-0.001-0.001c-0.39-0.39-1.023-0.39-1.413,0L16,14.586l-3.791-3.792l0.21-0.44 c0.914-1.913,0.676-4.249-0.783-5.788C9.453,2.264,5.617,2.512,3.789,5.31C2.887,6.69,2.738,8.49,3.412,9.995 c1.212,2.708,4.29,3.689,6.745,2.518l0.637-0.305l8.499,8.499c0.39,0.39,1.023,0.39,1.413,0l0.001-0.001 c0.39-0.39,0.39-1.023,0-1.413l-0.744-0.744l1.754-1.88C22.085,16.276,22.075,15.661,21.694,15.28z M10.127,10.127 c-1.17,1.17-3.073,1.17-4.243,0c-1.17-1.17-1.17-3.073,0-4.243c1.17-1.17,3.073-1.17,4.243,0 C11.296,7.054,11.296,8.957,10.127,10.127z"></path>
                            </svg>
                            {lang.getProp('tips-2')}
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M 12 3 A 4 4 0 0 0 8 7 A 4 4 0 0 0 12 11 A 4 4 0 0 0 16 7 A 4 4 0 0 0 12 3 z M 12 14 C 8.996 14 3 15.508 3 18.5 L 3 20 C 3 20.552 3.448 21 4 21 L 20 21 C 20.552 21 21 20.552 21 20 L 21 18.5 C 21 15.508 15.004 14 12 14 z"></path>
                            </svg>
                            {lang.getProp('tips-3')}
                        </li>
                    </ul>
                </li>
                <div className={o.flex}>
                    <li className={o.card}>
                        <Link href="/account/language">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36" height="36" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M 12 2 C 8.741068 2 5.8486894 3.5773875 4.0214844 6 L 4 6 L 4 6.0273438 C 2.7499527 7.6966931 2 9.7603852 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 15 4.5839844 C 17.935098 5.7673596 20 8.6326468 20 12 C 20 14.087831 19.200587 15.978318 17.898438 17.400391 C 17.642583 16.590687 16.894567 16 16 16 C 15.448 16 15 15.552 15 15 L 15 13 C 15 12.448 14.552 12 14 12 L 10 12 C 9.448 12 9 11.552 9 11 C 9 10.448 9.448 10 10 10 C 10.552 10 11 9.552 11 9 L 11 8 C 11 7.448 11.448 7 12 7 L 13 7 C 14.105 7 15 6.105 15 5 L 15 4.5839844 z M 4.2070312 10.207031 L 9 15 L 9 16 C 9 17.105 9.895 18 11 18 L 11 19.931641 C 7.0457719 19.441154 4 16.090654 4 12 C 4 11.382188 4.0755242 10.784034 4.2070312 10.207031 z"></path>
                            </svg>
                            <h1>{lang.getProp('card-1-h1')}</h1>
                            <p>{lang.getProp('card-1-p')}</p>
                            <span>
                                {languageTranslate.of(user.body.data.language)}
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 30 30">
                                    <path
                                        fill="currentColor"
                                        d="M 9.9902344 3.9902344 A 1.0001 1.0001 0 0 0 9.2929688 5.7070312 L 18.585938 15 L 9.2929688 24.292969 A 1.0001 1.0001 0 1 0 10.707031 25.707031 L 20.707031 15.707031 A 1.0001 1.0001 0 0 0 20.707031 14.292969 L 10.707031 4.2929688 A 1.0001 1.0001 0 0 0 9.9902344 3.9902344 z"></path>
                                </svg>
                            </span>
                        </Link>
                    </li>
                    <li className={o.card}>
                        <Link href="/account/security">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36" height="36" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M16.256,3.005C13.515,3.117,12,5.09,12,5.09S10.377,2.976,7.451,3C6.338,3.009,5.278,3.476,4.403,4.164 C2.019,6.038,1.702,8.067,2.203,10h3.464L7.4,8.7c0.459-0.344,1.114-0.232,1.432,0.245l1.414,2.12l0.888-0.666 c0.346-0.26,0.767-0.4,1.2-0.4h0.944c0.423-0.727,1.28-1.169,2.224-0.938c0.72,0.176,1.301,0.781,1.453,1.506 C17.226,11.861,16.246,13,15,13c-0.738,0-1.376-0.405-1.723-1h-0.944L10.6,13.3c-0.459,0.344-1.114,0.232-1.432-0.245l-1.414-2.12 L6.867,11.6C6.521,11.86,6.1,12,5.667,12H3.024c1.514,2.764,4.282,5.08,5.257,5.99c1.033,0.962,2.307,2.105,3.064,2.779 c0.375,0.334,0.934,0.334,1.309,0c0.757-0.674,2.032-1.817,3.064-2.779c1.72-1.603,9.032-7.574,5.17-12.678 C19.779,3.845,18.094,2.93,16.256,3.005z"></path>
                            </svg>
                            <h1>{device.body.data ? lang.getProp('card-2-h1') : lang.getProp('card-3-h1')}</h1>
                            <p>{device.body.data ? lang.getProp('card-2-p') : lang.getProp('card-3-p')}</p>
                            <span>
                                {device.body.data ? lang.getProp('card-2-action', { number: device.body.data.length }) : lang.getProp('card-3-action')}
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 30 30">
                                    <path
                                        fill="currentColor"
                                        d="M 9.9902344 3.9902344 A 1.0001 1.0001 0 0 0 9.2929688 5.7070312 L 18.585938 15 L 9.2929688 24.292969 A 1.0001 1.0001 0 1 0 10.707031 25.707031 L 20.707031 15.707031 A 1.0001 1.0001 0 0 0 20.707031 14.292969 L 10.707031 4.2929688 A 1.0001 1.0001 0 0 0 9.9902344 3.9902344 z"></path>
                                </svg>
                            </span>
                        </Link>
                    </li>
                    <li className={o.card}>
                        <Link href="/account/security">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36" height="36" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M 6 2 C 4.895 2 4 2.895 4 4 L 4 6 C 4 6.552 4.448 7 5 7 L 19 7 C 19.552 7 20 6.552 20 6 L 20 4 C 20 2.895 19.105 2 18 2 L 6 2 z M 5 9 C 4.448 9 4 9.448 4 10 L 4 14 C 4 14.552 4.448 15 5 15 L 10.587891 15 C 11.774891 12.069 14.644 10 18 10 C 18.692 10 19.36 10.096719 20 10.261719 L 20 10 C 20 9.448 19.552 9 19 9 L 5 9 z M 18.001953 12 C 14.700328 12 12.001953 14.698375 12.001953 18 C 12.001953 19.24748 12.38752 20.410166 13.042969 21.373047 L 12.121094 22.294922 C 11.861094 22.554922 12.046062 23 12.414062 23 L 14.824219 23 A 1.0001 1.0001 0 0 0 15.732422 22.732422 A 1.0001 1.0001 0 0 0 16.001953 21.787109 L 16.001953 19.414062 C 16.001953 19.046062 15.556875 18.862094 15.296875 19.121094 L 14.496094 19.921875 C 14.183492 19.352587 14.001953 18.700274 14.001953 18 C 14.001953 15.779625 15.781579 14 18.001953 14 C 20.222328 14 22.001953 15.779625 22.001953 18 C 22.001953 19.945526 20.625661 21.550064 18.802734 21.919922 A 1.0003092 1.0003092 0 1 0 19.199219 23.880859 C 21.940292 23.324717 24.001953 20.892474 24.001953 18 C 24.001953 14.698375 21.303579 12 18.001953 12 z M 5 17 C 4.448 17 4 17.448 4 18 L 4 20 C 4 21.105 4.895 22 6 22 L 11.078125 22 C 10.396125 20.822 10 19.459 10 18 C 10 17.661 10.027359 17.328 10.068359 17 L 5 17 z"></path>
                            </svg>
                            <h1>{lang.getProp('card-4-h1')}</h1>
                            <p>{lang.getProp('card-4-p')}</p>
                            <span>
                                {lang.getProp('card-3-action')}
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 30 30">
                                    <path
                                        fill="currentColor"
                                        d="M 9.9902344 3.9902344 A 1.0001 1.0001 0 0 0 9.2929688 5.7070312 L 18.585938 15 L 9.2929688 24.292969 A 1.0001 1.0001 0 1 0 10.707031 25.707031 L 20.707031 15.707031 A 1.0001 1.0001 0 0 0 20.707031 14.292969 L 10.707031 4.2929688 A 1.0001 1.0001 0 0 0 9.9902344 3.9902344 z"></path>
                                </svg>
                            </span>
                        </Link>
                    </li>
                </div>
            </ul>
            <h1 className={o.title}>{lang.getProp('connections-title')}</h1>
            <ul className={o.connections}>
                {connections.body.data
                    .slice(0)
                    .reverse()
                    .map((connection) => {
                        if (connNames.includes(connection.app.name)) return;
                        connNames.push(connection.app.name);

                        return (
                            <li key={connection.id} className={o.card}>
                                <header>
                                    <div className={o.name}>
                                        {connection.app.isVerified ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                                                <path
                                                    fill="currentColor"
                                                    d="M21.228,12l0.622-1.92c0.465-1.437-0.182-3-1.527-3.687l-1.797-0.918l-0.918-1.797c-0.687-1.345-2.25-1.993-3.687-1.527 L12,2.772L10.08,2.15c-1.437-0.465-3,0.182-3.687,1.527L5.474,5.474L3.677,6.393C2.332,7.08,1.685,8.643,2.15,10.08L2.772,12 L2.15,13.92c-0.465,1.437,0.182,3,1.527,3.687l1.797,0.918l0.918,1.797c0.687,1.345,2.25,1.993,3.687,1.527L12,21.228l1.92,0.622 c1.437,0.465,3-0.182,3.687-1.527l0.918-1.797l1.797-0.918c1.345-0.687,1.993-2.25,1.527-3.687L21.228,12z M11,16.414l-3.707-3.707 l1.414-1.414L11,13.586l5.293-5.293l1.414,1.414L11,16.414z"></path>
                                            </svg>
                                        ) : null}
                                        <div>
                                            <h1>
                                                <a href={connection.app.link_homepage}>{connection.app.name}</a>
                                            </h1>
                                            <p>{connection.app.description}</p>
                                        </div>
                                        <span>
                                            {lang.getProp('connections-last-access') +
                                                ' ' +
                                                new Date(connection.updatedAt).toLocaleString(user.body.data.language, { day: 'numeric', month: 'short' })}
                                            <br />
                                            {lang.getProp('connections-expire') +
                                                ' ' +
                                                new Date(connection.token_expires).toLocaleString(user.body.data.language, { day: 'numeric', month: 'short' })}
                                        </span>
                                    </div>
                                    <div className={o.buttons}>
                                        <a href={connection.app.link_privacy_policy}>{lang.getProp('connections-btn-privacy')}</a>
                                        <a href={connection.app.link_tos}>{lang.getProp('connections-btn-tos')}</a>
                                    </div>
                                </header>
                                <p className={o.title}>{lang.getProp('connections-permissions')}</p>
                                <ul>
                                    {connection.scopes.map((scope) => (
                                        <li key={scope}>{scope}</li>
                                    ))}
                                </ul>
                            </li>
                        );
                    })}
            </ul>
        </div>
    ) : (
        <div className={o.content}>
            <h1 className={o.title}>{lang.getProp('error-h1')}</h1>
            <p>{lang.getProp('error-p')}</p>
        </div>
    );
}
