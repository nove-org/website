export interface Response<T> {
    status: number;
    body: {
        data: T;
        error: {
            code: string;
            doc_url: string;
            message: string;
            param: string;
            type: string;
            details?: any;
        };
    };
    meta: {
        timestamp: string;
        version: string;
    };
}

export interface User {
    avatar: string;
    id: string;
    email: string;
    bio: string;
    username: string;
    language: string;
    createdAt: string;
    updatedAt: string;
}
