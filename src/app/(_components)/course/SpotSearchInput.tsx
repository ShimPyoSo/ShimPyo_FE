'use client';

import Image from 'next/image';
import search from '/public/images/icons/search.svg';

export default function SpotSearchInput() {
  const openPopup = () => {
    window.open('/course/search', '쉼표 여행지 추가하기', 'width=500,height=600,scrollbars=yes');
  };

  return (
    <section className="mt-[24px]">
      <p className="tracking-[1.3%] font-semibold text-b1">쉼표 여행지 추가하기</p>
      <div className="relative">
        <input
          className="mt-[12px] mb-[8px] w-full bg-white rounded-lg border border-w4 text-sm py-[12px] px-[16px] outline-none placeholder:text-g3 hover:border-gn1"
          placeholder="어떤 여행지에 쉼표를 찍어볼까요?"
          readOnly
          onClick={openPopup}
        />
        <Image
          className="absolute right-[16px] top-[22px] cursor-pointer"
          src={search}
          alt="검색"
          width={22}
          height={22}
          role="button"
        />
      </div>
    </section>
  );
}
