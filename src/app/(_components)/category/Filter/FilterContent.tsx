import AreaFilter from './AreaFilter';
import { IFilter } from '@/app/(_utils)/type';
import ReservationFilter from './ReservationFilter';
import ServiceFilter from './ServiceFilter';
import TargetFilter from './TargetFilter';

interface FilterContentProps {
  selectedFilter: string | null;
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
  filterItem: { label: string; key: keyof IFilter }[];
}

export default function FilterContent({ selectedFilter, filter, setFilter, filterItem }: FilterContentProps) {
  return (
    <div className="pb-[40px]">
      <AreaFilter selectedFilter={selectedFilter} filter={filter} setFilter={setFilter} filterItem={filterItem[0]} />
      <ReservationFilter
        selectedFilter={selectedFilter}
        filter={filter}
        setFilter={setFilter}
        filterItem={filterItem[1]}
      />
      <ServiceFilter selectedFilter={selectedFilter} filter={filter} setFilter={setFilter} filterItem={filterItem[3]} />
      <TargetFilter selectedFilter={selectedFilter} filter={filter} setFilter={setFilter} filterItem={filterItem[4]} />
    </div>
  );
}
