'use client';

import { useEffect, useState } from 'react';

import AddSpotSearch from '@/app/(_components)/course/bottomSheet/AddSpotSearch';
import CourseAddButton from '@/app/(_components)/course/bottomSheet/CourseAddButton';
import { ICourseList } from '@/app/(_utils)/type';
import Image from 'next/image';
import SearchSpotItem from '@/app/(_components)/course/bottomSheet/SearchSpotItem';
import SpotRecommend from '@/app/(_components)/course/bottomSheet/SpotRecommend';
import kakaoMap from '/public/images/kakaoMap.svg';
import { setTitleAtom } from '@/app/(_store)/title';
import { useAtom } from 'jotai';

export default function SpotSearchKaKao() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ICourseList[] | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<ICourseList | null>(null);
  const [detailId, setDetailId] = useState(0);
  const [, setTitle] = useAtom(setTitleAtom);

  useEffect(() => {
    setTitle('여행지 추가하기');
  }, [setTitle]);

  return (
    <div className="bg-w1 px-[16px] flex flex-col justify-between" style={{ minHeight: 'calc(100vh - 52px)' }}>
      <div className="pt-[23px]">
        <span className="font-semibold text-b1 tracking-[-0.013em]">
          <p className="flex items-center gap-[3px]">
            <Image src={kakaoMap} alt="카카오맵" width={119} height={32} />과 함께
          </p>
          원하는 여행지를 검색해 보세요
        </span>
        <AddSpotSearch
          type="kakao"
          setSelectedSpot={setSelectedSpot}
          setSearchResults={setSearchResults}
          query={query}
          setQuery={setQuery}
        />

        <p className="mt-[23px] font-semibold text-b1 tracking-[-0.013em]">이런 여행지는 어때요?</p>
        {searchResults === null ? (
          <SpotRecommend
            setDetailId={setDetailId}
            detailId={detailId}
            selectedSpot={selectedSpot}
            setSelectedSpot={setSelectedSpot}
          />
        ) : (
          <ul className="mt-[12px] mb-[60px] flex flex-col gap-2">
            {searchResults.map((spot, idx) => (
              <SearchSpotItem
                spot={spot}
                selectedSpot={selectedSpot}
                setSelectedSpot={setSelectedSpot}
                detailId={detailId}
                setDetailId={setDetailId}
                key={idx}
                type="kakao"
              />
            ))}
          </ul>
        )}
      </div>

      <CourseAddButton selectedSpot={selectedSpot} type="kakao" />
    </div>
  );
}
