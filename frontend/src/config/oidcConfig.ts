import { WebStorageStateStore } from "oidc-client-ts";
import { AppConfig } from "config/AppConfig";

const oidcConfig = {
  authority: AppConfig.oidcAuthority,
  client_id: AppConfig.oidcClientId,
  redirect_uri: AppConfig.oidcRedirectUri,
  post_logout_redirect_uri: AppConfig.oidcRedirectUri,
  client_secret: AppConfig.oidcSecret,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  automaticSilentRenew: false,
  onSigninCallback(user: any) {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

export default oidcConfig;
