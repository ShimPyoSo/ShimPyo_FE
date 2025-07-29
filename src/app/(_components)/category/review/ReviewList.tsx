'use client';

import { IReview } from '@/app/(_utils)/type';
import NoReview from '../NoReview';
import ReviewItem from './ReviewItem';
import ReviewSkeleton from './ReviewSkeleton';
import axios from 'axios';
import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import useInfiniteScroll from '@/app/(_utils)/hooks/useInfiniteScroll';
import { useParams } from 'next/navigation';

interface ReviewListProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ReviewList({ setIsOpen }: ReviewListProps) {
  const { id } = useParams();

  const fetchReviews = async ({ pageParam = 0 }) => {
    const reviewIdParam = pageParam !== 0 ? `&reviewId=${pageParam}` : '';
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/tourlist/reviews?limit=8&touristId=${id}${reviewIdParam}`
    );

    const data = res.data;

    return {
      reviews: Array.isArray(data.reviews) ? data.reviews : [],
      hasMore: !!data.hasMore,
      nextPage: data.nextPage ?? 0,
    };
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['reviews', id],
    queryFn: fetchReviews,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextPage : undefined),
  });

  useEffect(() => {
    console.log(data);
  }, [data]);
  const observerRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

  return (
    <>
      {isLoading ? (
        <ul className="flex flex-col gap-[12px] mt-[50px] pb-[40px]">
          {Array.from({ length: 5 }).map((_, i) => (
            <ReviewSkeleton key={i} />
          ))}
        </ul>
      ) : true ? (
        <ul className="flex flex-col gap-[12px] mt-[50px] pb-[40px]">
          {data?.pages[0].reviews.map((review: IReview) => (
            <ReviewItem key={review.reviewId} review={review} setIsOpen={setIsOpen} />
          ))}
          {isFetchingNextPage && Array.from({ length: 2 }).map((_, i) => <ReviewSkeleton key={`loading-${i}`} />)}
          <div ref={observerRef} className="h-10" />
        </ul>
      ) : (
        <div className="flex flex-col justify-center items-center h-[calc(100vh-120px)]">
          <NoReview />
        </div>
      )}
    </>
  );
}
