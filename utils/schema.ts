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
    verified: boolean;
    profilePublic: boolean;
    trackActivity: boolean;
    mfaEnabled: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Device {
    id: string;
    userId: string;
    ip: string;
    device: 'mobile' | 'desktop';
    os_name: string;
    os_version: string;
    createdAt: string;
    updatedAt: string;
}
