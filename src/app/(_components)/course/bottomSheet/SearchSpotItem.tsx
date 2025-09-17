'use client';

import DetailButton from './DetailButton';
import { ICourseList } from '@/app/(_utils)/type';
import Image from 'next/image';
import SpotDetailComponent from '../../category/Detail/SpotDetailComponent';
import check from '/public/images/icons/check.svg';
import location from '/public/images/icons/spot/location.svg';
import spotDefault from '/public/images/icons/course/spotDefault.svg';

interface SearchSpotItemProps {
  spot: ICourseList;
  selectedSpot: ICourseList | null;
  setSelectedSpot: React.Dispatch<React.SetStateAction<ICourseList | null>>;
  detailId: number;
  setDetailId: React.Dispatch<React.SetStateAction<number>>;
  type: 'kakao' | 'search';
}

export default function SearchSpotItem({
  spot,
  selectedSpot,
  setSelectedSpot,
  detailId,
  setDetailId,
  type,
}: SearchSpotItemProps) {
  const isChecked = selectedSpot?.touristId === spot.touristId;

  const handleCheck = () => {
    if (isChecked) {
      setSelectedSpot(null);
    } else {
      setSelectedSpot(spot);
    }
  };

  return (
    <li className="py-[18px] border-b border-w5">
      <div className="flex gap-[12px]">
        <div className="w-[102px] h-[113px] bg-white border border-w4 rounded-xl relative">
          {type === 'search' && spot.images ? (
            <Image src={spot.images} alt="관광지 이미지" fill className="object-cover rounded-xl" />
          ) : (
            <Image src={spotDefault} alt="관광지 이미지" fill className="py-[15px] px-[20px]" />
          )}
        </div>
        <div className="grow-1 py-[3px] flex flex-col">
          <div className="flex justify-between items-center">
            <div className="p-[3px] rounded-sm text-white bg-gn2 text-xs tracking-[-0.02em]">{spot.region}</div>
            <label>
              <input type="checkbox" className="peer hidden" checked={isChecked} onChange={handleCheck} />
              <div className="w-5 h-5 border border-w4 bg-w4 rounded-sm peer-checked:bg-gn4 peer-checked:border-gn1 relative cursor-pointer">
                {isChecked && (
                  <Image className="absolute top-[4px] left-[4px]" src={check} alt="check" width={11} height={8} />
                )}
              </div>
            </label>
          </div>
          <div className="max-w-[229px] grow-1 mt-[3px]">
            <p className="text-sm text-b3 font-semibold tracking-[-0.02em] line-clamp-2">{spot.title}</p>
            <div className="flex items-center gap-[4px]">
              <Image src={location} alt="위치" width={14} height={14} />
              <p className="mt-[6px] text-xs text-g1 truncate">{spot.address}</p>
            </div>
          </div>
          <DetailButton touristId={spot.touristId as number} detailId={detailId} setDetailId={setDetailId} />
        </div>
      </div>

      {detailId === spot.touristId && (
        <div className="mt-[24px] h-[500px] overflow-y-scroll relative">
          {type === 'search' ? (
            <SpotDetailComponent id={spot.touristId} type="course" />
          ) : (
            <iframe src={spot.placeURL} className="flex-1 w-full h-full border-0" />
          )}
        </div>
      )}
    </li>
  );
}
