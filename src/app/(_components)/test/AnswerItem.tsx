import Image from 'next/image';
import checked from '/public/images/test/checked.svg';

interface AnswerItemProps {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  text: string;
  description: string;
  idx: number;
}

export default function AnswerItem({ selected, setSelected, text, description, idx }: AnswerItemProps) {
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
                cursor-pointer rounded-xl border p-[15px]
                ${selected === idx ? 'bg-gn4 border-gn1' : 'bg-w3 border-w4'}
                transition-colors
              `}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[12px]">
            <div className="w-[62px] h-[58px] bg-w1 rounded-md text-3xl flex items-center justify-center">😴</div>
            <div className="tracking-[-2%]">
              <p className={`font-semibold text-sm ${selected === idx ? 'text-gn1' : 'text-b3'}`}>{text}</p>
              <small className="mt-[8px] text-g1 text-xs">{description}</small>
            </div>
          </div>

          {selected === idx && <Image src={checked} alt="선택됨" width={24} height={24} />}
        </div>
      </div>
    </li>
  );
}
