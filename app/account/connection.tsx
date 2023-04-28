'use client';

import { NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';

import o from '~/account/connections.module.sass';

interface Props {
    data: {
        name: string;
        permissionLevel: number;
        logo: string;
    };
}

const Connection: NextPage<Props> = ({ data }) => {
    return (
        <div className={o.card}>
            <div className={o.info}>
                <Image src={data.logo} width={24} height={24} alt="Connection logo" />
                <header>
                    <h1>{data.name}</h1>
                    <span>{data.permissionLevel === 0 ? 'Basic level of account access' : 'Full access to your account'}</span>
                </header>
            </div>
            <button>Deauthorize</button>
        </div>
    );
};

export default Connection;
