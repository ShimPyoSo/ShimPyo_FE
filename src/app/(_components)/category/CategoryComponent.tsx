'use client';

import { useEffect, useState } from 'react';

import CategoryHeader from '@/app/(_components)/category/CategoryHeader';
import Filter from './Filter/Filter';
import { IFilter } from '@/app/(_utils)/type';
import Link from 'next/link';
import NoLiked from './NoLiked';
import NoResult from '../search/NoResult';
import { SORT_BY } from '@/app/(_utils)/type';
import Sort from './Sort';
import SpotListItem from './SpotListItem';
import SpotSkeleton from './SpotSkeleton';
import axios from 'axios';
import { isLoggedInAtom } from '@/app/(_store)/auth';
import { useAtomValue } from 'jotai';
import { useInfiniteQuery } from '@tanstack/react-query';
import useInfiniteScroll from '@/app/(_utils)/hooks/useInfiniteScroll';
import { useSearchParams } from 'next/navigation';

export default function CategoryComponent({ type }: { type: 'list' | 'like' }) {
  const searchParams = useSearchParams();
  const category = searchParams.get('type') ?? '';
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<IFilter>({
    region: [],
    facilities: [],
    target: [[], []],
    visitTime: '',
  });
  const [selectedOption, setSelectedOption] = useState<(typeof SORT_BY)[number]>(SORT_BY[0]);
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  useEffect(() => setMounted(true), []);

  const fetchSpots = async ({ pageParam = 0 }) => {
    let url = '';
    let config = {};

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
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, refetch } = useInfiniteQuery({
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

  const allSpots = data?.pages.flatMap((page) => page) ?? [];
  const observerRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

  if (!mounted) return null;

  return (
    <div className="bg-w1 relative min-h-screen">
      <CategoryHeader />
      <section className="bg-w1 z-10 min-h-[calc(100vh-318px)]">
        {type === 'list' && (
          <div className="sticky top-[56px] bg-w1 z-20">
            <Filter filter={filter} setFilter={setFilter} refetch={refetch} />
            {(isLoading || allSpots.length > 0) && (
              <div className="px-[16px] mb-[6px] flex items-center justify-between">
                <span className="flex items-center text-xs text-g1 tracking-[-2%]">
                  ⓘ&nbsp;
                  <Link className="text-b3" href={'https://knto.or.kr/index'} rel="noopener noreferrer" target="_blank">
                    한국관광공사
                  </Link>
                  에서 제공하는 정보예요.
                </span>
                <Sort selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
              </div>
            )}
          </div>
        )}

        <div
          className={`sticky bg-w1 z-10 max-h-[calc(100vh-56px)] overflow-auto scrollbar-hide ${
            type === 'list' ? 'top-[156px]' : 'top-[56px]'
          }`}
        >
          <ul className="px-[16px] pb-[60px]">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => <SpotSkeleton key={i} type="spot" />)
            ) : allSpots.length > 0 ? (
              allSpots.map((spot, idx) => <SpotListItem key={idx} type="spot" spot={spot} />)
            ) : type === 'like' ? (
              <NoLiked />
            ) : (
              <NoResult type="category" />
            )}
            <div ref={observerRef} className="h-10" />
          </ul>
        </div>
      </section>
    </div>
  );
}
