'use client';

import { IError, SORT_BY } from '../type';
import axios, { AxiosError } from 'axios';

import { IFilter } from '../type';
import { isLoggedInAtom } from '@/app/(_store)/auth';
import { useAtomValue } from 'jotai';
import { useHandleTokenExpired } from './useHandleTokenExpired';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

interface useFetchCategorySpotProps {
  filter: IFilter;
  type: 'like' | 'list';
  selectedOption: (typeof SORT_BY)[number];
}

export function useFetchCategorySpot({ filter, type, selectedOption }: useFetchCategorySpotProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get('type') ?? '';
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const { handleAccessExpired } = useHandleTokenExpired();

  const fetchSpots = async ({ pageParam = 0 }) => {
    let url = '';
    let config = {};

    try {
      if (type === 'like') {
        const likesIdParam = pageParam !== 0 ? `&likesId=${pageParam}` : '';
        url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/mypage/likes?category=${
          category === '' ? 'all' : category
        }${likesIdParam}`;
        config = { withCredentials: true };
      } else if (type === 'list') {
        const params: Record<string, string> = { category: category || 'all' };

        if (filter.region.length > 0) params.region = filter.region.join('|');
        if (filter.facilities.length > 0) params.requiredService = filter.facilities.join('|');
        if (filter.visitTime) params.visitTime = filter.visitTime;
        if (filter.target[0].length > 0) params.gender = filter.target[0].join('|');
        if (filter.target[1].length > 0) params.ageGroup = filter.target[1].join('|');
        params.sortBy = selectedOption.key;
        if (pageParam !== 0) params.lastId = String(pageParam);

        const queryString = new URLSearchParams(params).toString();
        url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/tourlist/category?${queryString}`;
        config = isLoggedIn ? { withCredentials: true } : {};
      }

      const res = await axios.get(url, config);
      return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
      const err = error as AxiosError<IError>;
      if (err.response?.data?.name === 'INVALID_TOKEN' || err.response?.data?.message === '만료된 토큰입니다.') {
        handleAccessExpired('INVALID_TOKEN');
        try {
          const retryRes = await axios.get(url, config);
          return Array.isArray(retryRes.data) ? retryRes.data : [];
        } catch {
          // reissue 이후 에러처리
        }
      }
      console.log(err.response?.data?.message);
    }
  };

  const query = useInfiniteQuery({
    queryKey: ['spots', type, category, selectedOption],
    queryFn: fetchSpots,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage || !Array.isArray(lastPage)) return undefined;
      if (lastPage.length < 8) return undefined;
      const lastItem = lastPage[lastPage.length - 1];
      return type === 'like' ? lastItem.likesId : lastItem.id;
    },
    refetchOnWindowFocus: false,
  });

  return query;
}
