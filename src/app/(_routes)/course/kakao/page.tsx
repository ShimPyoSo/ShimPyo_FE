'use client';

import AddSpotSearch from '@/app/(_components)/course/AddSpotSearch';
import CourseAddButton from '@/app/(_components)/course/CourseAddButton';
import { ICourseList } from '@/app/(_utils)/type';
import SearchSpotItem from '@/app/(_components)/course/SearchSpotItem';
import SpotRecommend from '@/app/(_components)/course/SpotRecommend';
import { useState } from 'react';

export default function SpotSearchKaKao() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ICourseList[] | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<ICourseList | null>(null);
  const [detailId, setDetailId] = useState(0);

  return (
    <div
      className="bg-w1 px-[16px] pb-[40px] flex flex-col justify-between"
      style={{ minHeight: 'calc(100vh - 52px)' }}
    >
      <div>
        <AddSpotSearch
          type="kakao"
          setSelectedSpot={setSelectedSpot}
          setSearchResults={setSearchResults}
          query={query}
          setQuery={setQuery}
        />

        <p className="mt-[23px] font-semibold text-b1 tracking-[-1.3%]">이런 여행지는 어때요?</p>

        {searchResults === null ? (
          <SpotRecommend setDetailId={setDetailId} />
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
