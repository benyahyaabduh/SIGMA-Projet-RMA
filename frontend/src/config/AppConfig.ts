export class AppConfig {
  static apiUrl = window.env.REACT_APP_API_URL;
  static website = window.env.REACT_APP_WEBSITE_NAME;
  static publicUrl = window.env.PUBLIC_URL;
  static oidcAuthority = window.env.REACT_APP_OIDC_AUTHORITY;
  static oidcClientId = window.env.REACT_APP_OIDC_CLIENT_ID;
  static oidcRedirectUri = window.env.REACT_APP_OIDC_REDIRECT_URI;
  static oidcSecret = window.env.REACT_APP_OIDC_SECRET;
}
