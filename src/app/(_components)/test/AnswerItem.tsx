import Image from 'next/image';
import border from '/public/images/test/border.png';
import checked from '/public/images/test/checked.svg';
import { questions } from '@/app/(_utils)/constants';

interface AnswerItemProps {
  selected: number;
  currentIndex: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  answer: {
    scores: {
      [key: string]: number;
    };
    text: string;
  };
  description: string;
  idx: number;
}

export default function AnswerItem({ currentIndex, selected, setSelected, answer, description, idx }: AnswerItemProps) {
  return (
    <li>
      <input
        type="radio"
        id={`question-${idx}`}
        name="question"
        value={idx}
        className="hidden"
        checked={selected === idx}
        onChange={() => setSelected(idx)}
      />
      <div
        onClick={() => setSelected(idx)}
        className={`
                relative cursor-pointer rounded-xl p-[15px]
                ${selected === idx ? 'bg-gn4' : 'bg-w3 border border-w4'}
              `}
      >
        {selected === idx && (
          <Image src={border} alt="border" fill className="absolute inset-0 rounded-xl pointer-events-none" />
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[12px]">
            <div className="w-[62px] h-[58px] bg-w1 rounded-md text-3xl flex items-center justify-center">
              {questions[currentIndex].icons[idx]}
            </div>
            <div className="tracking-[-2%]">
              <p className={`font-semibold text-sm ${selected === idx ? 'text-gn1' : 'text-b3'}`}>{answer.text}</p>
              <small className="mt-[8px] text-g1 text-xs">{description}</small>
            </div>
          </div>

          {selected === idx && <Image src={checked} alt="선택됨" width={24} height={24} />}
        </div>
      </div>
    </li>
  );
}
