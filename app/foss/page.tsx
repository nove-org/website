import o from '@sass/foss.module.sass';

export default function FOSS() {
    return (
        <section className={o.hero}>
            <h1 className={o.title}>
                We love <span>free</span> and <span>open source</span>.
            </h1>
            <p className={o.desc}>
                Because <b>open-source</b> software takes essential part in working together, protecting users privacy, and ensuring app reliability.
            </p>
            <ul>
                <li>
                    <a target="_blank" href="https://github.com/nove-org/NAPI">
                        <h1>NAPI</h1>
                        <p>Create your desired applications with use of NAPI OAuth2 system which provides access to signing in with Nove.</p>
                    </a>
                </li>
                <li>
                    <a target="_blank" href="https://github.com/nove-org/website">
                        <h1>Manager</h1>
                        <p>Official website that is used by Nove on their main domain to serve graphical access to the NAPI.</p>
                    </a>
                </li>
                <li>
                    <a target="_blank" href="https://github.com/nove-org/files.backend">
                        <h1>Files</h1>
                        <p>General purpose private cloud with password encrypted uploads available to everyone with just one click.</p>
                    </a>
                </li>
            </ul>
        </section>
    );
}
