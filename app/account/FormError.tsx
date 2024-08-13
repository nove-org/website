import o from './FormError.module.sass';

export default function FormError({ text }: { text: string }) {
    return (
        <div className={o.error}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M 12 3.0292969 C 11.436813 3.0292969 10.873869 3.2917399 10.558594 3.8164062 L 1.7617188 18.451172 C 1.1134854 19.529186 1.94287 21 3.2011719 21 L 20.796875 21 C 22.054805 21 22.886515 19.529186 22.238281 18.451172 L 13.441406 3.8164062 C 13.126131 3.29174 12.563187 3.0292969 12 3.0292969 z M 12 5.2988281 L 20.236328 19 L 3.7636719 19 L 12 5.2988281 z M 11 9 L 11 14 L 13 14 L 13 9 L 11 9 z M 11 16 L 11 18 L 13 18 L 13 16 L 11 16 z"></path>
            </svg>
            {text}
        </div>
    );
}
