import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../../../environments/environments';

export const authConfig: AuthConfig = {
  scope: 'openid profile email offline_access',
  responseType: 'code',
  oidc: true,
  clientId: '283248590720139266',
  issuer: environment.auth_issuer,
  redirectUri: 'http://localhost:4200',
  postLogoutRedirectUri: 'http://localhost:4200',
  requireHttps: false, // required for running locally
};
