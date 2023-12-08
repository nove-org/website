import o from '@sass/account/security/page.module.sass';

export default function Card({ object, addr, date, name }: { object: 'mobile' | 'desktop'; name: string; addr: string; date: string }) {
    return (
        <li>
            <header>
                {object === 'mobile' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M19,20.5v-17C19,2.12,17.88,1,16.5,1h-9C6.12,1,5,2.12,5,3.5v17C5,21.88,6.12,23,7.5,23h9C17.88,23,19,21.88,19,20.5z M16.5,21h-9C7.224,21,7,20.776,7,20.5l0-17C7,3.224,7.224,3,7.5,3h1.125l0.724,1.447C9.518,4.786,9.864,5,10.243,5h3.472 c0.379,0,0.725-0.214,0.894-0.553L15.333,3H16.5C16.776,3,17,3.224,17,3.5v17C17,20.776,16.776,21,16.5,21z"></path>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M 4 4 C 2.897 4 2 4.897 2 6 L 2 16 C 2 17.103 2.897 18 4 18 L 1 18 C 0.448 18 0 18.448 0 19 C 0 19.552 0.448 20 1 20 L 23 20 C 23.552 20 24 19.552 24 19 C 24 18.448 23.552 18 23 18 L 20 18 C 21.103 18 22 17.103 22 16 L 22 6 C 22 4.897 21.103 4 20 4 L 4 4 z M 4 6 L 20 6 L 20.001953 16 L 4 16 L 4 6 z"></path>
                    </svg>
                )}

                <div className={o.align}>
                    {name}
                    <span>{addr}</span>
                </div>
            </header>
            <p>{date}</p>
        </li>
    );
}
