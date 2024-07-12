import o from '../Blog.module.sass';
import LanguageHandler from '@util/handlers/LanguageHandler';
import NAPI from '@util/helpers/NAPI';
import { cookies, headers } from 'next/headers';

export async function generateMetadata() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const lang = await new LanguageHandler('documents/privacy-policy', user).init(headers());
    const title: string = `${lang.getProp('title')} | Nove`;
    const description: string = 'Learn how we process information about you and what we are allowed to know.';

    return {
        title,
        description,
        openGraph: { title, description },
        twitter: { title, description },
    };
}

export default async function Privacy() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const lang = await new LanguageHandler('documents/privacy-policy', user).init(headers());

    return (
        <article className={o.blog}>
            <div className={o.content}>
                <h1>{lang.getProp('title')}</h1>
                <time>
                    {lang.getProp('last-modified', {
                        time: new Date(2024, 6, 12).toLocaleString(user?.language || 'en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
                    })}
                </time>
                <p>{lang.getProp('s1-p1')}</p>
                <p>{lang.getProp('s1-p2')}</p>
                <h2>{lang.getProp('s2')}</h2>
                <p>{lang.getProp('s2-p1')}</p>
                <ul>
                    <li
                        dangerouslySetInnerHTML={{
                            __html: lang.getProp('u1-l1', { emails: '<a href="mailto:reply@nove.team">reply@nove.team</a>, <a href="mailto:matt@nove.team">matt@nove.team</a>' }),
                        }}
                    />
                    <li dangerouslySetInnerHTML={{ __html: lang.getProp('u1-l2', { link: '<a href="https://mastodon.nove.team/@nove">@nove@nove.team</a>' }) }} />
                </ul>
                <h2>{lang.getProp('s3')}</h2>
                <p>{lang.getProp('s3-p1')}</p>
                <ul>
                    <li>{lang.getProp('u2-l1')}</li>
                    <li>{lang.getProp('u2-l2')}</li>
                    <li>{lang.getProp('u2-l3')}</li>
                    <li>{lang.getProp('u2-l4')}</li>
                </ul>
                <p dangerouslySetInnerHTML={{ __html: lang.getProp('s3-p2', { link: '<a href="https://uodo.gov.pl">https://uodo.gov.pl</a>' }) }} />
                <h2>{lang.getProp('s4')}</h2>
                <p>{lang.getProp('s4-p1')}</p>
                <ul>
                    <li>{lang.getProp('u3-l1')}</li>
                    <li>{lang.getProp('u3-l2')}</li>
                </ul>
                <table>
                    <tbody>
                        <tr>
                            <th>{lang.getProp('th-1')}</th>
                            <th>{lang.getProp('th-2')}</th>
                            <th>{lang.getProp('th-3')}</th>
                            <th>{lang.getProp('th-4')}</th>
                        </tr>
                        <tr>
                            <td>{lang.getProp('td-username')}</td>
                            <td>{lang.getProp('td-visible')}</td>
                            <td>{lang.getProp('td-visible')}</td>
                            <td>{lang.getProp('td-not-encrypted')}</td>
                        </tr>
                        <tr>
                            <td>{lang.getProp('td-avatar')}</td>
                            <td>{lang.getProp('td-visible')}</td>
                            <td>{lang.getProp('td-visible')}</td>
                            <td>{lang.getProp('td-not-encrypted')}</td>
                        </tr>
                        <tr>
                            <td>{lang.getProp('td-bio')}</td>
                            <td>{lang.getProp('td-visible')}</td>
                            <td>{lang.getProp('td-hidden')}</td>
                            <td>{lang.getProp('td-encrypted-private', { marks: '¹' })}</td>
                        </tr>
                        <tr>
                            <td>{lang.getProp('td-website')}</td>
                            <td>{lang.getProp('td-visible')}</td>
                            <td>{lang.getProp('td-hidden')}</td>
                            <td>{lang.getProp('td-encrypted-private', { marks: '¹' })}</td>
                        </tr>
                        <tr>
                            <td>{lang.getProp('td-language')}</td>
                            <td>{lang.getProp('td-visible')}</td>
                            <td>{lang.getProp('td-hidden')}</td>
                            <td>{lang.getProp('td-encrypted-private', { marks: '¹' })}</td>
                        </tr>
                        <tr>
                            <td>{lang.getProp('td-creation')}</td>
                            <td>{lang.getProp('td-visible')}</td>
                            <td>{lang.getProp('td-hidden')}</td>
                            <td>{lang.getProp('td-not-encrypted')}</td>
                        </tr>
                        <tr>
                            <td>{lang.getProp('td-email')}</td>
                            <td>{lang.getProp('td-hidden')}</td>
                            <td>{lang.getProp('td-hidden')}</td>
                            <td>{lang.getProp('td-not-encrypted')}</td>
                        </tr>
                        <tr>
                            <td>{lang.getProp('td-pgp')}</td>
                            <td>{lang.getProp('td-hidden')}</td>
                            <td>{lang.getProp('td-hidden')}</td>
                            <td>{lang.getProp('td-not-encrypted')}</td>
                        </tr>
                        <tr>
                            <td>{lang.getProp('td-permissions')}</td>
                            <td>{lang.getProp('td-hidden')}</td>
                            <td>{lang.getProp('td-hidden')}</td>
                            <td>{lang.getProp('td-not-encrypted')}</td>
                        </tr>
                        <tr>
                            <td>{lang.getProp('td-token')}</td>
                            <td>{lang.getProp('td-hidden')}</td>
                            <td>{lang.getProp('td-hidden')}</td>
                            <td>{lang.getProp('td-fully-encrypted', { marks: '' })}</td>
                        </tr>
                        <tr>
                            <td>{lang.getProp('td-password')}</td>
                            <td>{lang.getProp('td-hidden')}</td>
                            <td>{lang.getProp('td-hidden')}</td>
                            <td>{lang.getProp('td-fully-encrypted', { marks: '' })}</td>
                        </tr>
                        <tr>
                            <td>{lang.getProp('td-mfa')}</td>
                            <td>{lang.getProp('td-na')}</td>
                            <td>{lang.getProp('td-na')}</td>
                            <td>{lang.getProp('td-unknown')}</td>
                        </tr>
                        <tr>
                            <td>{lang.getProp('td-recovery')}</td>
                            <td>{lang.getProp('td-na')}</td>
                            <td>{lang.getProp('td-na')}</td>
                            <td>{lang.getProp('td-unknown')}</td>
                        </tr>
                        <tr>
                            <td>{lang.getProp('td-devices')}</td>
                            <td>{lang.getProp('td-na')}</td>
                            <td>{lang.getProp('td-na')}</td>
                            <td>{lang.getProp('td-fully-encrypted', { marks: '' })}</td>
                        </tr>
                        <tr>
                            <td>{lang.getProp('td-oauth2-tokens')}</td>
                            <td>{lang.getProp('td-na')}</td>
                            <td>{lang.getProp('td-na')}</td>
                            <td>{lang.getProp('td-fully-encrypted', { marks: '¹' })}</td>
                        </tr>
                        <tr>
                            <td>{lang.getProp('td-oauth2s')}</td>
                            <td>{lang.getProp('td-na')}</td>
                            <td>{lang.getProp('td-na')}</td>
                            <td>{lang.getProp('td-encryption-available', { marks: '¹ ²' })}</td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    {lang.getProp('s4-p2')}
                    <br />
                    {lang.getProp('s4-p3')}
                </p>
                <p>{lang.getProp('s4-p4')}</p>
                <h2>{lang.getProp('s5')}</h2>
                <p>{lang.getProp('s5-p1')}</p>
                <ul>
                    <li
                        dangerouslySetInnerHTML={{
                            __html: lang.getProp('u4-l1', { link: '<a href="https://ftdl.pl">https://ftdl.pl</a>', mail: '<a href="mailto:biuro@ftdl.pl">biuro@ftdl.pl</a>' }),
                        }}
                    />
                    <li dangerouslySetInnerHTML={{ __html: lang.getProp('u4-l2', { link: '<a href="https://ovhcloud.com">https://ovhcloud.com</a>' }) }} />
                    <li dangerouslySetInnerHTML={{ __html: lang.getProp('u4-l3', { link: '<a href="https://mastodon.nove.team/@nove">@nove@nove.team</a>' }) }} />
                </ul>
                <p>{lang.getProp('s5-p2')}</p>
                <h2>{lang.getProp('s6')}</h2>
                <p>{lang.getProp('s6-p1')}</p>
                <h2>{lang.getProp('s7')}</h2>
                <ul>
                    <li>{lang.getProp('u5-l1')}</li>
                    <li>{lang.getProp('u5-l2')}</li>
                    <li>{lang.getProp('u5-l3')}</li>
                    <li>{lang.getProp('u5-l4')}</li>
                    <li>{lang.getProp('u5-l5')}</li>
                </ul>
            </div>
        </article>
    );
}
