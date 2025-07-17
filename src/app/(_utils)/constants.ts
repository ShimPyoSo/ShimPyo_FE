import all from '/public/images/icons/category/all.svg';
import beauty from '/public/images/icons/category/beauty.svg';
import food from '/public/images/icons/category/food.svg';
import meditation from '/public/images/icons/category/meditation.svg';
import nature from '/public/images/icons/category/nature.svg';
import spa from '/public/images/icons/category/spa.svg';

export const title: { [key: string]: string } = {
  '/signup/email': '회원가입',
  '/login': '로그인',
  '/find/id': '아이디 찾기',
  '/find/password': '비밀번호 찾기',
  '/mypage': '마이페이지',
  '/mypage/profile': '계정 관리',
  '/search': '여행지 찾기',
};

export const domainOptions = [
  { value: 'gmail.com', label: 'gmail.com' },
  { value: 'naver.com', label: 'naver.com' },
  { value: 'hanmail.net', label: 'hanmail.net' },
  { value: 'daum.net', label: 'daum.net' },
  { value: 'custom', label: '직접 입력', isLast: true },
];

export const categoryList = [
  { href: '/category/meditation', label: '명상', icon: meditation },
  { href: '/category/spa', label: '스파', icon: spa },
  { href: '/category/beauty', label: 'K-뷰티', icon: beauty },
  { href: '/category/nature', label: '자연친화', icon: nature },
  { href: '/category/food', label: '건강식', icon: food },
  { href: '/category', label: '전체', icon: all },
];
