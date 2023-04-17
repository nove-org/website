'use client';

import { NextPage } from 'next';

import ss from '~/loader.module.sass';

const Loader: NextPage = () => {
    return (
        <div className={ss.loaderContainer}>
            <div className={ss.loader}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loader;
