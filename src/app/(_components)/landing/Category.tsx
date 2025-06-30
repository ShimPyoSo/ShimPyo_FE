export default function Category() {
  return (
    <section className="mt-[70px] pr-[16px]">
      <h3 className="font-[kkubulim] text-gn1 text-xl">여행지 카테고리</h3>
      <p className="text-sm text-g1">다양한 유형의 여행지를 확인해 보세요</p>
      <ul className="mt-[16px] flex justify-between">
        <li className="flex flex-col items-center text-xs text-b3">
          <div className="w-[50px] h-[48px] rounded-md border border-gray-300 bg-white mb-[3px] tracking-[-2%]"></div>
          명상
        </li>
        <li className="flex flex-col items-center text-xs text-b3">
          <div className="w-[50px] h-[48px] rounded-md border border-gray-300 bg-white mb-[3px] tracking-[-2%]"></div>
          스파
        </li>
        <li className="flex flex-col items-center text-xs text-b3">
          <div className="w-[50px] h-[48px] rounded-md border border-gray-300 bg-white mb-[3px] tracking-[-2%]"></div>
          K-뷰티
        </li>
        <li className="flex flex-col items-center text-xs text-b3">
          <div className="w-[50px] h-[48px] rounded-md border border-gray-300 bg-white mb-[3px] tracking-[-2%]"></div>
          자연친화
        </li>
        <li className="flex flex-col items-center text-xs text-b3">
          <div className="w-[50px] h-[48px] rounded-md border border-gray-300 bg-white mb-[3px] tracking-[-2%]"></div>
          건강식
        </li>
        <li className="flex flex-col items-center text-xs text-b3">
          <div className="w-[50px] h-[48px] rounded-md border border-gray-300 bg-white mb-[3px] tracking-[-2%]"></div>
          전체
        </li>
      </ul>
    </section>
  );
}
