/* 
 Tool to manage your Nove account through NAPI
 Copyright (C) 2019 Nove Group

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import LanguageHandler from '@util/handlers/LanguageHandler';
import o from './page.module.sass';
import { cookies, headers } from 'next/headers';
import NAPI from '@util/helpers/NAPI';

export async function generateMetadata() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const lang = await new LanguageHandler('main/landing', user).init(headers());
    const title: string = `${lang.getProp('title')} | Nove`;
    const description: string = 'Ditch the government, Google, Facebook and others that share data, profile and track you. Take back control over this.';

    return {
        title,
        description,
        openGraph: { title, description },
        twitter: { card: 'summary_large_image', title, description },
    };
}

export default async function Home() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const lang = await new LanguageHandler('main/landing', user).init(headers());

    return (
        <>
            <section className={o.hero}>
                <h1 dangerouslySetInnerHTML={{ __html: lang.getProp('hero-h1') }} />
                <p>{lang.getProp('hero-description')}</p>
            </section>
        </>
    );
}
