import o from '@sass/article.module.sass';

export const metadata = {
    title: 'Nove | Privacy Policy',
    description: 'Learn how we process information about you and what we are allowed to know.',
    openGraph: {
        title: 'Nove | Privacy Policy',
        description: 'Learn how we process information about you and what we are allowed to know.',
        images: [],
    },
    twitter: {
        title: 'Nove | Privacy Policy',
        description: `Learn how we process information about you and what we are allowed to know.`,
        images: [],
    },
    keywords: ['nove', 'privacy', 'privacy policy'],
};

export default function Terms() {
    return (
        <article className={o.content}>
            <title>Nove | Privacy Policy</title>
            <h1>Privacy Policy</h1>
            <h2>
                Last modified: <time>19th of September 2023</time>
            </h2>
            <p>
                We serve (mostly) free and open-source services. We do not track nor sell user&apos;s data to third-parties. We keep our services simple, without requests to Google
                or Facebook. We do not use tracking pixel or fingerprinting. We do not profile our user&apos;s.
            </p>
            <p>
                To delete your account go to Security section on the Account page, then scroll down to &quot;Delete Nove account&quot;. All your data will be deleted as fast as
                possible and as smooth as possible. This will change in the future.
            </p>
            <p>
                FTDL provide for us server infrastructure (located in Krakow, Poland) so we can make our services accessible to anyone. You can read about them on their{' '}
                <a href="https://ftdl.pl/services/" rel="noopener noreferrer" target="_blank">
                    website
                </a>
                . Administrator of your data is Nove (<a href="mailto:reply@nove.team">reply@nove.team</a>)
            </p>
            <p>In our database, we only store necessary info you provided us through NAPI. Detailing</p>
            <ul>
                <li>username (shown always)</li>
                <li>email (not shown)</li>
                <li>account about me (not shown on private profile)</li>
                <li>account language (not shown on private profile)</li>
                <li>account creation date (not shown on private profile)</li>
                <li>account updated date (not shown)</li>
                <li>account verified state (not shown)</li>
                <li>account profile public state (shown)</li>
                <li>MFA credentials (not shown)</li>
                <li>your encrypted password (not shown)</li>
                <li>account avatar (shown)</li>
            </ul>
            <p>
                Some of this info is accessible publicly and we provide you a tool that allows you to change the state of your profile. Sensitive data like language, account about
                me is not displayed if you change your profile to private.
            </p>
            <p>Provided email is not used for marketing purposes, we only use it to confirm your identity, notify you about new login or to confirm email change</p>
            <p>We keep the right to update this Privacy Policy without notifying users about the change.</p>
            <p>By using our services you agree to this document.</p>
            <p>Data you have encrypted in our services using your password is truly encrypted and we cannot decrypt it.</p>
            <p>We can delete accounts if they are not verified and inactive for at least 3 days.</p>
            <p>We can delete accounts for violation of our Terms of Service</p>
            <p>
                Every account deletion that is performed by a service administrator always have a reason which is known to the owner of the deleted account after or few days before
                deletion.
            </p>
            <p>If a user lost access to their account, they can request password reset or account deletion through the mail their provided to us</p>
            <p>We keep user account data as long as they have account in NAPI, which can be deleted through the Security tab on the Account page.</p>
            <p>
                If you opt-out from features like &quot;Your devices&quot; in &quot;Security&quot; tab, everything collected through this feature is automatically deleted with no
                going back. We can collect it if you opt-in again.
            </p>
        </article>
    );
}
