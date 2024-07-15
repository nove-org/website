export interface Response<T> {
    status: number;
    body: {
        data: T;
        error: Error;
    };
    meta: {
        timestamp: string;
        version: string;
    };
}

export interface Error {
    code: string;
    doc_url: string;
    message: string;
    param: string;
    type: string;
    details?: {
        code: string;
        validation: string;
        minimum: number;
        maximum: number;
        type: string;
        inclusive: boolean;
        message: string;
        path: string[];
    }[];
}

export interface User {
    avatar: string;
    id: string;
    email: string;
    bio: string;
    website: string;
    username: string;
    language: string;
    pubkey: string;
    verified: boolean;
    profilePublic: boolean;
    trackActivity: boolean;
    activityNotify: boolean;
    mfaEnabled: boolean;
    disabled: boolean;
    permissionLevel: number;
    token: string;
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

export interface Mfa {
    secret: {
        secret: string;
        uri: string;
        qr: string;
    };
    codes: string[];
}

export interface Post {
    id: string;
    authorId: string;
    authorAvatar: string;
    authorUsername: string;
    authorBio?: string;
    authorWebsite?: string;
    text: string;
    title: string;
    header: string;
    headerAlt: string;
    commentsAllowed: boolean;
    createdAt: string;
    updatedAt: string;
    comments: PostComment[];
}

export interface PostComment {
    id: string;
    authorId: string;
    authorUsername: string;
    authorAvatar: string;
    text: string;
    blogPostId: string;
    createdAt: string;
    updatedAt: string;
}

export interface Success {
    success: boolean;
}

export interface Languages {
    AVAILABLE_LANGUAGES: string[];
}
