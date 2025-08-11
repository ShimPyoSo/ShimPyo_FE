'use client';

import { IReviewSpot } from '@/app/(_utils)/type';
import NoReview from '../../category/NoReview';
import SpotListItem from '@/app/(_components)/category/SpotListItem';
import SpotSkeleton from '../../category/SpotSkeleton';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function ReviewSpotList() {
  const fetchReviews = async (): Promise<IReviewSpot[]> => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/mypage/review`, {
      withCredentials: true,
    });
    return res.data;
  };

  const { data: spots = [], isLoading } = useQuery<IReviewSpot[]>({
    queryKey: ['reviewSpot'],
    queryFn: fetchReviews,
    refetchOnWindowFocus: false,
  });

  return (
    <ul className="h-full">
      {isLoading ? (
        Array.from({ length: 8 }).map((_, i) => <SpotSkeleton key={i} type="review" />)
      ) : spots.length > 0 ? (
        spots.map((spot, idx) => <SpotListItem type="review" key={idx} />)
      ) : (
        <div className="h-full flex flex-col justify-center items-center">
          <NoReview main="첫 번째 여행 이야기를 남겨주세요!" description="아직 작성하신 후기가 없어요" />
        </div>
      )}
    </ul>
  );
}
