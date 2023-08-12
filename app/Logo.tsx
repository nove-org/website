'use client';

import { NextPage } from 'next';
import o from '@sass/Logo.module.sass';

interface Props {
    size: number;
}

const Logo: NextPage<Props> = ({ size }) => {
    return (
        <>
            <svg className={o.dark} width={size} height={size} viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_575_2)">
                    <rect x="2.6958" y="1.92102" width="90.1882" height="245.968" rx="45.0941" fill="url(#paint0_angular_575_2)" />
                    <rect x="-16" y="46.8539" width="90.3031" height="309.919" rx="45.1516" transform="rotate(-45 -16 46.8539)" fill="url(#paint1_linear_575_2)" />
                    <rect x="158.267" y="1.92102" width="90.1882" height="245.968" rx="45.0941" fill="url(#paint2_linear_575_2)" />
                </g>
                <defs>
                    <radialGradient
                        id="paint0_angular_575_2"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(66.4759 99.8134) rotate(121.371) scale(150.543 158.354)">
                        <stop stopColor="#1C1919" />
                        <stop offset="1" stopColor="#111111" />
                    </radialGradient>
                    <linearGradient id="paint1_linear_575_2" x1="29.1515" y1="46.8539" x2="29.1515" y2="356.773" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#484848" />
                        <stop offset="1" stopColor="#040303" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_575_2" x1="345.408" y1="22.4183" x2="191.231" y2="248.091" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#111016" />
                        <stop offset="1" stopColor="#1A1818" />
                    </linearGradient>
                    <clipPath id="clip0_575_2">
                        <rect width="250" height="250" fill="white" />
                    </clipPath>
                </defs>
            </svg>
            <svg className={o.light} width={size} height={size} viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2110_10)">
                    <rect x="2.6958" y="1.92102" width="90.1882" height="245.968" rx="45.0941" fill="url(#paint0_angular_2110_10)" />
                    <rect x="-16" y="46.8539" width="90.3031" height="309.919" rx="45.1516" transform="rotate(-45 -16 46.8539)" fill="url(#paint1_linear_2110_10)" />
                    <rect x="158.267" y="1.92102" width="90.1882" height="245.968" rx="45.0941" fill="url(#paint2_linear_2110_10)" />
                </g>
                <defs>
                    <radialGradient
                        id="paint0_angular_2110_10"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(66.4759 99.8134) rotate(121.371) scale(150.543 158.354)">
                        <stop stopColor="#F9F2F2" />
                        <stop offset="1" stopColor="#E8D8D8" />
                    </radialGradient>
                    <linearGradient id="paint1_linear_2110_10" x1="29.1515" y1="46.8539" x2="29.1515" y2="356.773" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E1D6D6" />
                        <stop offset="1" stopColor="white" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_2110_10" x1="345.408" y1="22.4183" x2="191.231" y2="248.091" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="#E4DCDC" />
                    </linearGradient>
                    <clipPath id="clip0_2110_10">
                        <rect width="250" height="250" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </>
    );
};

export default Logo;
