import { IReview } from '@/app/(_utils)/type';
import Image from 'next/image';

interface ReviewItemProps {
  review: IReview;
  setReviewImg: React.Dispatch<React.SetStateAction<string[] | null>>;
  setSelectedNumber: React.Dispatch<React.SetStateAction<number>>;
}

export default function ReviewItem({ review, setReviewImg, setSelectedNumber }: ReviewItemProps) {
  const handleSetImg = (index: number) => {
    setReviewImg(review.images);
    setSelectedNumber(index);
  };

  return (
    <li className="w-[280px] h-[186px] p-[16px] rounded-lg border border-w4 bg-[#fbfbfb] tracking-[-2%]">
      <div className="flex items-center justify-between mb-[8px]">
        <p className="text-sm text-b1 font-semibold">{review.nickname}</p>
        <p className="text-xs text-g1">{review.createdAt}</p>
      </div>
      <p
        className={`min-h-[50px] text-xs text-b3 ${
          review.images && review.images.length > 0 ? 'line-clamp-3' : 'line-clamp-7'
        }`}
      >
        {review.contents}
      </p>

      {review.images && review.images.length > 0 && (
        <ul className="mt-[16px] flex items-center gap-[8px]">
          {review.images.slice(0, 4).map((img: string, index: number) => (
            <li
              key={index}
              className="w-[56px] h-[62px] rounded-sm overflow-hidden cursor-pointer"
              onClick={() => handleSetImg(index)}
            >
              <Image
                src={img}
                alt={`리뷰 이미지 ${index + 1}`}
                width={56}
                height={62}
                className="object-cover w-full h-full"
              />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
