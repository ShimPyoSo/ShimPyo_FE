'use client';

import axios from 'axios';
import { isLoggedInAtom } from '@/app/(_store)/auth';
import { useAtomValue } from 'jotai';
import { useInfiniteQuery } from '@tanstack/react-query';

interface useFetchSearchWordParams {
  word: string | string[];
  filter?: {
    region: string[];
    facilities: string[];
    visitTime?: string;
    target: [string[], string[]]; // gender, ageGroup
  };
  enabled?: boolean;
}

export const useFetchSearchWord = ({ word, filter, enabled }: useFetchSearchWordParams) => {
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  const fetchSearchResults = async ({ pageParam = 0 }) => {
    const params: Record<string, string> = {
      keyword: Array.isArray(word) ? word.join(',') : word || '',
    };

    if (filter) {
      if (filter.region.length > 0) params.region = filter.region.join('|');
      if (filter.facilities.length > 0) params.facilities = filter.facilities.join('|');
      if (filter.visitTime) params.visitTime = filter.visitTime;
      if (filter.target[0].length > 0) params.gender = filter.target[0].join('|');
      if (filter.target[1].length > 0) params.ageGroup = filter.target[1].join('|');
    }

    if (pageParam) params.lastId = String(pageParam);

    const queryString = new URLSearchParams(params).toString();
    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/search?${queryString}`;

    const res = await axios.get(url, { withCredentials: isLoggedIn });
    return Array.isArray(res.data) ? res.data : [];
  };

  const query = useInfiniteQuery({
    queryKey: ['search', word],
    queryFn: fetchSearchResults,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.length < 8) return undefined;
      const lastItem = lastPage[lastPage.length - 1];
      return lastItem.id;
    },
    refetchOnWindowFocus: false,
    enabled: enabled ?? true,
  });

  return query;
};
