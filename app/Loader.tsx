import o from './Loader.module.sass';

export default function Loader({ type, text }: { type?: 'classic' | 'window' | 'button' | 'hidden'; text?: string }) {
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
}
