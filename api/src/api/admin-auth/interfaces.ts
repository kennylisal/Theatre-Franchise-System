interface EmployeeCredential {
  employee_id: string;
  employee_role: string;
  account_status: string;
  account_password: string;
  account_username: string;
}

interface EmployeeJWTData {
  employee_id: string;
  employee_role: string;
  account_username: string;
}

interface EmployeeMiddlewareVerifData extends EmployeeJWTData {
  is_banned: string;
}

interface EmployeeLogin {
  username: string;
  password: string;
}

interface CredentialPayload {
  token: string;
}

interface AuthTokensPayload {
  accessToken: string;
  refreshToken: string;
}

export {
  EmployeeCredential,
  EmployeeLogin,
  CredentialPayload,
  EmployeeJWTData,
  EmployeeMiddlewareVerifData,
  AuthTokensPayload,
};
