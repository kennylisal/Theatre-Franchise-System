interface LoginRequestType {
  username: string;
  password: string;
}

interface AuthTokensPayload {
  accessToken: string;
  refreshToken: string;
}

export { type LoginRequestType, type AuthTokensPayload };
