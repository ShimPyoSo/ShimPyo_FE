export interface ILogin {
  username: string;
  password: string;
  isRememberMe: boolean;
}

export interface IMember {
  userId: number;
  nickname: string;
}

export interface IPassword {
  password: string;
  passwordConfirm: string;
}

export interface ISignUp extends IPassword {
  username: string;
  email: string;
  authCode: string;
}

export interface IFind {
  username?: string;
  email: string;
}

export interface IFindResult {
  username: string;
  createdAt: string;
}

export interface IPasswordChange extends IPassword {
  nowPassword: string;
}

export interface IWithdraw {
  password: string;
  isConfirmed: boolean;
}

export interface IDomain {
  value: string;
  label: string;
}
