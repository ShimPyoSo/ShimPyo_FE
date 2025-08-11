import Image from 'next/image';
import checked from '/public/images/test/checked.svg';

interface OptionalAnswerItemProps {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  idx: number;
  text: string;
}

export default function OptionalAnswerItem({ selected, setSelected, text, idx }: OptionalAnswerItemProps) {
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
                cursor-pointer rounded-xl border p-[15px] flex items-center justify-between font-semibold text-b3 text-sm tracking-[-2%]
                ${selected === idx ? 'bg-gn4 border-gn1' : 'bg-w3 border-w4'}
                transition-colors
              `}
      >
        {text}
        {selected === idx && <Image src={checked} alt="선택됨" width={24} height={24} />}
      </div>
    </li>
  );
}
