window.env = {
  PORT: 3001,
  NODE_PATH: "src",
  REACT_APP_WEBSITE_NAME: "TIERS360",
  PUBLIC_URL: "/tiers360",
  REACT_APP_API_URL: "https://gama-dy.rmaassurance.com/transverse/tiers360",
  ///////////
  REACT_APP_API_URL_DEV: "http://localhost:9393/",
  REACT_APP_API_URL_INT:
    "https://gama-dy.rmaassurance.com/transverse/tiers360",

  //:Keycloak
  // REACT_APP_OIDC_AUTHORITY: "https://access-dy.rmaassurance.com/auth/realms/rma-ad",
  REACT_APP_OIDC_AUTHORITY:
    "https://access-dy.rmaassurance.com/auth/realms/rma-ad",
  REACT_APP_OIDC_CLIENT_ID: "auth-ad",
  REACT_APP_OIDC_REDIRECT_URI: "http://localhost:3001/tiers360",
  REACT_APP_OIDC_SECRET: "",
};
caches.delete("config.js");
