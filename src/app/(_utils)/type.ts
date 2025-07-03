export interface ILogin {
  username: string;
  password: string;
  isRememberMe: boolean;
}

export interface IMember {
  userId: number;
  nickname: string;
}

export interface ISignUp {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
  authCode: string;
}

export interface IFind {
  username?: string;
  email: string;
}

export interface IDomain {
  value: string;
  label: string;
}
