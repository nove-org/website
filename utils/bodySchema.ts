export interface LoginPost {
    username?: string;
    password?: string;
    mfa?: string;
}

export interface RegisterPost {
    email?: string;
    username?: string;
    password?: string;
}
