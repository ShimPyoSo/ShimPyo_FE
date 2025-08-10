'use client';

import CategoryHeader from '@/app/(_components)/category/CategoryHeader';
import Filter from './Filter/Filter';
import ProtectedRoute from '@/app/ProtectedRoute';
import SpotListItem from './SpotListItem';

export default function CategoryComponent() {
  return (
    <ProtectedRoute>
      <div className="bg-w1">
        <CategoryHeader />
        <Filter />
        <ul className="px-[16px] pb-[20px] flex-1 overflow-y-auto">
          <SpotListItem />
          <SpotListItem />
          <SpotListItem />
          <SpotListItem />
          <SpotListItem />
          <SpotListItem />
          <SpotListItem />
          <SpotListItem />
          <SpotListItem />
          <SpotListItem />
          <SpotListItem />
          <SpotListItem />
          <SpotListItem />
        </ul>
      </div>
    </ProtectedRoute>
  );
}
