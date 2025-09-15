import { ICourseList } from '@/app/(_utils)/type';
import Image from 'next/image';
import spotDefault from '/public/images/icons/course/spotDefault.svg';

interface SpotItemProps {
  spot: ICourseList;
  detailId: number;
  setDetailId: React.Dispatch<React.SetStateAction<number>>;
}

export default function RecommendItem({ spot, setDetailId, detailId }: SpotItemProps) {
  return (
    <li className="max-w-[102px] flex flex-col" title={spot.title || ''}>
      <div className="relative w-[102px] h-[102px] rounded-lg border border-g3">
        {spot.images ? (
          <Image
            className="w-[102px] h-[102px] rounded-lg bg-white object-cover"
            src={spot.images as string}
            alt={spot.title}
            fill
          />
        ) : (
          <Image className="py-[15px] px-[20px]" src={spotDefault} alt="관광지 이미지" fill />
        )}
        <div className="absolute top-[8px] left-[8px] py-[3px] px-[4px] rounded-sm text-white bg-gn2 text-xs tracking-[-0.02em]">
          {spot.region}
        </div>
      </div>

      <div className="mt-[20px] flex justify-between items-center">
        <p className="max-w-[74px] text-xs text-g3 tracking-[-0.02em] truncate">{spot.category?.[0] || '명상'}</p>
        <button
          className={`w-fit text-xs rounded-md flex items-center ${
            detailId === spot.touristId ? 'text-b3' : 'text-gn1'
          }`}
          onClick={() => setDetailId(detailId === spot.touristId ? 0 : (spot.touristId as number))}
          type="button"
        >
          {detailId === spot.touristId ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7 11L10.5006 8L14 11"
                stroke="#919191"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7 9L10.5006 12L14 9"
                stroke="#79987A"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>
      <p className="mt-[8px] font-semibold text-xs text-b3 tracking-[-0.02em] line-clamp-2">{spot.title}</p>
    </li>
  );
}
