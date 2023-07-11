import o from '~/page.module.sass';

export default function Home() {
    return (
        <section className={o.hero}>
            <svg className={o.top} width="398" height="414" viewBox="0 0 398 414" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_129_277)">
                    <path d="M398.366 304.581C-87.4477 597.456 169.864 164.052 0.339547 -2.96743" stroke="url(#paint0_linear_129_277)" strokeWidth="3" />
                    <path d="M404.814 320.509C-9.78467 591.199 193.939 164.303 33.9129 -15.5305" stroke="url(#paint1_linear_129_277)" strokeWidth="3" />
                </g>
                <defs>
                    <linearGradient id="paint0_linear_129_277" x1="261.774" y1="377.542" x2="104.764" y2="-42.0433" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#DD0B0B" />
                        <stop offset="0.895833" stopColor="#DB3283" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_129_277" x1="287.709" y1="387.056" x2="124.392" y2="-49.3878" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#DD0B0B" />
                        <stop offset="0.895833" stopColor="#DB3283" />
                    </linearGradient>
                    <clipPath id="clip0_129_277">
                        <rect width="398" height="414" fill="white" />
                    </clipPath>
                </defs>
            </svg>

            <h1>
                Meet the world where <span>privacy</span> is on the first place
            </h1>
            <p>We code websites, tools, software. We are Nove, with an unexpected focus on privacy and all of the tools you expect.</p>
            <ul>
                <li>
                    <a>
                        Sign up today
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 30 30">
                            <path
                                fill="currentColor"
                                d="M 9.9902344 3.9902344 A 1.0001 1.0001 0 0 0 9.2929688 5.7070312 L 18.585938 15 L 9.2929688 24.292969 A 1.0001 1.0001 0 1 0 10.707031 25.707031 L 20.707031 15.707031 A 1.0001 1.0001 0 0 0 20.707031 14.292969 L 10.707031 4.2929688 A 1.0001 1.0001 0 0 0 9.9902344 3.9902344 z"></path>
                        </svg>
                    </a>
                </li>
            </ul>
            <svg className={o.bottom} width="270" height="467" viewBox="0 0 270 467" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_129_250)">
                    <path d="M-2 54.7776C488.437 -45.7766 142.902 259.388 231.059 468" stroke="url(#paint0_linear_129_250)" strokeWidth="3" />
                    <path d="M-2 40.4628C431.707 -63.5748 126.141 252.161 204.1 468" stroke="url(#paint1_linear_129_250)" strokeWidth="3" />
                    <path d="M-2 23.2849C374.977 -84.9328 109.38 243.489 177.142 468" stroke="url(#paint2_linear_129_250)" strokeWidth="3" />
                </g>
                <defs>
                    <linearGradient id="paint0_linear_129_250" x1="133" y1="35" x2="133" y2="468" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E81493" />
                        <stop offset="0.432292" stopColor="#CC3690" />
                        <stop offset="1" stopColor="#D21930" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_129_250" x1="117.384" y1="20" x2="117.384" y2="468" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E81493" />
                        <stop offset="0.432292" stopColor="#CC3690" />
                        <stop offset="1" stopColor="#D21930" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_129_250" x1="101.769" y1="2" x2="101.769" y2="468" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E81493" />
                        <stop offset="0.432292" stopColor="#CC3690" />
                        <stop offset="1" stopColor="#D21930" />
                    </linearGradient>
                    <clipPath id="clip0_129_250">
                        <rect width="270" height="467" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </section>
    );
}
