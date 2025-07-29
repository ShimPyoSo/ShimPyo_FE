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
  authCode: string;
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

export interface ILocation {
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
}

export type Region = '강원' | '서울';
export type Type = '숙소' | '식당';
export type Reservation = '가능' | '불가능';
export type Service = '주차' | '반려동물';
export type Target = '20대' | '여성';
export type Time = '낮' | '밤';

export type IFilter = {
  region?: Region[];
  type?: Type[];
  reservation?: Reservation[];
  service?: Service[];
  target?: Target[];
  time?: Time[];
};

export type ISpot = {
  id: number;
  region: string;
  images: string;
  category: string[];
  title: string;
  isLiked: boolean;
  operationTime?: string;
  address?: string;
};

export type IReview = {
  reviewId: number;
  nickname: string;
  createdAt: string;
  contents: string;
  images: string[];
};
