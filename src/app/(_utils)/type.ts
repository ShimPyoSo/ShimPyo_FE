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

export const REGIONS = [
  { label: '서울', value: 'seoul' },
  { label: '부산', value: 'busan' },
  { label: '대구', value: 'daegu' },
  { label: '인천', value: 'incheon' },
  { label: '광주', value: 'gwangju' },
  { label: '대전', value: 'daejeon' },
  { label: '울산', value: 'ulsan' },
  { label: '세종', value: 'sejong' },
  { label: '경기', value: 'gyeonggi' },
  { label: '충북', value: 'chungbuk' },
  { label: '충남', value: 'chungnam' },
  { label: '전북', value: 'jeonbuk' },
  { label: '전남', value: 'jeonnam' },
  { label: '경북', value: 'gyeongbuk' },
  { label: '경남', value: 'gyeongnam' },
  { label: '강원', value: 'gangwon' },
  { label: '제주', value: 'jeju' },
] as const;

export type IRegionLabel = (typeof REGIONS)[number]['label'];
export type IRegionValue = (typeof REGIONS)[number]['value'];

export const FACILITIES = [
  { label: '예약 가능', value: 'reservation' },
  { label: '주차 가능', value: 'parking' },
  { label: '장애인 편의', value: 'accessible' },
  { label: '반려동물 동반', value: 'pet' },
  { label: '유아 동반', value: 'child' },
  { label: '무료 Wi-Fi', value: 'wifi' },
] as const;

export type IFacilityLabel = (typeof FACILITIES)[number]['label'];
export type IFacilityValue = (typeof FACILITIES)[number]['value'];

export const AGE_GROUPS = [
  { label: '20대 초반', value: '20Early' },
  { label: '20대 중반', value: '20Mid' },
  { label: '20대 후반', value: '20Late' },
  { label: '30대 초반', value: '30Early' },
  { label: '30대 중반', value: '30Mid' },
  { label: '30대 후반', value: '30Late' },
  { label: '40대', value: '40' },
  { label: '50대', value: '50' },
  { label: '60대 이상', value: '60' },
] as const;

export type IAgeGroupLabel = (typeof AGE_GROUPS)[number]['label'];
export type IAgeGroupValue = (typeof AGE_GROUPS)[number]['value'];

export const GENDERS = [
  { label: '여성', value: 'female' },
  { label: '남성', value: 'male' },
] as const;

export type IGenderLabel = (typeof GENDERS)[number]['label'];
export type IGenderValue = (typeof GENDERS)[number]['value'];

export const SORT_BY = [
  { label: '인기순', key: 'popular' },
  { label: '찜 많은순', key: 'liked' },
  { label: '후기순', key: 'review' },
] as const;

export type ISortLabel = (typeof SORT_BY)[number]['label'];
export type ISortValue = (typeof SORT_BY)[number]['key'];

export type IFilter = {
  region: IRegionValue[];
  facilities: IFacilityValue[];
  target: [IGenderValue[], IAgeGroupValue[]];
  visitTime: string;
};

export type ILatLng = {
  latitude?: number;
  longitude?: number;
};

export interface IOperationTime {
  dayoff: string[] | null;
  openTime: string;
  closeTime: string;
  breakTime: string | null;
}

export interface IFacilities {
  parking: boolean;
  accessible: boolean;
  reservation: boolean;
  pet: boolean;
  child: boolean;
  wifi: boolean;
}

export interface ISpot extends ILatLng {
  id?: number;
  touristId?: number;
  region: string;
  images: string | string[];
  category: string[];
  title: string;
  isLiked?: boolean;
  operationTime?: IOperationTime;
  address?: string;
  tel?: string | null;
  homepage?: string;
  reservation?: string;
  facilities?: IFacilities;
  counts?: number;
}

export interface ICourseList extends ILatLng {
  touristId: number;
  title: string;
  time: string;
  images: string;
  address: string;
  operationTime?: IOperationTime;
}

export interface IDay {
  date: string;
  list: ICourseList[];
}

export interface ICourseInfo {
  courseId: number;
  title: string;
  typename: IResultType;
  token: string;
  thumbnail: string;
}

export interface ICourse extends Omit<ICourseInfo, 'thumbnail'> {
  days: IDay[];
}

export interface ICourseAddition {
  date: string;
  course: ICourseList;
}

export type IReview = {
  reviewId: number;
  nickname?: string;
  createdAt: string;
  contents: string;
  images: string[];
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
  minTemp: number;
  maxTemp: number;
};

export type IWeather = {
  rainfall: null | number;
  temperature: null | number;
  weather: null | string;
  humidity: null | number;
};

export interface IOptional {
  duration: string | null;
  region: string | null;
  meal: number | null;
}

export type IResultType =
  | '비우는 쉼표'
  | '땀흘리는 쉼표'
  | '숨쉬는 쉼표'
  | '피어나는 쉼표'
  | '이완하는 쉼표'
  | '이것저것 쉼표';

export type IResultScore = { [key in IResultType]?: number };

export type IQuestion = {
  question: string;
  answers: {
    text: string;
    scores: IResultScore;
  }[];
  descriptions: string[];
  icons: string[];
};

export type IScore = {
  index: number;
  scores: IResultScore;
};
