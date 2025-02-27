/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

export const Constants = {
    LIBRARY_NAME: "MSAL.JS",
    SKU: "msal.js.common",
    // Prefix for all library cache entries
    CACHE_PREFIX: "msal",
    // default authority
    DEFAULT_AUTHORITY: "https://login.microsoftonline.com/common/",
    DEFAULT_AUTHORITY_HOST: "login.microsoftonline.com",
    // ADFS String
    ADFS: "adfs",
    // Default AAD Instance Discovery Endpoint
    AAD_INSTANCE_DISCOVERY_ENDPT: "https://login.microsoftonline.com/common/discovery/instance?api-version=1.1&authorization_endpoint=",
    // Resource delimiter - used for certain cache entries
    RESOURCE_DELIM: "|",
    // Placeholder for non-existent account ids/objects
    NO_ACCOUNT: "NO_ACCOUNT",
    // Claims
    CLAIMS: "claims",
    // Consumer UTID
    CONSUMER_UTID: "9188040d-6c67-4c5b-b112-36a304b66dad",
    // Default scopes
    OPENID_SCOPE: "openid",
    PROFILE_SCOPE: "profile",
    OFFLINE_ACCESS_SCOPE: "offline_access",
    EMAIL_SCOPE: "email",
    // Default response type for authorization code flow
    CODE_RESPONSE_TYPE: "code",
    CODE_GRANT_TYPE: "authorization_code",
    RT_GRANT_TYPE: "refresh_token",
    FRAGMENT_RESPONSE_MODE: "fragment",
    S256_CODE_CHALLENGE_METHOD: "S256",
    URL_FORM_CONTENT_TYPE: "application/x-www-form-urlencoded;charset=utf-8",
    AUTHORIZATION_PENDING: "authorization_pending",
    NOT_DEFINED: "not_defined",
    EMPTY_STRING: "",
    FORWARD_SLASH: "/",
    IMDS_ENDPOINT: "http://169.254.169.254/metadata/instance/compute/location",
    IMDS_VERSION: "2020-06-01",
    IMDS_TIMEOUT: 2000,
    AZURE_REGION_AUTO_DISCOVER_FLAG: "TryAutoDetect",
    REGIONAL_AUTH_PUBLIC_CLOUD_SUFFIX: "login.microsoft.com",
    KNOWN_PUBLIC_CLOUDS: ["login.microsoftonline.com", "login.windows.net", "login.microsoft.com", "sts.windows.net"]
};

export const OIDC_DEFAULT_SCOPES = [
    Constants.OPENID_SCOPE,
    Constants.PROFILE_SCOPE,
    Constants.OFFLINE_ACCESS_SCOPE
];

export const OIDC_SCOPES = [
    ...OIDC_DEFAULT_SCOPES,
    Constants.EMAIL_SCOPE
];

/**
 * Request header names
 */
export enum HeaderNames {
    CONTENT_TYPE = "Content-Type",
    RETRY_AFTER = "Retry-After",
    CCS_HEADER = "X-AnchorMailbox"
}

/**
 * Persistent cache keys MSAL which stay while user is logged in.
 */
export enum PersistentCacheKeys {
    ID_TOKEN = "idtoken",
    CLIENT_INFO = "client.info",
    ADAL_ID_TOKEN = "adal.idtoken",
    ERROR = "error",
    ERROR_DESC = "error.description",
    ACTIVE_ACCOUNT = "active-account"
}

/**
 * String constants related to AAD Authority
 */
export enum AADAuthorityConstants {
    COMMON = "common",
    ORGANIZATIONS = "organizations",
    CONSUMERS = "consumers"
}

/**
 * Keys in the hashParams sent by AAD Server
 */
export enum AADServerParamKeys {
    CLIENT_ID = "client_id",
    REDIRECT_URI = "redirect_uri",
    RESPONSE_TYPE = "response_type",
    RESPONSE_MODE = "response_mode",
    GRANT_TYPE = "grant_type",
    CLAIMS = "claims",
    SCOPE = "scope",
    ERROR = "error",
    ERROR_DESCRIPTION = "error_description",
    ACCESS_TOKEN = "access_token",
    ID_TOKEN = "id_token",
    REFRESH_TOKEN = "refresh_token",
    EXPIRES_IN = "expires_in",
    STATE = "state",
    NONCE = "nonce",
    PROMPT = "prompt",
    SESSION_STATE = "session_state",
    CLIENT_INFO = "client_info",
    CODE = "code",
    CODE_CHALLENGE = "code_challenge",
    CODE_CHALLENGE_METHOD = "code_challenge_method",
    CODE_VERIFIER = "code_verifier",
    CLIENT_REQUEST_ID = "client-request-id",
    X_CLIENT_SKU = "x-client-SKU",
    X_CLIENT_VER = "x-client-VER",
    X_CLIENT_OS = "x-client-OS",
    X_CLIENT_CPU = "x-client-CPU",
    X_CLIENT_CURR_TELEM = "x-client-current-telemetry",
    X_CLIENT_LAST_TELEM = "x-client-last-telemetry",
    X_MS_LIB_CAPABILITY = "x-ms-lib-capability",
    POST_LOGOUT_URI = "post_logout_redirect_uri",
    ID_TOKEN_HINT= "id_token_hint",
    DEVICE_CODE = "device_code",
    CLIENT_SECRET = "client_secret",
    CLIENT_ASSERTION = "client_assertion",
    CLIENT_ASSERTION_TYPE = "client_assertion_type",
    TOKEN_TYPE = "token_type",
    REQ_CNF = "req_cnf",
    OBO_ASSERTION = "assertion",
    REQUESTED_TOKEN_USE = "requested_token_use",
    ON_BEHALF_OF = "on_behalf_of",
    FOCI = "foci",
    CCS_HEADER = "X-AnchorMailbox"
}

/**
 * Claims request keys
 */
export enum ClaimsRequestKeys {
    ACCESS_TOKEN = "access_token",
    XMS_CC = "xms_cc"
}

/**
 * we considered making this "enum" in the request instead of string, however it looks like the allowed list of
 * prompt values kept changing over past couple of years. There are some undocumented prompt values for some
 * internal partners too, hence the choice of generic "string" type instead of the "enum"
 */
export const PromptValue = {
    LOGIN: "login",
    SELECT_ACCOUNT: "select_account",
    CONSENT: "consent",
    NONE: "none",
    CREATE: "create"
};

/**
 * SSO Types - generated to populate hints
 */
export enum SSOTypes {
    ACCOUNT = "account",
    SID = "sid",
    LOGIN_HINT = "login_hint",
    ID_TOKEN = "id_token",
    DOMAIN_HINT = "domain_hint",
    ORGANIZATIONS = "organizations",
    CONSUMERS = "consumers",
    ACCOUNT_ID = "accountIdentifier",
    HOMEACCOUNT_ID = "homeAccountIdentifier"
}

/**
 * Disallowed extra query parameters.
 */
export const BlacklistedEQParams = [
    SSOTypes.SID,
    SSOTypes.LOGIN_HINT
];

/**
 * allowed values for codeVerifier
 */
export const CodeChallengeMethodValues = {
    PLAIN: "plain",
    S256: "S256"
};

/**
 * The method used to encode the code verifier for the code challenge parameter. can be one
 * of plain or s256. if excluded, code challenge is assumed to be plaintext. for more
 * information, see the pkce rcf: https://tools.ietf.org/html/rfc7636
 */
export const CodeChallengeMethodValuesArray: string[] = [
    CodeChallengeMethodValues.PLAIN,
    CodeChallengeMethodValues.S256
];

/**
 * allowed values for response_mode
 */
export enum ResponseMode {
    QUERY = "query",
    FRAGMENT = "fragment",
    FORM_POST = "form_post"
}

/**
 * allowed grant_type
 */
export enum GrantType {
    IMPLICIT_GRANT = "implicit",
    AUTHORIZATION_CODE_GRANT = "authorization_code",
    CLIENT_CREDENTIALS_GRANT = "client_credentials",
    RESOURCE_OWNER_PASSWORD_GRANT = "password",
    REFRESH_TOKEN_GRANT = "refresh_token",
    DEVICE_CODE_GRANT = "device_code",
    JWT_BEARER = "urn:ietf:params:oauth:grant-type:jwt-bearer"
}

/**
 * Account types in Cache
 */
export enum CacheAccountType {
    MSSTS_ACCOUNT_TYPE = "MSSTS",
    ADFS_ACCOUNT_TYPE = "ADFS",
    MSAV1_ACCOUNT_TYPE = "MSA",
    GENERIC_ACCOUNT_TYPE = "Generic" // NTLM, Kerberos, FBA, Basic etc
}

/**
 * Separators used in cache
 */
export enum Separators {
    CACHE_KEY_SEPARATOR = "-",
    CLIENT_INFO_SEPARATOR = "."
}

/**
 * Credential Type stored in the cache
 */
export enum CredentialType {
    ID_TOKEN = "IdToken",
    ACCESS_TOKEN = "AccessToken",
    ACCESS_TOKEN_WITH_AUTH_SCHEME = "AccessToken_With_AuthScheme",
    REFRESH_TOKEN = "RefreshToken",
}

/**
 * Credential Type stored in the cache
 */
export enum CacheSchemaType {
    ACCOUNT = "Account",
    CREDENTIAL = "Credential",
    ID_TOKEN = "IdToken",
    ACCESS_TOKEN = "AccessToken",
    REFRESH_TOKEN = "RefreshToken",
    APP_METADATA = "AppMetadata",
    TEMPORARY = "TempCache",
    TELEMETRY = "Telemetry",
    UNDEFINED = "Undefined",
    THROTTLING = "Throttling"
}

/**
 * Combine all cache types
 */
export enum CacheType {
    ADFS = 1001,
    MSA = 1002,
    MSSTS = 1003,
    GENERIC = 1004,
    ACCESS_TOKEN = 2001,
    REFRESH_TOKEN = 2002,
    ID_TOKEN = 2003,
    APP_METADATA = 3001,
    UNDEFINED = 9999
}

/**
 * More Cache related constants
 */
export const APP_METADATA = "appmetadata";
export const CLIENT_INFO = "client_info";
export const THE_FAMILY_ID = "1";

export const AUTHORITY_METADATA_CONSTANTS = {
    CACHE_KEY: "authority-metadata",
    REFRESH_TIME_SECONDS: 3600 * 24 // 24 Hours
};

export enum AuthorityMetadataSource {
    CONFIG = "config",
    CACHE = "cache",
    NETWORK = "network"
}

export const SERVER_TELEM_CONSTANTS = {
    SCHEMA_VERSION: 5,
    MAX_CUR_HEADER_BYTES: 80, // ESTS limit is 100B, set to 80 to provide a 20B buffer
    MAX_LAST_HEADER_BYTES: 330, // ESTS limit is 350B, set to 330 to provide a 20B buffer,
    MAX_CACHED_ERRORS: 50, // Limit the number of errors that can be stored to prevent uncontrolled size gains
    CACHE_KEY: "server-telemetry",
    CATEGORY_SEPARATOR: "|",
    VALUE_SEPARATOR: ",",
    OVERFLOW_TRUE: "1",
    OVERFLOW_FALSE: "0",
    UNKNOWN_ERROR: "unknown_error"
};

/**
 * Type of the authentication request
 */
export enum AuthenticationScheme {
    BEARER = "Bearer",
    POP = "pop",
    SSH = "ssh-cert"
}

/**
 * Constants related to throttling
 */
export const ThrottlingConstants = {
    // Default time to throttle RequestThumbprint in seconds
    DEFAULT_THROTTLE_TIME_SECONDS: 60,
    // Default maximum time to throttle in seconds, overrides what the server sends back
    DEFAULT_MAX_THROTTLE_TIME_SECONDS: 3600,
    // Prefix for storing throttling entries
    THROTTLING_PREFIX: "throttling",
    // Value assigned to the x-ms-lib-capability header to indicate to the server the library supports throttling
    X_MS_LIB_CAPABILITY_VALUE: "retry-after, h429"
};

export const Errors = {
    INVALID_GRANT_ERROR: "invalid_grant",
    CLIENT_MISMATCH_ERROR: "client_mismatch",
};

/**
 * Password grant parameters
 */
export enum PasswordGrantConstants {
    username = "username",
    password = "password"
}

/**
 * Response codes
 */
export enum  ResponseCodes {
    httpSuccess = 200,
    httpBadRequest = 400
}

/**
 * Region Discovery Sources
 */
export enum RegionDiscoverySources {
    FAILED_AUTO_DETECTION = "1",
    INTERNAL_CACHE = "2",
    ENVIRONMENT_VARIABLE = "3",
    IMDS = "4",
}

/**
 * Region Discovery Outcomes
 */
export enum RegionDiscoveryOutcomes {
    CONFIGURED_MATCHES_DETECTED = "1",
    CONFIGURED_NO_AUTO_DETECTION = "2",
    CONFIGURED_NOT_DETECTED = "3",
    AUTO_DETECTION_REQUESTED_SUCCESSFUL = "4",
    AUTO_DETECTION_REQUESTED_FAILED = "5"
}

export enum CacheOutcome {
    NO_CACHE_HIT = "0",
    FORCE_REFRESH = "1",
    NO_CACHED_ACCESS_TOKEN = "2",
    CACHED_ACCESS_TOKEN_EXPIRED = "3",
    REFRESH_CACHED_ACCESS_TOKEN = "4"
}
