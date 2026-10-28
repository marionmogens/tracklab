export interface LoginPayload {
  appCode: string;
  moduleCode: string;
  user: string;
  password?: string;
}

export interface LoginResponse {
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
  };
}

export interface UserSession {
  user: string;
  accessToken: string;
}