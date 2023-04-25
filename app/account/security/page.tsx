'use client';

import o from '~/account/page.module.sass';
import Device from './device';

export default function Security() {
    return (
        <div className={o.content}>
            <h1 className={o.title}>Security</h1>
            <div className={o.security}>
                <div className={o.card}>
                    <header>Your devices</header>
                    <p>List of most recent devices that logged in to your account this month</p>
                    <Device icon="laptop" name="Linux" date="22 Apr" ip="89.42.51.69" />
                    <Device icon="laptop" name="Linux" date="18 Apr" ip="72.92.291.43" />
                    <Device icon="phone" name="Android" date="11 Apr" ip="49.55.21.12" />
                    <p>
                        We store info about three most recent devices that logged in to your account in the last month on our servers. <a>Opt-out</a>
                    </p>
                </div>
                <div className={o.card}>
                    <header>How do you sign in</header>
                    <p>Add more secure ways of signing in to your account and confirming your identity</p>
                    <div className={o.option}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M21.694,15.28L21.694,15.28c-0.399-0.399-1.05-0.389-1.436,0.024l-1.708,1.832L17.414,16l1.293-1.293 c0.39-0.39,0.39-1.023,0-1.413l-0.001-0.001c-0.39-0.39-1.023-0.39-1.413,0L16,14.586l-3.791-3.792l0.21-0.44 c0.914-1.913,0.676-4.249-0.783-5.788C9.453,2.264,5.617,2.512,3.789,5.31C2.887,6.69,2.738,8.49,3.412,9.995 c1.212,2.708,4.29,3.689,6.745,2.518l0.637-0.305l8.499,8.499c0.39,0.39,1.023,0.39,1.413,0l0.001-0.001 c0.39-0.39,0.39-1.023,0-1.413l-0.744-0.744l1.754-1.88C22.085,16.276,22.075,15.661,21.694,15.28z M10.127,10.127 c-1.17,1.17-3.073,1.17-4.243,0c-1.17-1.17-1.17-3.073,0-4.243c1.17-1.17,3.073-1.17,4.243,0 C11.296,7.054,11.296,8.957,10.127,10.127z"></path>
                        </svg>
                        Add two factor authentication
                    </div>
                    <div className={o.option}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M 12 1 C 8.6761905 1 6 3.6761905 6 7 L 6 8 C 4.9 8 4 8.9 4 10 L 4 20 C 4 21.1 4.9 22 6 22 L 18 22 C 19.1 22 20 21.1 20 20 L 20 10 C 20 8.9 19.1 8 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 8 8 L 8 7 C 8 4.7238095 9.7238095 3 12 3 z M 12 13 C 13.1 13 14 13.9 14 15 C 14 16.1 13.1 17 12 17 C 10.9 17 10 16.1 10 15 C 10 13.9 10.9 13 12 13 z"></path>
                        </svg>
                        Password
                    </div>
                    <div className={o.option}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M 6 2 C 4.895 2 4 2.895 4 4 L 4 19 C 4 20.64497 5.3550302 22 7 22 L 19 22 A 1.0001 1.0001 0 1 0 19 20 L 7 20 C 6.4349698 20 6 19.56503 6 19 C 6 18.43497 6.4349698 18 7 18 L 19 18 A 1.0001 1.0001 0 0 0 20 16.841797 L 20 3 C 20 2.448 19.552 2 19 2 L 16 2 L 16 12 L 13 10 L 10 12 L 10 2 L 6 2 z"></path>
                        </svg>
                        Recovery passphrase
                    </div>
                    <div className={o.option}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M20,4H4C2.895,4,2,4.895,2,6v12c0,1.105,0.895,2,2,2h16c1.105,0,2-0.895,2-2V6C22,4.895,21.105,4,20,4z M19.601,8.249 l-7.071,4.42c-0.324,0.203-0.736,0.203-1.06,0l-7.071-4.42C4.151,8.094,4,7.822,4,7.53v0c0-0.666,0.733-1.072,1.297-0.719L12,11 l6.703-4.189C19.267,6.458,20,6.864,20,7.53v0C20,7.822,19.849,8.094,19.601,8.249z"></path>
                        </svg>
                        Recovery email
                    </div>
                </div>
            </div>
        </div>
    );
}
