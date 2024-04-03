import { User } from './schema';

export interface MfaGet {
    mfa?: string;
}

export interface EmailPatch {
    newEmail?: string;
    code?: string;
}
export interface PasswordPatch {
    oldPassword?: string;
    newPassword?: string;
    code?: string;
}

export interface UserPatch {
    username?: string;
    bio?: string;
    website?: string;
    pubkey?: string;
    language?: string;
    trackActivity?: boolean;
    activityNotify?: boolean;
    profilePublic?: boolean;
}

export interface AvatarPatch {
    file?: File;
}

export interface BlogPatch {
    id?: string;
    title?: string;
    text?: string;
}

export interface MfaPatch {
    cancel?: boolean;
    code?: string;
}

export interface UserDisable {
    id?: string;
    data: User;
    reason?: string;
    code?: string;
}

export interface UserDelete {
    id?: string;
    reason?: string;
    code?: string;
}

export interface MeDelete {
    password?: string;
    code?: string;
}

export interface BlogPost {
    title?: string;
    text?: string;
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

export interface ConfirmResetPasswordPost {
    code?: string;
    userId?: string;
    newPassword?: string;
}

export interface RegisterPost {
    email?: string;
    username?: string;
    password?: string;
}

export interface BlogDelete {
    id?: string;
}
