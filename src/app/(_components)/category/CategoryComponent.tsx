'use client';

import CategoryHeader from '@/app/(_components)/category/CategoryHeader';
import Filter from './Filter/Filter';
import SpotListItem from './SpotListItem';

export default function CategoryComponent() {
  return (
    <>
      <div className="bg-w1">
        <CategoryHeader />
        <Filter />
        <ul className="px-[16px] pb-[20px] flex-1 overflow-y-auto">
          <SpotListItem type="spot" />
          <SpotListItem type="spot" />
          <SpotListItem type="spot" />
          <SpotListItem type="spot" />
          <SpotListItem type="spot" />
          <SpotListItem type="spot" />
          <SpotListItem type="spot" />
          <SpotListItem type="spot" />
          <SpotListItem type="spot" />
          <SpotListItem type="spot" />
          <SpotListItem type="spot" />
          <SpotListItem type="spot" />
          <SpotListItem type="spot" />
        </ul>
      </div>
    </>
  );
}
