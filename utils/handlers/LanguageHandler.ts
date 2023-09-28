import { readFileSync } from 'fs';
import { jsonc } from 'jsonc';
import { User } from '@util/schema';
import ObjectHelper from '@util/helpers/Object';

export default class LanguageHandler {
    private name: string;
    private category: string;
    private language: string;
    private file: any;
    private props: string | undefined;

    constructor(path: string, user: User) {
        this.category = path.split('/')[0];
        this.name = path.split('/')[1];
        this.language = user?.language || 'en-US';
    }

    public async init() {
        const file = jsonc.parse(readFileSync(`./languages/${this.language}.jsonc`).toString());

        if (!file) throw new ReferenceError(`LanguageHandler: Error while parsing ${this.language}.jsonc`);
        else this.file = file;

        if (!this.file.hasOwnProperty(this.category))
            throw new ReferenceError(`LanguageHandler: Error while parsing ${this.language}.jsonc: category "${this.category}" was not found`);

        if (!this.file[this.category].hasOwnProperty(this.name))
            throw new ReferenceError(`LanguageHandler: Error while parsing ${this.language}.jsonc: file reference "${this.name}" was not found`);

        this.props = this.file[this.category][this.name];

        return this;
    }

    public getProp(path: string) {
        const propValue = ObjectHelper.getValueByStringPath(this.props, path);

        if (!propValue) throw new ReferenceError(`LanguageHandler: Error while parsing ${this.language}.jsonc: prop "${path}" does not exist`);

        return propValue;
    }
}
