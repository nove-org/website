export interface LoginPost {
    username?: string;
    password?: string;
    mfa?: string;
}

export interface ResetPasswordPost {
    email?: string;
    newPassword?: string;
}

export interface RegisterPost {
    email?: string;
    username?: string;
    password?: string;
}
