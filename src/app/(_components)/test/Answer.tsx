import { optionals, questions } from '@/app/(_utils)/constants';

import AnswerItem from './AnswerItem';
import OptionalAnswerItem from './OptionalAnswerItem';

interface AnswerProps {
  currentIndex: number;
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}

export default function Answer({ currentIndex, selected, setSelected }: AnswerProps) {
  return (
    <>
      {currentIndex >= 7 && <p className="mt-[45px] text-sm text-g1">쉼표 유형 진단까지 거의 다 왔어요!</p>}
      <p className={`${currentIndex < 7 ? 'mt-[45px]' : 'mt-[3px]'} text-lg font-semibold whitespace-pre-line`}>
        {currentIndex < 7 ? questions[currentIndex].question : optionals[currentIndex - 7].question}
      </p>
      <ul className="mt-[30px] space-y-[12px] mb-[20px]">
        {currentIndex < 7
          ? questions[currentIndex].answers.map((answer, idx) => (
              <AnswerItem
                key={idx}
                currentIndex={currentIndex}
                selected={selected}
                setSelected={setSelected}
                answer={answer}
                description={questions[currentIndex].descriptions[idx]}
                idx={idx}
              />
            ))
          : optionals[currentIndex - 7].answers.map((text, idx) => (
              <OptionalAnswerItem selected={selected} setSelected={setSelected} text={text} idx={idx} key={idx} />
            ))}
      </ul>
    </>
  );
}
