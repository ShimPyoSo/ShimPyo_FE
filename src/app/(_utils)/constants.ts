import { IQuestion } from './type';
import all from '/public/images/icons/category/all.svg';
import allIllu from '/public/images/category/all.svg';
import beauty from '/public/images/icons/category/beauty.svg';
import beautyIllu from '/public/images/category/beauty.svg';
import breathe from '/public/images/test/breathe.svg';
import camp from '/public/images/carousel/camp.jpg';
import find from '/public/images/carousel/find.jpg';
import food from '/public/images/icons/category/food.svg';
import foodIllu from '/public/images/category/food.svg';
import grow from '/public/images/test/grow.svg';
import meditation from '/public/images/icons/category/meditation.svg';
import meditationIllu from '/public/images/category/meditation.svg';
import move from '/public/images/test/move.svg';
import nature from '/public/images/icons/category/nature.svg';
import natureIllu from '/public/images/category/nature.svg';
import picnic from '/public/images/carousel/picnic.jpg';
import relaxing from '/public/images/test/spa.svg';
import rest from '/public/images/test/rest.svg';
import spa from '/public/images/icons/category/spa.svg';
import spaIllu from '/public/images/category/spa.svg';
import temple from '/public/images/carousel/temple.jpg';
import test from '/public/images/carousel/test.jpg';
import variety from '/public/images/test/variety.svg';
import wellness from '/public/images/carousel/wellness.jpg';

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
  '/test/question': '쉼표 유형 테스트',
  '/course/search': '쉼표 여행지 추가하기',
  '/course/kakao': '쉼표 여행지 추가하기',
  '/mypage/social/profile': '프로필 관리',
  '/mypage/social/withdraw': '회원 탈퇴',
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

export const notRenderingTabBar = [
  '/signup',
  '/signup/additional',
  '/signup/email',
  '/login',
  '/find/password',
  '/find/id',
  '/test/question',
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

export const testImages = [
  { name: '비우는 쉼표', image: rest, description: '아무것도 하지 않고 멍 때리는 쉼이 필요한', color: '#78B3ED' },
  { name: '땀흘리는 쉼표', image: move, description: '몸을 역동적으로 움직이는 쉼이 필요한', color: '#FF7878' },
  {
    name: '피어나는 쉼표',
    image: grow,
    description: '나를 아름답게 가꾸며 감성을 회복하는 쉼이 필요한',
    color: '#FF688D',
  },
  {
    name: '숨쉬는 쉼표',
    image: breathe,
    description: '자연 속에서 호흡하며 몸을 재정비 하는 쉼이 필요한',
    color: '#A28F80',
  },
  {
    name: '이완하는 쉼표',
    image: relaxing,
    description: '심신의 피로를 스파, 찜질, 마사지로 푸는 쉼이 필요한',
    color: '#AA7CFF',
  },
  { name: '이것저것 쉼표', image: variety, description: '다양한 유형의 쉼이 동시에 필요한', color: '#87BABA' },
];

export const questions: IQuestion[] = [
  {
    question: `바쁜 한 주의 끝,\n오늘 밤 가장 하고 싶은 일은 무엇인가요?`,
    answers: [
      { text: '일찍 잠들기', scores: { '비우는 쉼표': 2, '이완하는 쉼표': 1 } },
      { text: '운동하기', scores: { '땀흘리는 쉼표': 3 } },
      { text: '밤 산책하기', scores: { '숨쉬는 쉼표': 2, '피어나는 쉼표': 1 } },
      { text: '뒹굴거리기', scores: { '비우는 쉼표': 1, '이완하는 쉼표': 2 } },
    ],
    descriptions: [
      '피곤해서 일찍 자고 싶어',
      '땀 흘리며 스트레스 풀고 싶어',
      '시원한 바람을 쐬며 걷고 싶어',
      '아무 생각 없이 뒹굴거리고 싶어',
    ],
    icons: ['😴', '🏋️‍♀️', '‍🚶', '‍🛋️'],
  },
  {
    question: `꿈꾸던 웰니스 여행을 시작하는 아침,\n첫 계획은 무엇인가요?`,
    answers: [
      { text: '자연의 상쾌함 느끼기', scores: { '숨쉬는 쉼표': 3 } },
      { text: '몸과 마음 깨우기', scores: { '땀흘리는 쉼표': 3 } },
      { text: '느긋한 시간 보내기', scores: { '비우는 쉼표': 2, '피어나는 쉼표': 1 } },
      { text: '나의 모습 가꾸기', scores: { '피어나는 쉼표': 3, '이완하는 쉼표': 1 } },
    ],
    descriptions: [
      '피톤치드향 가득한 숲을 걸을 거야',
      '가벼운 스트레칭으로 몸과 마음을 깨울 거야',
      '특별한 계획 없이 여유로운 시간을 보낼 거야',
      '피부에 좋은 팩을 붙이고 생기를 되찾을 거야',
    ],
    icons: ['🍃', '✨', '☕', '🧖‍♀️'],
  },
  {
    question: `산뜻한 아침을 지나 도착한 장소,\n깊은 평온이 느껴지는 이곳은 어떤 모습인가요?`,
    answers: [
      { text: '숲 속의 아늑한 오두막', scores: { '숨쉬는 쉼표': 3 } },
      { text: '향 냄새가 풍기는 한옥 사찰', scores: { '비우는 쉼표': 2, '이완하는 쉼표': 2 } },
      { text: '도심의 트렌디한 카페', scores: { '피어나는 쉼표': 3 } },
      { text: '활력이 넘치는 체험 센터', scores: { '땀흘리는 쉼표': 3 } },
    ],
    descriptions: [
      '맑은 공기와 푸른 생기가 가득한 공간',
      '적막 속에서 나를 돌아보는 고즈넉한 공간',
      '세련된 인테리어와 커피 향의 감각적인 공간',
      '몸을 움직이며 새로운 에너지를 얻는 공간',
    ],
    icons: ['🏡', '🏯', '🏙️', '🤸‍♀️'],
  },
  {
    question: `여러 웰니스 장소를 여행하는 당신,\n가장 나다운 나를 발견한 순간은 언제인가요?`,
    answers: [
      { text: '고요히 사색하는 순간', scores: { '비우는 쉼표': 2, '이완하는 쉼표': 2 } },
      { text: '건강한 요리를 맛보는 순간', scores: { '피어나는 쉼표': 2 } },
      { text: '함께하는 행복을 느끼는 순간', scores: { '피어나는 쉼표': 1, '숨쉬는 쉼표': 1 } },
      { text: '새로운 경험에 몰입하는 순간', scores: { '땀흘리는 쉼표': 2, '숨쉬는 쉼표': 2 } },
    ],
    descriptions: [
      '홀로 지내며 온전히 내게만 집중한 때',
      '신선한 재료의 음식을 먹으며 몸을 회복한 때',
      '소중한 사람과 교감하며 활짝 웃을 때',
      '처음 해보는 체험에 집중하며 흥미를 느낄 때',
    ],
    icons: ['🧘', '🥗', '🥰', '🤩'],
  },
  {
    question: `여러 웰니스 장소를 여행하는 당신,\n가장 의외의 나를 발견한 순간은 언제인가요?`,
    answers: [
      { text: '자유로운 마음을 느낀 순간', scores: { '땀흘리는 쉼표': 3 } },
      { text: '여유로운 시간을 즐기는 순간', scores: { '비우는 쉼표': 2, '이완하는 쉼표': 2 } },
      { text: '유연하게 생각하는 순간', scores: { '피어나는 쉼표': 2 } },
      { text: '활기찬 하루를 보낸 순간', scores: { '이완하는 쉼표': 3 } },
    ],
    descriptions: [
      '계획은 접어두고 그저 발 닿는 대로 움직일 때',
      '한 가지의 일정만 세워 느긋한 하루를 보낼 때',
      '예상치 못 한 일에도 웃어 넘길 수 있을 때',
      '체험하는 일정으로 가득한 하루를 보낼 때',
    ],
    icons: ['🕊️', '😌', '🤸‍♀️', '⚡'],
  },
  {
    question: `여행이 끝나가는 순간,\n나만을 위한 마지막 시간은 어떤 모습일까요?`,
    answers: [
      { text: '잠으로 체력 회복하기', scores: { '비우는 쉼표': 3, '이완하는 쉼표': 1 } },
      { text: '여행의 순간을 기록하기', scores: { '땀흘리는 쉼표': 2 } },
      { text: '몸과 마음 정돈하기', scores: { '숨쉬는 쉼표': 3 } },
      { text: '지친 피부 가꾸기', scores: { '피어나는 쉼표': 3 } },
    ],
    descriptions: [
      '여행의 피로를 풀기 위해 일찍 잠에 들 거야',
      '일정을 되돌아보며 일기를 작성할 거야',
      '몸을 가볍게 움직여 여행의 긴장을 풀 거야',
      '이곳저곳 여행하며 지친 피부를 관리할 거야',
    ],
    icons: ['😴', '📓', '🧘‍♀️', '💆‍♀️'],
  },
  {
    question: `웰니스 여행을 마치고 일상으로 돌아온 당신,\n다음 여행은 누구와 함께 떠나고 싶나요?`,
    answers: [
      { text: '혼자 떠나기', scores: { '비우는 쉼표': 2, '이완하는 쉼표': 2 } },
      { text: '새로운 사람 만나기', scores: { '피어나는 쉼표': 2 } },
      { text: '소중한 친구와 떠나기', scores: { '땀흘리는 쉼표': 3 } },
      { text: '사랑하는 가족과 떠나기', scores: { '숨쉬는 쉼표': 2 } },
    ],
    descriptions: [
      '내게만 집중하는 고요한 여행을 떠나고 싶어',
      '낯선 사람들 속에서 새로운 영감을 얻고 싶어',
      '친구나 연인과 소소한 행복을 나누고 싶어',
      '가족과 따뜻한 추억을 만들고 싶어',
    ],
    icons: ['🎒', '🌍', '🧑‍🤝‍🧑', '👨‍👩‍👧‍👦'],
  },
];

export const optionals = [
  {
    question: `가장 선호하는 웰니스 여행 지역을 알려주세요.`,
    answers: ['강원도', '경상도', '수도권', '전라도', '제주도', '충청도', '잘 모르겠어요'],
  },
  {
    question: `웰니스 여행을 떠난다면,\n어느 정도의 기간이 적당할지 알려 주세요.`,
    answers: ['1박 2일', '2박 3일', '3박 4일', '4박 5일', '잘 모르겠어요'],
  },
  {
    question: `하루에 몇 끼 정도 식사하시는지 궁금해요.`,
    answers: ['한 끼', '두 끼', '세 끼', '잘 모르겠어요'],
  },
];

export const REGION_MAP: Record<string, string> = {
  서울특별시: '서울',
  부산광역시: '부산',
  대구광역시: '대구',
  인천광역시: '인천',
  광주광역시: '광주',
  대전광역시: '대전',
  울산광역시: '울산',
  경기도: '경기',
  강원도: '강원',
  충청북도: '충북',
  충청남도: '충남',
  전라북도: '전북',
  전라남도: '전남',
  경상북도: '경북',
  경상남도: '경남',
  제주특별자치도: '제주',
  세종특별자치시: '세종',
};

export const CAROUSEL = [
  {
    image: find,
    title: '여행지 찾기',
    first: '당신의 완벽한 힐링을 위해,',
    second: '를 찾아 보세요.',
    accent: '검증된 웰니스 여행지',
    url: '/category',
  },
  {
    image: test,
    title: '쉼표 테스트',
    first: '내게 필요한 휴식이 이거였어?',
    second: '을 테스트로 알아 보세요.',
    accent: '나의 휴식 유형',
    url: '/test',
  },
  {
    image: camp,
    title: '',
    first: '웰니스 숙소, 뻔한 호텔 대신',
    second: '자연 속 럭셔리 캠핑장 어때요?',
    accent: '',
    url: 'https://www.allurekorea.com/2025/04/08/%ed%98%b8%ed%85%94-%eb%8c%80%ec%8b%a0-%ec%97%ac%ea%b8%b0-%ec%96%b4%eb%95%8c-%ec%9e%90%ec%97%b0-%ec%86%8d-%eb%9f%ad%ec%85%94%eb%a6%ac-%ec%ba%a0%ed%95%91%ec%9e%a5-5/',
  },
  {
    image: picnic,
    title: '',
    first: '숨통 트이는 황금연휴,',
    second: '상쾌한 공기 마시러 나들이 떠나 보세요.',
    accent: '',
    url: 'https://www.allurekorea.com/2025/04/28/%ec%97%b0%ed%9c%b4%ec%97%90-%ea%b0%80%ec%a1%b1-%eb%82%98%eb%93%a4%ec%9d%b4-%ea%b0%80%ea%b8%b0-%ec%a2%8b%ec%9d%80-%ea%b3%b3-4/',
  },
  {
    image: wellness,
    title: '',
    first: '여행, 좋은데 피곤하셨죠?',
    second: '여독을 풀어줄 웰니스 아이템을 소개해요.',
    accent: '',
    url: 'https://www.allurekorea.com/2024/07/10/travel-wellness/',
  },
  {
    image: temple,
    title: '',
    first: '연예인도 방문한 유명 템플스테이,',
    second: '몸과 마음을 가다듬으러 떠나 보세요.',
    accent: '',
    url: 'https://www.allurekorea.com/2024/05/23/%ec%97%b0%ec%98%88%ec%9d%b8%eb%8f%84-%eb%b0%a9%eb%ac%b8%ed%95%9c-%ed%85%9c%ed%94%8c-%ec%8a%a4%ed%85%8c-%ec%b6%94%ec%b2%9c-4/',
  },
];
