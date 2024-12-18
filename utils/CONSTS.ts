/* 
 Tool to manage your Nove account through NAPI
 Copyright (C) 2019 Nove Group

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

/// Signing in and basic security
//* Backend URL
//* Link to your selfhosted NAPI instance or use a public one if you wish. Default: "https://api.nove.team"
export const NAPI_URL: string = 'https://api.nove.team';
//* Cookie domain
//* Domain the cookie will be saved on. For production use domain name, e.g. "nove.team". Default: "localhost"
export const COOKIE_HOSTNAME: string = 'localhost';
//* Redirect URI security
//* Allow redirect backs only for trusted domains. Default: configured to permit redirects for *.nove.team/*, *.procurel.com/* and *.peekr.org/*
export const DOMAIN_REGEX: RegExp = /^(https:\/\/)?([a-zA-Z0-9]{1,32}\.)?(nove\.team|procurel\.com|peekr\.org)|^(?!([a-zA-Z0-9]{1,}:)).*$/g;
export const SOURCE_CODE: string = 'https://git.nove.team/nove-org/website';
export const DONATE_LINK: string = 'https://github.com/sponsors/nove-org';
export const SUPPORT_MAIL: string = 'reply@nove.team';

/// Appearance
//* Landing page
//* Switch between selfhosted view and official (promo) view. Default: false
export const OFFICIAL_LANDING: boolean = true;

//* Enable registration page
//* Allow users access registration form. WARNING: If you disable this users are still able to sign up using API
//* routes. Make sure to disable registrations in NAPI configuration as well.
//* Default: false
export const ENABLE_REGISTER_PAGE: boolean = true;

/// Privacy
export const FETCH_OFFICIAL_BLOG: boolean = true;
