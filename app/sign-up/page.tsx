'use client';

import Image from 'next/image';

import o from '~/login/page.module.sass';

export default function Login() {
    const handleLogin = async (event: any) => {
        event.preventDefault();
    };

    return (
        <main>
            <title>Sign up — Nove</title>
            <section className={o.login}>
                <div className={o.box}>
                    <Image src="/cdn/assets/logo.png" width={64} height={64} alt="Nove logo" />
                    <h1>New Nove account</h1>
                    <p>Complete the form and hit the sign up button to create your new Nove account.</p>
                    <form onSubmit={handleLogin}>
                        <label htmlFor="email">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                                <path
                                    fill="currentColor"
                                    d="M 10 8 C 6.86 8 4.2795313 10.42 4.0195312 13.5 L 24 24.289062 L 43.980469 13.5 C 43.720469 10.42 41.14 8 38 8 L 10 8 z M 4 16.890625 L 4 34 C 4 37.31 6.69 40 10 40 L 38 40 C 41.31 40 44 37.31 44 34 L 44 16.890625 L 24.710938 27.320312 C 24.490938 27.440312 24.25 27.5 24 27.5 C 23.75 27.5 23.509062 27.440313 23.289062 27.320312 L 4 16.890625 z"></path>
                            </svg>
                            <input type="email" id="email" placeholder="E-mail" />
                        </label>
                        <label htmlFor="username">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                                <path
                                    fill="currentColor"
                                    d="M 24 4 C 18.494917 4 14 8.494921 14 14 C 14 19.505079 18.494917 24 24 24 C 29.505083 24 34 19.505079 34 14 C 34 8.494921 29.505083 4 24 4 z M 12.5 28 C 10.032499 28 8 30.032499 8 32.5 L 8 33.699219 C 8 36.640082 9.8647133 39.277974 12.708984 41.091797 C 15.553256 42.90562 19.444841 44 24 44 C 28.555159 44 32.446744 42.90562 35.291016 41.091797 C 38.135287 39.277974 40 36.640082 40 33.699219 L 40 32.5 C 40 30.032499 37.967501 28 35.5 28 L 12.5 28 z"></path>
                            </svg>
                            <input type="text" id="username" placeholder="Username" />
                        </label>
                        <label htmlFor="password">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                                <path
                                    fill="currentColor"
                                    d="M30.5,5C23.596,5,18,10.596,18,17.5c0,1.149,0.168,2.257,0.458,3.314L5.439,33.833C5.158,34.114,5,34.496,5,34.894V41.5	C5,42.328,5.671,43,6.5,43h7c0.829,0,1.5-0.672,1.5-1.5V39h3.5c0.829,0,1.5-0.672,1.5-1.5V34h3.5c0.829,0,1.5-0.672,1.5-1.5v-3.788	C26.661,29.529,28.524,30,30.5,30C37.404,30,43,24.404,43,17.5S37.404,5,30.5,5z M32,19c-1.657,0-3-1.343-3-3s1.343-3,3-3	s3,1.343,3,3S33.657,19,32,19z"></path>
                            </svg>
                            <input type="password" id="password" placeholder="Password" />
                        </label>
                        <button type="submit">Sign up</button>
                    </form>
                </div>
            </section>
        </main>
    );
}
