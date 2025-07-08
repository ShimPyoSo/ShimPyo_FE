export const title: { [key: string]: string } = {
  '/signup/email': '회원가입',
  '/login': '로그인',
  '/find/id': '아이디 찾기',
  '/find/password': '비밀번호 찾기',
  '/mypage': '마이페이지',
  '/mypage/profile': '계정 관리',
};

export const domainOptions = [
  { value: 'gmail.com', label: 'gmail.com' },
  { value: 'naver.com', label: 'naver.com' },
  { value: 'hanmail.net', label: 'hanmail.net' },
  { value: 'daum.net', label: 'daum.net' },
  { value: 'custom', label: '직접 입력', isLast: true },
];
