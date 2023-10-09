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
            details?: {
                code: string;
                minimum: number;
                maximum: number;
                type: string;
                inclusive: boolean;
                message: string;
                path: string[];
            }[];
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
    disabled: boolean;
    permissionLevel: number;
    createdAt: string;
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

export interface Connection {
    id: string;
    user_id: string;
    app_id: string;
    scopes: string[];
    redirect_uri: string;
    token_expires: string;
    createdAt: string;
    updatedAt: string;
    app: {
        client_id: string;
        name: string;
        description: string;
        link_homepage: string;
        owner: string;
        link_privacy_policy: string;
        link_tos: string;
        redirect_uris: string[];
        isVerified: boolean;
        createdAt: string;
        updatedAt: string;
    };
}

export interface Languages {
    AVAILABLE_LANGUAGES: string[];
}
