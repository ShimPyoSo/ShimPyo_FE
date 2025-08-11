import AnswerItem from './AnswerItem';
import Progress from './Progress';
import { useState } from 'react';

export default function Question() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState('');
  const questions = [
    {
      question: `바쁜 한 주의 끝,\n오늘 밤 가장 하고 싶은 일은 무엇인가요?`,
      answers: ['영화 보기', '친구 만나기', '책 읽기', '운동하기'],
    },
    {
      question: '이번 주말 가장 기대되는 활동은 무엇인가요?',
      answers: ['여행 가기', '맛집 탐방', '휴식하기', '운동하기'],
    },
    {
      question: '평소 스트레스를 푸는 방법은 무엇인가요?',
      answers: ['음악 듣기', '운동하기', '요리하기', '영화 보기'],
    },
    {
      question: '휴가를 간다면 선호하는 장소는?',
      answers: ['해변', '산', '도시', '시골'],
    },
    {
      question: '가장 좋아하는 계절은?',
      answers: ['봄', '여름', '가을', '겨울'],
    },
    {
      question: '주말 아침에 주로 하는 활동은?',
      answers: ['조깅하기', '독서하기', '친구 만나기', '늦잠 자기'],
    },
    {
      question: '선호하는 운동 종류는?',
      answers: ['요가', '달리기', '수영', '헬스'],
    },
    {
      question: '여행 갈 때 꼭 챙기는 것은?',
      answers: ['카메라', '책', '간식', '여행 가이드북'],
    },
    {
      question: '가장 좋아하는 음식은?',
      answers: ['한식', '중식', '일식', '양식'],
    },
    {
      question: '평소 가장 많이 사용하는 SNS는?',
      answers: ['인스타그램', '페이스북', '트위터', '틱톡'],
    },
  ];

  const handleNext = () => {
    if (!selected) return;
    // 선택 저장 로직 있으면 추가
    setSelected('');
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // 끝났을 때 처리
    }
  };

  return (
    <div>
      <Progress num={currentIndex} />
      <p className="mt-[45px] text-lg font-semibold whitespace-pre-line">{questions[0].question}</p>
      <ul className="mt-[30px] space-y-[12px]">
        {questions[0].answers.map((text, idx) => (
          <AnswerItem key={idx} selected={selected} setSelected={setSelected} text={text} idx={idx} />
        ))}
      </ul>
      <button
        disabled={!selected}
        className="w-full mt-[48px] py-[16px] border rounded-lg font-semibold tracking-[-1.3%] mb-[40px] bg-gn1 text-white border-gn5"
        onClick={handleNext}
      >
        {currentIndex < questions.length - 1 ? '다음으로' : '나의 쉼표 유형 확인하기'}
      </button>
    </div>
  );
}
