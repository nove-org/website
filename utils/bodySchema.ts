export interface RecoveryGet {
    mfa?: string;
}

export interface EmailPatch {
    newEmail?: string;
}
export interface PasswordPatch {
    oldPassword?: string;
    newPassword?: string;
}

export interface UserPatch {
    username?: string;
    bio?: string;
    language?: string;
    trackActivity?: boolean;
    profilePublic?: boolean;
}

export interface MfaPatch {
    enabled?: boolean;
    code?: string;
}

export interface UserDelete {
    password?: string;
}

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
