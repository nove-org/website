import o from './Security.module.sass';
import type { Device } from '@util/helpers/Schema';

export default function Device({ device, lang }: { device: Device; lang: string }) {
    return (
        <li>
            <div className={o.info}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M19,20.5v-17C19,2.12,17.88,1,16.5,1h-9C6.12,1,5,2.12,5,3.5v17C5,21.88,6.12,23,7.5,23h9C17.88,23,19,21.88,19,20.5z M17,21H7L7,3h1.625l0.724,1.447C9.518,4.786,9.864,5,10.243,5h3.472c0.379,0,0.725-0.214,0.894-0.553L15.333,3H17V21z"></path>
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
