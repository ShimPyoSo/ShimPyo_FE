interface AnswerItemProps {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  idx: number;
}

export default function AnswerItem({ selected, setSelected, text, idx }: AnswerItemProps) {
  return (
    <li>
      <input
        type="radio"
        id={`question-${idx}`}
        name="question"
        value={text}
        className="hidden"
        checked={selected === text}
        onChange={() => setSelected(text)}
      />
      <div
        onClick={() => setSelected(text)}
        className={`
                cursor-pointer rounded-xl border p-[15px]
                ${selected === text ? 'bg-gn4 border-gn1' : 'bg-w3 border-w4'}
                transition-colors
              `}
      >
        <div className="flex items-center gap-[10px]">
          <div className="w-[62px] h-[58px] bg-w1 rounded-md text-3xl flex items-center justify-center">😴</div>
          <div className="tracking-[-2%]">
            <p className={`font-semibold text-sm ${selected === text ? 'text-gn1' : 'text-b3'}`}>{text}</p>
            <small className="mt-[8px] text-g1 text-xs">피곤해서 일찍 자고 싶어</small>
          </div>
        </div>
      </div>
    </li>
  );
}
