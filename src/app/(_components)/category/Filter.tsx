export default function Filter() {
  return (
    <ul className="px-[16px] pt-[24px] pb-[20px] flex items-center justify-between">
      <li className="py-[6px] px-[16px] bg-white border border-w6 rounded-[100px] text-b3 text-sm tracking-[-2%] cursor-pointer">
        지역
      </li>
      <li className="py-[6px] px-[16px] bg-white border border-w6 rounded-[100px] text-b3 text-sm tracking-[-2%] cursor-pointer">
        여행지 유형
      </li>
      <li className="py-[6px] px-[16px] bg-white border border-w6 rounded-[100px] text-b3 text-sm tracking-[-2%] cursor-pointer">
        예약
      </li>
      <li className="py-[6px] px-[16px] bg-white border border-w6 rounded-[100px] text-b3 text-sm tracking-[-2%] cursor-pointer">
        소요 시간
      </li>
    </ul>
  );
}
