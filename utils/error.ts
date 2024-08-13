import { Response } from '@util/schema';

export default class ErrorParser {
    public static parse(err: Response<undefined>) {
        const text: string[] = [];

        if (err?.body?.error?.details)
            err.body.error.details.map((detail) =>
                detail?.validation !== 'regex'
                    ? text.push(`${detail?.path || 'unknown'}: ${detail?.message || 'Something went horribly wrong'} [${detail?.code || detail?.validation || 'unknown'}]`)
                    : null,
            );
        else if (err?.body?.error) text.push(`${err.body.error?.param?.split(':')[1] || 'unknown'}: ${err.body.error?.message || 'No message'}`);
        else text.push(`error: Unknown error occurred (are servers offline?)`);

        return text.join('\n');
    }
}
