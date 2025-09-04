import { ISpot } from '@/app/(_utils)/type';
import Image from 'next/image';
import Liked from '../spot/Liked';
import Link from 'next/link';

export default function SpotItem({ spot }: { spot: ISpot }) {
  return (
    <li className="max-w-[102px] flex flex-col" title={spot.title || ''}>
      <Link href={`/category/${spot.id}`}>
        <div className="relative w-[102px] h-[102px] rounded-lg border border-g3">
          {spot.images && (
            <Image
              className="w-[102px] h-[102px] rounded-lg bg-white object-cover"
              src={spot.images as string}
              alt={spot.title}
              fill
            />
          )}
          <div className="absolute top-[8px] left-[8px] py-[3px] px-[4px] rounded-sm text-white bg-gn2 text-xs tracking-[-0.02em]">
            {spot.region}
          </div>
        </div>

        <div className="mt-[20px] flex justify-between items-center">
          <p className="max-w-[74px] text-xs text-g3 tracking-[-0.02em] truncate">{spot.category![0]}</p>
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Liked liked={spot.isLiked || false} id={spot.id as number} type="list" />
          </div>
        </div>
        <p className="mt-[8px] font-semibold text-xs text-b3 tracking-[-0.02em] line-clamp-2">{spot.title}</p>
      </Link>
    </li>
  );
}
