import o from '@sass/article.module.sass';

export default function Terms() {
    return (
        <article className={o.content}>
            <title>Privacy Policy — Nove</title>
            <h1>Privacy Policy</h1>
            <h2>
                Last modified: <time>12th of August 2023</time>
            </h2>
            <p>
                We serve (mostly) free and open-source services. We do not track nor sell user&apos;s data to third-parties. We keep our services simple, without requests to Google
                or Facebook. We do not use tracking pixel, fingerprinting. We do not profile our user&apos;s.
            </p>
            <p>
                We use Cloudflare (pending change) to connect you with our servers. The connection is not proxied by Cloudflare servers, so you connect directly with us. That means
                Cloudflare is not able to collect any data about the traffic.
            </p>
            <p>
                We use Contabo as our infrastructure. They provide servers for us so we can keep our services running. You can read Contabo privacy policy on their{' '}
                <a href="https://contabo.com" target="_blank">
                    website
                </a>
            </p>
            <p>In our database, we only store necessary data you provided us through NAPI. Detailing</p>
            <ul>
                <li>username</li>
                <li>email</li>
                <li>account about me</li>
                <li>account language</li>
                <li>account creation date</li>
                <li>account updated date</li>
                <li>account verified state</li>
                <li>account profile public state</li>
                <li>MFA credentials</li>
                <li>your encrypted password</li>
                <li>account avatar</li>
            </ul>
            <p>
                Some of this data is accessible publicly and we provide you a tool that allows you to change the state of your profile. By that sensitive data like language,
                account bio is not shown.
            </p>
            <p>Provided email is not used for marketing purposes, we only use it to confirm your identity, notify you about new login or to confirm email change</p>
            <p>We keep the right to update this Privacy Policy without notifying users about the change.</p>
            <p>By using our services you agree to this document.</p>
            <p>Data you encrypted in our services using your password is truly encrypted and we cannot decrypt it.</p>
        </article>
    );
}
