export interface IError {
  message?: string;
  httpStatusCode?: number;
  name?: string;
}

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

export interface IAdditional {
  gender: 'female' | 'male';
  birthYear: number;
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
export type Reservation = '가능' | '불가능';
export type Service = '주차' | '반려동물';
export type Target = '20대' | '여성';
export type Time = '낮' | '밤';

export type IFilter = {
  region?: Region[];
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
  isLiked?: boolean;
  operationTime?: string;
  address?: string;
  tel?: string | null;
  longitude?: number;
  latitude?: number;
  homepage?: string;
  reservation?: string;
};

export type IReview = {
  reviewId: number;
  nickname?: string;
  createdAt: string;
  contents: string;
  images: string[];
};

export type IReviewSpot = {
  touristId: number;
  region: string;
  images: string;
  title: string;
  address: string;
  counts: number;
};

export type IReviewResponse = {
  reviews: IReview[];
  touristId: number;
  title: string;
  region: string;
  address: string;
};

export type IWeeklyWeather = {
  weather: string;
  date: string;
  time: number;
  temp: number;
};

export type IWeather = {
  rainfall: null | number;
  temperature: null | number;
  weather: null | string;
  humidity: null | number;
};
