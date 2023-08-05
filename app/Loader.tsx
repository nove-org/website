import { NextPage } from 'next';

import o from '@sass/Loader.module.sass';

interface Props {
    type?: 'classic' | 'window' | 'button' | 'hidden';
    text?: string;
}

const Loader: NextPage<Props> = ({ type, text }) => {
    return (
        <div className={type === 'button' ? o.loaderButton : type === 'window' || type === 'hidden' ? o.loaderWindow : o.loaderClassic}>
            {type === 'hidden' ? null : (
                <div className={o.loader}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            )}
            {text ? <p className={o.text}>{text}</p> : null}
        </div>
    );
};

export default Loader;
