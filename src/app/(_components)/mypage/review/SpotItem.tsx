import Image from 'next/image';
import Link from 'next/link';
import location from '/public/images/icons/spot/location.svg';
import review from '/public/images/icons/spot/review.svg';

export default function SpotItem() {
  return (
    <li className="py-[18px] flex gap-[12px] border-b border-w5">
      <div className="w-[102px] h-[113px] bg-white border border-w4 rounded-xl cursor-pointer"></div>
      <div className="grow-1 py-[3px] flex flex-col">
        <div className="flex justify-between items-center">
          <div className="px-[5px] py-[3px] border border-gn8 rounded-sm text-xs text-gn7 font-semibold bg-white">
            대구
          </div>
        </div>
        <div className="grow-1">
          <Link
            className="text-sm text-b3 font-semibold tracking-[-2%] line-clamp-2 cursor-pointer"
            href={`/mypage/review/1`}
          >
            최대 두 줄의 텍스트를 입력해 주세요
          </Link>
        </div>

        <div>
          <div className="flex items-center gap-[4px]">
            <Image src={location} alt="위치" width={14} height={14} />
            <p className="text-xs text-g1">서울특별시 영등포구 여의나루로 121</p>
          </div>
          <div className="flex items-center gap-[4px]">
            <Image src={review} alt="후기" width={14} height={14} />
            <p className="text-xs text-g1">내가 쓴 후기 3개</p>
          </div>
        </div>
      </div>
    </li>
  );
}
