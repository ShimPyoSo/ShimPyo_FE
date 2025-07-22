import all from '/public/images/icons/category/all.svg';
import allIllu from '/public/images/category/all.svg';
import beauty from '/public/images/icons/category/beauty.svg';
import beautyIllu from '/public/images/category/beauty.svg';
import food from '/public/images/icons/category/food.svg';
import foodIllu from '/public/images/category/food.svg';
import meditation from '/public/images/icons/category/meditation.svg';
import meditationIllu from '/public/images/category/meditation.svg';
import nature from '/public/images/icons/category/nature.svg';
import natureIllu from '/public/images/category/nature.svg';
import spa from '/public/images/icons/category/spa.svg';
import spaIllu from '/public/images/category/spa.svg';

export const title: { [key: string]: string } = {
  '/signup/email': '회원가입',
  '/login': '로그인',
  '/find/id': '아이디 찾기',
  '/find/password': '비밀번호 찾기',
  '/mypage': '마이페이지',
  '/mypage/profile': '계정 관리',
  '/mypage/like': '찜한 목록',
  '/search': '여행지 찾기',
};

export const notRendering = [
  '/',
  '/signup',
  '/category',
  '/category/food',
  '/category/beauty',
  '/category/nature',
  '/category/spa',
  '/category/meditation',
  '/mypage/like/spot',
  '/mypage/like/spot/food',
  '/mypage/like/spot/beauty',
  '/mypage/like/spot/nature',
  '/mypage/like/spot/spa',
  '/mypage/like/spot/meditation',
];

export const domainOptions = [
  { value: 'gmail.com', label: 'gmail.com' },
  { value: 'naver.com', label: 'naver.com' },
  { value: 'hanmail.net', label: 'hanmail.net' },
  { value: 'daum.net', label: 'daum.net' },
  { value: 'custom', label: '직접 입력', isLast: true },
];

export const categoryList = [
  {
    href: 'meditation',
    label: '명상',
    icon: meditation,
    illustration: meditationIllu,
    mainDescription: '마음의 리프레쉬',
    subDescription: '필요한 분들께 추천해요',
  },
  {
    href: 'spa',
    label: '스파',
    icon: spa,
    illustration: spaIllu,
    mainDescription: '심신의 피로를 씻어내고',
    subDescription: '싶은 분들께 추천해요',
  },
  {
    href: 'beauty',
    label: 'K-뷰티',
    icon: beauty,
    illustration: beautyIllu,
    mainDescription: '나만의 아름다움을 찾고',
    subDescription: '싶은 분들께 추천해요',
  },
  {
    href: 'nature',
    label: '자연친화',
    icon: nature,
    illustration: natureIllu,
    mainDescription: '고요한 하루가 필요한',
    subDescription: '분들께 추천해요',
  },
  {
    href: 'food',
    label: '건강식',
    icon: food,
    illustration: foodIllu,
    mainDescription: '가볍고 건강한 일상을',
    subDescription: '원하는 분들께 추천해요',
  },
  {
    href: '',
    label: '전체',
    icon: all,
    illustration: allIllu,
    mainDescription: '나에게 맞는 힐링을',
    subDescription: '전체 카테고리에서 찾아보세요',
  },
];

export const region = [
  '서울',
  '부산',
  '대구',
  '인천',
  '광주',
  '대전',
  '울산',
  '세종',
  '경기도',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '강원',
  '제주',
];

export const spotType = ['숙소', '식당', '유형', '유형', '유형'];
