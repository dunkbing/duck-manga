export interface VerifyToken {
  token: string;
}

export interface AccessToken {
  access: string;
}

export interface RefreshToken {
  refresh?: string;
}

export interface UserCredentials {
  username: string;
  password: string;
}

export interface TokenResponse {
  refresh: string;
  access: string;
  username: string;
}
