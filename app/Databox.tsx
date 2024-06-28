import Loader from './Loader';
import o from './Databox.module.sass';
import { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler } from 'react';

export default function Databox({
    title,
    id,
    type,
    value,
    checked,
    options,
    placeholder,
    required,
    readOnly,
    description,
    navigateTrigger,
    navigateLoading,
    onChange,
    onKeyDown,
    location,
}: {
    title: string;
    id: string;
    type: string;
    value?: string;
    checked?: boolean;
    options?: { text: string; value: string }[];
    placeholder?: string;
    required?: boolean;
    readOnly?: boolean;
    description?: string;
    navigateTrigger?: MouseEventHandler<HTMLButtonElement>;
    navigateLoading?: boolean;
    onChange?: ChangeEventHandler<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>;
    onKeyDown?: KeyboardEventHandler<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement> | undefined;
    location?: MouseEventHandler<HTMLButtonElement>;
}) {
    return type === 'select' ? (
        <label className={o.npt}>
            <select id={id} name={id} defaultValue={value} required={required} aria-readonly={readOnly} onChange={onChange} onKeyDown={onKeyDown}>
                {value && (
                    <option value={value} key={value}>
                        {options?.find((v) => v.value === value)?.text || 'error'}
                    </option>
                )}
                {!readOnly &&
                    options?.map(
                        (option) =>
                            option.value !== value && (
                                <option value={option.value} key={option.value}>
                                    {option.text}
                                </option>
                            ),
                    )}
            </select>
            <p>
                {title}
                {description && <span>{description}</span>}
            </p>
        </label>
    ) : type === 'switch' ? (
        <label className={o.npt + ' ' + o.swt}>
            <label className={o.switch}>
                <input type="checkbox" id={id} name={id} defaultChecked={checked} readOnly={readOnly} onChange={onChange} onKeyDown={onKeyDown} />
                <span className={o.slider}></span>
            </label>
            <p>
                {title}
                {description && <span>{description}</span>}
            </p>
        </label>
    ) : type === 'textarea' ? (
        <label className={o.npt}>
            <textarea id={id} name={id} defaultValue={value} readOnly={readOnly} placeholder={placeholder} required={required} onChange={onChange} onKeyDown={onKeyDown} rows={5} />
            <p>
                {title}
                {description && <span>{description}</span>}
            </p>
        </label>
    ) : type === 'checkbox' ? (
        <label className={o.npt + ' ' + o.checkbox}>
            <input
                type={type}
                defaultChecked={checked}
                id={id}
                name={id}
                defaultValue={value}
                placeholder={placeholder}
                required={required}
                readOnly={readOnly}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
            <p>
                {title}
                {description && <span>{description}</span>}
            </p>
        </label>
    ) : type === 'none' ? (
        <div className={o.flex}>
            <label className={o.npt}>
                <p>
                    {title}
                    {description && <span>{description}</span>}
                </p>
            </label>
        </div>
    ) : (
        <div className={o.flex}>
            {location ? (
                <button title="Get your current location" type="button" className={o.location} onClick={location}>
                    <svg xmlns="https://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M 12 2.0097656 C 8.144 2.0097656 5.0078125 5.1479063 5.0078125 9.0039062 C 5.0078125 13.486906 10.974516 20.769172 11.228516 21.076172 L 12 22.011719 L 12.771484 21.076172 C 13.025484 20.768172 18.992188 13.486906 18.992188 9.0039062 C 18.992187 5.1469062 15.856 2.0097656 12 2.0097656 z M 12 4.0097656 C 14.753 4.0097656 16.992188 6.2509062 16.992188 9.0039062 C 16.992187 11.708906 13.878 16.361172 12 18.826172 C 10.122 16.363172 7.0078125 11.712906 7.0078125 9.0039062 C 7.0078125 6.2509062 9.247 4.0097656 12 4.0097656 z M 12 6.5 C 10.619 6.5 9.5 7.619 9.5 9 C 9.5 10.381 10.619 11.5 12 11.5 C 13.381 11.5 14.5 10.381 14.5 9 C 14.5 7.619 13.381 6.5 12 6.5 z"></path>
                    </svg>
                </button>
            ) : null}
            {navigateTrigger ? (
                <button title="Open directions" type="button" className={o.location} onClick={navigateTrigger}>
                    {navigateLoading ? (
                        <Loader type="button" />
                    ) : (
                        <svg xmlns="https://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M3,10v1l7,3l3,7h1l7-18L3,10z M13.434,16.936l-1.911-4.46l-4.46-1.911l10.425-4.054L13.434,16.936z"></path>
                        </svg>
                    )}
                </button>
            ) : null}
            <label className={o.npt}>
                <input
                    type={type}
                    id={id}
                    name={id}
                    defaultValue={value}
                    placeholder={placeholder}
                    required={required}
                    readOnly={readOnly}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                />
                <p>
                    {title}
                    {description && <span>{description}</span>}
                </p>
            </label>
        </div>
    );
}
