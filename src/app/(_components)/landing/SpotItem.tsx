import { ISpot } from '@/app/(_utils)/type';
import Image from 'next/image';
import Liked from '../spot/Liked';
import Link from 'next/link';

interface SpotItemProps {
  spot: ISpot;
  type: 'landing' | 'addition';
  setDetailId?: React.Dispatch<React.SetStateAction<number>>;
}

export default function SpotItem({ spot, type, setDetailId }: SpotItemProps) {
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    type === 'landing' ? (
      <Link href={`/category/${spot.id}`}>{children}</Link>
    ) : (
      <div onClick={() => setDetailId?.((spot.id ?? spot.touristId) as number)}>{children}</div>
    );

  return (
    <li className="max-w-[102px] flex flex-col" title={spot.title || ''}>
      <Wrapper>
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
          <p className="max-w-[74px] text-xs text-g3 tracking-[-0.02em] truncate">{spot.category?.[0] || '명상'}</p>
          {type === 'landing' && (
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Liked liked={spot.isLiked || false} id={spot.id as number} type="list" />
            </div>
          )}
        </div>
        <p className="mt-[8px] font-semibold text-xs text-b3 tracking-[-0.02em] line-clamp-2">{spot.title}</p>
      </Wrapper>
    </li>
  );
}
