import Image from 'next/image';
import check from '/public/images/icons/check.svg';

interface CourseDateProps {
  selectedDay: number;
  setSelectedDay: React.Dispatch<React.SetStateAction<number>>;
}

export default function CourseDate({ selectedDay, setSelectedDay }: CourseDateProps) {
  return (
    <section>
      <p className="mt-[52px] tracking-[-2%] text-g1 text-xs">날짜 선택</p>
      <ul className="mt-[12px] flex gap-[12px] items-center">
        {Array.from({ length: 4 }, (_, i) => (
          <li key={i} className="flex items-center gap-[4px] tracking-[-2%] text-b3 text-sm">
            <label htmlFor={`day-${i + 1}`} className="flex items-center gap-2 cursor-pointer select-none">
              <input
                id={`day-${i + 1}`}
                type="radio"
                name="day-select"
                checked={selectedDay === i}
                onChange={() => setSelectedDay(i)}
                className="peer hidden"
              />
              <span
                className="w-5 h-5 border border-w4 bg-w4 rounded-sm peer-checked:bg-gn4 peer-checked:border-gn1 relative flex-shrink-0"
                aria-hidden="true"
              >
                {selectedDay === i && (
                  <Image className="absolute top-[4px] left-[4px]" src={check} alt="check" width={11} height={8} />
                )}
              </span>
              {i + 1}일
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
