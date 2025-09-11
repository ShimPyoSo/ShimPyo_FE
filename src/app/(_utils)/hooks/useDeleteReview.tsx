'use client';

import { IError, IReviewResponse } from '../type';
import axios, { AxiosError } from 'axios';

import { QueryObserverResult } from '@tanstack/react-query';
import { useHandleTokenExpired } from './useHandleTokenExpired';
import { useRouter } from 'next/navigation';

export function useDeleteReview() {
  const router = useRouter();
  const { handleAccessExpired } = useHandleTokenExpired();

  const handleDeleteReview = async (
    isAllDelete: boolean,
    touristId: number,
    reviewId: number,
    refetch: () => Promise<QueryObserverResult<IReviewResponse, unknown>>
  ) => {
    if (isAllDelete) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/mypage/review?touristId=${touristId}`, {
          withCredentials: true,
        });
        router.push('/mypage/review');
      } catch (error) {
        const err = error as AxiosError<IError>;
        if (err.response?.data?.name === 'INVALID_TOKEN' || err.response?.data?.message === '만료된 토큰입니다.') {
          await handleAccessExpired('INVALID_TOKEN');
          try {
            await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/mypage/review?touristId=${touristId}`, {
              withCredentials: true,
            });
            router.push('/mypage/review');
          } catch {
            // reissue 이후 에러처리
          }
        }
        console.log(err.response?.data?.message);
      }
    } else {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/mypage/review?touristId=${touristId}&reviewId=${reviewId}`,
          { withCredentials: true }
        );
        refetch();
      } catch (error) {
        const err = error as AxiosError<IError>;
        if (err.response?.data?.name === 'INVALID_TOKEN' || err.response?.data?.message === '만료된 토큰입니다.') {
          handleAccessExpired('INVALID_TOKEN');
          try {
            await axios.delete(
              `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/mypage/review?touristId=${touristId}&reviewId=${reviewId}`,
              { withCredentials: true }
            );
            refetch();
          } catch {
            // reissue 이후 에러처리
          }
        }
        console.log(err.response?.data?.message);
      }
    }
  };

  return { handleDeleteReview };
}
