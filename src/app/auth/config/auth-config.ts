import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../../../environments/environments';

export const authConfig: AuthConfig = {
  scope: 'openid profile email offline_access',
  responseType: 'code',
  oidc: true,
  clientId: environment.auth_client_id,
  issuer: environment.auth_issuer,
  redirectUri: environment.auth_redirect_url,
  postLogoutRedirectUri: environment.post_logout_redirect_uri,
  requireHttps: false, // required for running locally
};
