import o from '@sass/article.module.sass';

export const metadata = {
    title: 'Nove | Terms of Service',
    description: 'Read about our Terms of Service and learn what we can do with your account and what you are allowed to do.',
    openGraph: {
        title: 'Nove | Terms of Service',
        description: 'Read about our Terms of Service and learn what we can do with your account and what you are allowed to do.',
        images: [],
    },
    twitter: {
        title: 'Nove | Terms of Service',
        description: `Read about our Terms of Service and learn what we can do with your account and what you are allowed to do.`,
        images: [],
    },
    keywords: ['nove', 'terms', 'tos', 'terms of service'],
};

export default function Terms() {
    return (
        <article className={o.content}>
            <h1>Terms of Service</h1>
            <h2>
                Last modified: <time>12th of August 2023</time>
            </h2>
            <p>
                By using services hosted by us (Nove) you agree to our Terms of Service and Privacy Policy. If you do not accept these, you are not allowed to use our services. All
                users have to follow Terms of Service, with no exceptions. As reminder, this document applies for all our services.
            </p>
            <p>We are not responsible for any content that is posted on user&apos;s account</p>
            <p>List of actions that we do not tolerate</p>
            <ul>
                <li>
                    NSFW and NSFL content is strictly forbidden. This includes violence, “gore” movies, and terrorist materials. NSFL stands for “Not Safe for Life”, which means
                    everything that can endanger human life.
                </li>
                <li>
                    Any pornographic material involving minors will be removed if noticed, and the associated account will be banned entirely, which will cause the removal of all
                    the data associated with it.
                </li>
                <li>
                    Any material intended to destroy (directly or indirectly) a computer or any other device is strictly prohibited. This also includes grabbers, phishing programs,
                    and account data loggers.
                </li>
                <li>Content depicting activities prohibited by local (and/or Polish) law, including federal law, is strictly forbidden.</li>
                <li>
                    By abusing our API you expose your account for possible suspension by administrators.
                    <ul>
                        <li>Sending too many requests for the same thing to the API is API abuse</li>
                        <li>Sending prepared exploits to the API is API abuse</li>
                        <li>Any discovered bugs in the API have to be imminently reported through email or Gitea Issues</li>
                    </ul>
                </li>
                <li>We cannot decrypt encrypted/password-encrypted content even for law enforcements.</li>
                <li>If we will be forced by law enforcements to show everything we got on user, we will share it with them.</li>
            </ul>
            <p>Please do not create multiple accounts. Keep things simple.</p>
            <p>We have the right to update this document without notifying our users.</p>
        </article>
    );
}
