import { IFilter, ISpot } from '@/app/(_utils)/type';

import Filter from './Filter/Filter';
import Link from 'next/link';
import { SORT_BY } from '@/app/(_utils)/type';
import Sort from './Sort';

interface FilterNSortProps {
  type: 'list' | 'like';
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
  refetch?: () => void;
  spots: ISpot[];
  isLoading: boolean;
  setSelectedOption: React.Dispatch<React.SetStateAction<(typeof SORT_BY)[number]>>;
  selectedOption: (typeof SORT_BY)[number];
}

export default function FilterNSort({
  type,
  isLoading,
  refetch,
  spots,
  filter,
  setFilter,
  selectedOption,
  setSelectedOption,
}: FilterNSortProps) {
  return (
    <>
      {type === 'list' && (
        <div className="bg-w1 z-20">
          <Filter filter={filter} setFilter={setFilter} refetch={refetch} />
          {(isLoading || spots.length > 0) && (
            <div className="px-[16px] flex items-center justify-between">
              <span className="flex items-center text-xs text-g1 tracking-[-0.02em] mb-[6px]">
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
    </>
  );
}
