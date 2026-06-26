export interface UserId {
  userId: number;
}

export interface User {
  name: string;
  email: string;
  userId: number;
}

export interface UserInfo {
  userId: number,
  name: string,
  email: string,
}

export interface Error {
  error: string,
  message: string
}