export interface GetUserInfoResponse {
  info: AuthUserInfo;
}

export interface AuthUserInfo {
  iss: string;
  sub: string;
  aud: string[];
  exp: number;
  iat: number;
  auth_time: number;
  nonce: string;
  amr: string[];
  azp: string;
  client_id: string;
  at_hash: string;
  name: string;
  given_name: string;
  family_name: string;
  locale: null;
  updated_at: number;
  preferred_username: string;
  email: string;
  email_verified: boolean;
}
