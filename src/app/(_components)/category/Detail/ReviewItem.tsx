import { IReview } from '@/app/(_utils)/type';

interface ReviewItemProps {
  review: IReview;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ReviewItem({ review, setIsOpen }: ReviewItemProps) {
  return (
    <li className="w-[280px] h-[186px] p-[16px] rounded-lg border border-w4 bg-[#fbfbfb] tracking-[-2%]">
      <div className="flex items-center justify-between mb-[8px]">
        <p className="text-sm text-b1 font-semibold">{review.nickname}</p>
        <p className="text-xs text-g1">{review.createdAt}</p>
      </div>
      <p className={`text-xs text-b3 ${review.images.length > 0 ? 'line-clamp-3' : 'line-clamp-7'}`}>
        {review.contents}
      </p>

      {review.images.length > 0 && (
        <ul className="mt-[16px] flex items-center gap-[8px]">
          <li className="w-[56px] h-[62px] rounded-sm bg-w1" onClick={() => setIsOpen(true)}></li>
          <li className="w-[56px] h-[62px] rounded-sm bg-w1" onClick={() => setIsOpen(true)}></li>
          <li className="w-[56px] h-[62px] rounded-sm bg-w1" onClick={() => setIsOpen(true)}></li>
          <li className="w-[56px] h-[62px] rounded-sm bg-w1" onClick={() => setIsOpen(true)}></li>
        </ul>
      )}
    </li>
  );
}
