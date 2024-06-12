import Image from 'next/image';
import o from './Footer.module.sass';
import NAPI from '@util/helpers/NAPI';
import { cookies, headers } from 'next/headers';
import LanguageHandler from '@util/handlers/LanguageHandler';
import Link from 'next/link';

export default async function Footer() {
    const api = new NAPI(cookies().get('napiAuthorizationToken')?.value);
    const user = await api.user().get({ caching: true });
    const lang = await new LanguageHandler('modules/footer', user).init(headers());

    return (
        <footer className={o.box}>
            <header>
                <div className={o.logo}>
                    <Image src="/logo_w.png" width={20} height={20} alt="Logo: N letter" />
                    Nove
                </div>
                <p>&copy; 2019-{new Date().getFullYear() + ' ' + lang.getProp('license', { license: 'GNU AGPL v3' })}</p>
                <p
                    dangerouslySetInnerHTML={{
                        __html: lang.getProp('made-with-love', {
                            contributors: `<a href="${process.env.SOURCE_CODE}" rel="noreferrer noopener nofollow">${lang.getProp('contributors')}</a>`,
                        }),
                    }}
                />
            </header>
            <div className={o.links}>
                <div className={o.category}>
                    <h2>{lang.getProp('ul-general')}</h2>
                    <Link href="/about">{lang.getProp('ul-about')}</Link>
                    <Link href="/blog">{lang.getProp('ul-blog')}</Link>
                    <a rel="noreferrer noopener nofollow" href={process.env.DONATE_LINK}>
                        {lang.getProp('ul-donate')}
                    </a>
                    <Link href="/login">{lang.getProp('ul-login')}</Link>
                    <a rel="noreferrer noopener nofollow" href={'mailto:' + process.env.SUPPORT_MAIL}>
                        {lang.getProp('ul-support')}
                    </a>
                </div>
                <div className={o.category}>
                    <h2>{lang.getProp('ul-documents')}</h2>
                    <a rel="noreferrer noopener nofollow" href={process.env.SOURCE_CODE}>
                        {lang.getProp('ul-src')}
                    </a>
                    <Link href="/privacy">{lang.getProp('ul-privacy')}</Link>
                    <Link href="/terms">{lang.getProp('ul-terms')}</Link>
                    <a rel="noreferrer noopener nofollow" href={process.env.SOURCE_CODE + '/wiki'}>
                        {lang.getProp('ul-docs')}
                    </a>
                </div>
            </div>
        </footer>
    );
}
