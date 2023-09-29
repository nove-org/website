import { readFileSync } from 'fs';
import { jsonc } from 'jsonc';
import { User } from '@util/schema';
import ObjectHelper from '@util/helpers/Object';
import { browser } from 'process';

export default class LanguageHandler {
    private name: string;
    private category: string;
    private language: string | undefined;
    private file: any;
    private props: string | undefined;

    constructor(path: string, user: User) {
        this.category = path.split('/')[0];
        this.name = path.split('/')[1];
        this.language = user?.language;
    }

    public async init(browserLanguage?: string | undefined) {
        if (!browserLanguage) browserLanguage = 'en-US';
        if (!browserLanguage.split('-')[1] && !this.language) this.language = `${browserLanguage}-${browserLanguage.toUpperCase()}`;
        else if (!this.language) this.language = browserLanguage;

        try {
            this.file = jsonc.parse(readFileSync(`./languages/${this.language}.jsonc`).toString());
        } catch {
            this.file = jsonc.parse(readFileSync(`./languages/en-US.jsonc`).toString());
        }

        if (!this.file.hasOwnProperty(this.category))
            throw new ReferenceError(`LanguageHandler: Error while parsing ${this.language}.jsonc: category "${this.category}" was not found`);

        if (!this.file[this.category].hasOwnProperty(this.name))
            throw new ReferenceError(`LanguageHandler: Error while parsing ${this.language}.jsonc: file reference "${this.name}" was not found`);

        this.props = this.file[this.category][this.name];

        return this;
    }

    public getProp(path: string, vars?: object) {
        let propValue: string = ObjectHelper.getValueByStringPath(this.props, path);

        if (!propValue) throw new ReferenceError(`LanguageHandler: Error while parsing ${this.language}.jsonc: prop "${path}" does not exist`);

        if (vars)
            for (const [key, value] of Object.entries(vars)) {
                propValue = propValue.replaceAll('{' + key + '}', value);
            }

        return propValue;
    }
}
