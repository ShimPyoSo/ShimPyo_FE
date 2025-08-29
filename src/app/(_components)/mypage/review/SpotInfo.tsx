import { IReviewResponse } from '@/app/(_utils)/type';
import Image from 'next/image';
import Link from 'next/link';
import location from '/public/images/icons/spot/location.svg';

export default function SpotInfo({ info }: { info: IReviewResponse }) {
  return (
    <>
      <div className="mt-[30px] flex items-center gap-[6px]">
        <div className="px-[5px] py-[3px] border border-gn8 rounded-sm text-sm text-gn7 font-semibold bg-white">
          {info.region}
        </div>
        <Link
          className="text-lg text-b3 font-semibold tracking-[-0.02em] line-clamp-1 cursor-pointer"
          href={`/category/1`}
        >
          {info.title}
        </Link>
      </div>
      <div className="mt-[8px] flex items-center gap-[4px]">
        <Image src={location} alt="위치" width={16} height={16} />
        <p className="text-sm text-g1">{info.address}</p>
      </div>
    </>
  );
}
