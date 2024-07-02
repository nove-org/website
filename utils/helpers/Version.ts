import { execSync } from 'child_process';
import pkg from '../../package.json';

export default class Version {
    public static get(): string {
        const hash = execSync('git rev-parse --short HEAD').toString().trim();
        return `${pkg.version}-${hash}`;
    }
}
