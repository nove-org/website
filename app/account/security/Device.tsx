import o from './Security.module.sass';
import type { Device } from '@util/schema';

export default function Device({ device, lang }: { device: Device; lang: string }) {
    return (
        <li>
            <div className={o.info}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d={
                            device.device === 'desktop'
                                ? 'M 4 4 C 2.897 4 2 4.897 2 6 L 2 16 C 2 17.103 2.897 18 4 18 L 1 18 C 0.448 18 0 18.448 0 19 C 0 19.552 0.448 20 1 20 L 23 20 C 23.552 20 24 19.552 24 19 C 24 18.448 23.552 18 23 18 L 20 18 C 21.103 18 22 17.103 22 16 L 22 6 C 22 4.897 21.103 4 20 4 L 4 4 z M 4 6 L 20 6 L 20.001953 16 L 4 16 L 4 6 z'
                                : 'M19,20.5v-17C19,2.12,17.88,1,16.5,1h-9C6.12,1,5,2.12,5,3.5v17C5,21.88,6.12,23,7.5,23h9C17.88,23,19,21.88,19,20.5z M17,21H7L7,3h1.625l0.724,1.447C9.518,4.786,9.864,5,10.243,5h3.472c0.379,0,0.725-0.214,0.894-0.553L15.333,3H17V21z'
                        }></path>
                </svg>
                <div className={o.data}>
                    <h1>
                        {device.os_name} {device.os_version}
                    </h1>
                    <p>{device.ip}</p>
                </div>
            </div>
            <time>{new Date(device.updatedAt).toLocaleDateString(lang, { year: 'numeric', month: 'short', day: 'numeric' })}</time>
        </li>
    );
}
