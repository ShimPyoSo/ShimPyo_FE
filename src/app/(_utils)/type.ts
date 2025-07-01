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
  authcode: string;
}

export interface IFind {
  username?: string;
  email: string;
}
