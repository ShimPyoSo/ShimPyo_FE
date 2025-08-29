'use client';

import { ICourse } from '@/app/(_utils)/type';
import Image from 'next/image';
import dropdown from '/public/images/icons/spot/dropdown.svg';

interface SpotDropDownProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCourse?: React.Dispatch<React.SetStateAction<ICourse | null>>;
  idx: number;
  day: string;
}

export default function SpotDropDown({ isOpen, setIsOpen, setCourse, idx, day }: SpotDropDownProps) {
  const handleDelete = () => {
    if (!setCourse) return;

    setCourse((prev) => {
      if (!prev) return null;

      const updatedDays = prev.days.map((d) => {
        if (d.date !== day) return d;

        const updatedList = [...d.list];
        updatedList.splice(idx, 1);

        return { ...d, list: updatedList };
      });

      return { ...prev, days: updatedDays };
    });

    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button type="button" onClick={() => setIsOpen((prev) => !prev)} className="p-1">
        <Image src={dropdown} alt="메뉴" width={20} height={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[47px] rounded-md bg-white shadow-lg z-50 shadow-[0px_3px_8px_0px_#0000001A]">
          <ul className="text-xs text-b1 text-center">
            <li className="py-[2px] border-b border-[#EFF0F2]">
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
                className="w-full"
              >
                수정
              </button>
            </li>
            <li className="py-[2px]">
              <button onClick={handleDelete} className="w-full">
                삭제
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
