import all from '/public/images/icons/category/all.svg';
import allIllu from '/public/images/category/all.svg';
import beauty from '/public/images/icons/category/beauty.svg';
import beautyIllu from '/public/images/category/beauty.svg';
import breathe from '/public/images/test/breathe.svg';
import food from '/public/images/icons/category/food.svg';
import foodIllu from '/public/images/category/food.svg';
import friendly from '/public/images/test/friendly.svg';
import full from '/public/images/test/full.svg';
import grow from '/public/images/test/grow.svg';
import meditation from '/public/images/icons/category/meditation.svg';
import meditationIllu from '/public/images/category/meditation.svg';
import move from '/public/images/test/move.svg';
import nature from '/public/images/icons/category/nature.svg';
import natureIllu from '/public/images/category/nature.svg';
import relaxing from '/public/images/test/spa.svg';
import rest from '/public/images/test/rest.svg';
import spa from '/public/images/icons/category/spa.svg';
import spaIllu from '/public/images/category/spa.svg';
import variety from '/public/images/test/variety.svg';

export const title: { [key: string]: string } = {
  '/signup/email': '회원가입',
  '/signup/additional': '회원가입',
  '/login': '로그인',
  '/find/id': '아이디 찾기',
  '/find/password': '비밀번호 찾기',
  '/mypage': '마이페이지',
  '/mypage/profile': '계정 관리',
  '/mypage/like': '찜한 여행지',
  '/mypage/review': '내가 쓴 후기',
  '/mypage/like/course': '맞춤 쉼표 코스',
  '/search': '여행지 찾기',
  '/mypage/like/recent': '최근 본 여행지',
  '/test': '쉼표 유형 테스트',
};

export const notRendering = [
  '/',
  '/signup',
  '/category',
  '/category?type=food',
  '/category?type=beauty',
  '/category?type=nature',
  '/category?type=spa',
  '/category?type=meditation',
  '/mypage/like/spot',
  '/mypage/like/spot/food',
  '/mypage/like/spot/beauty',
  '/mypage/like/spot/nature',
  '/mypage/like/spot/spa',
  '/mypage/like/spot/meditation',
];

export const rendering = ['/mypage', '/test', '/search', '/'];

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
  '경기',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '강원',
  '제주',
];

export const service = [
  '주차 시설',
  '장애인 편의 시설',
  '무료 Wi-Fi',
  '관광/안내 데스크',
  '반려동물 동반 시설',
  '유아 동반 시설',
];

export const target = [
  '20대 초반',
  '20대 중반',
  '20대 후반',
  '30대 초반',
  '30대 중반',
  '30대 후반',
  '40대',
  '50대',
  '60대 이상',
];

export const testImages = [
  { name: '비우는 쉼표', image: rest, description: '아무것도 하지 않고 멍 때리는 쉼이 필요한' },
  { name: '땀흘리는 쉼표', image: move, description: '몸을 역동적으로 움직이는 쉼이 필요한' },
  { name: '어울리는 쉼표', image: friendly, description: '사람들 사이에서 에너지를 얻는 쉼이 필요한' },
  { name: '채우는 쉼표', image: full, description: '건강한 요리를 먹고 심신을 디톡스 하는 쉼이 필요한' },
  { name: '피어나는 쉼표', image: grow, description: '나를 아름답게 가꾸며 감성을 회복하는 쉼이 필요한' },
  { name: '숨쉬는 쉼표', image: breathe, description: '자연 속에서 호흡하며 몸을 재정비 하는 쉼이 필요한' },
  { name: '이완하는 쉼표', image: relaxing, description: '심신의 피로를 스파, 찜질, 마사지로 푸는 쉼이 필요한' },
  { name: '이것저것 쉼표', image: variety, description: '다양한 유형의 쉼이 동시에 필요한' },
];
