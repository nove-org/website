export const dynamic = 'force-dynamic';
import Logo from '../Logo';
import o from '@sass/login.module.sass';
import LanguageHandler from '@util/handlers/LanguageHandler';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import ResetForm from './Form';
import { getUser } from '@util/helpers/User';
import ObjectHelper from '@util/helpers/Object';
import ConfirmForm from './ConfirmForm';

export async function generateMetadata() {
    const lang = await new LanguageHandler('main/password-reset', await getUser()).init(headers());
    const title: string = `${lang.getProp('hero-h1')} | Nove`;

    return {
        title,
        openGraph: { title },
        twitter: { title },
    };
}

export default async function PasswordReset({ searchParams }: { searchParams: [key: string | string[]] | undefined }) {
    const user = await getUser();
    const key = ObjectHelper.getValueByStringPath(searchParams, 'key');
    if (user?.username) return redirect('/account');
    const lang = await new LanguageHandler('main/password-reset', user).init(headers());

    return !key ? (
        <section className={o.box}>
            <div className={o.content}>
                <Logo size={48} />
                <div className={o.flex}>
                    <aside>
                        <h1>{lang.getProp('hero-h1')}</h1>
                        <p>{lang.getProp('hero-p')}</p>
                    </aside>
                    <ResetForm
                        lang={{
                            inputBtn: lang.getCustomProp('modules.actions.proceed'),
                            inputEmail: lang.getProp('input-email'),
                            inputNewPassword: lang.getProp('input-new-password'),
                            success: lang.getProp('request-success'),
                        }}
                    />
                </div>
            </div>
        </section>
    ) : (
        <section className={o.box}>
            <div className={o.content}>
                <Logo size={48} />
                <div className={o.flex}>
                    <aside>
                        <h1>Confirm password reset</h1>
                        <p>Type your new password again to confirm</p>
                    </aside>
                    <ConfirmForm
                        code={key}
                        lang={{
                            inputBtn: lang.getCustomProp('modules.actions.proceed'),
                            inputNewPassword: lang.getProp('input-new-password'),
                            success: lang.getProp('request-success'),
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
