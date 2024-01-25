import { axiosClient } from '@util/axios';
import { Response, Languages, User } from '@util/schema';

export function errorHandler(err: Response<null>): string {
    const text: string[] = [];

    if (err?.body?.error?.details)
        err.body.error.details.map((detail) =>
            detail?.validation !== 'regex' ? text.push(`${detail.path}: ${detail.message} [${detail?.code || detail?.validation || 'unknown'}]`) : null
        );
    else if (err.body.error) text.push(`${err.body.error?.param.split(':')[1]}: ${err.body.error?.message || 'No message'}`);
    else text.push(`error: Unknown error occurred (are servers offline?)`);

    return text.join('\n');
}

export function getLanguages(): Promise<Languages | undefined> {
    return new Promise(async (resolve) => {
        const languages: Response<Languages> = (await axiosClient.get('/v1/languages').catch((e) => e.response))?.data;

        resolve(languages?.body?.data);
    });
}
