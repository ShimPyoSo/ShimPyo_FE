import AreaFilter from './AreaFilter';
import { IFilter } from '@/app/(_utils)/type';
import ServiceFilter from './ServiceFilter';
import TargetFilter from './TargetFilter';
import TimeFilter from './TimeFilter';

interface FilterContentProps {
  selectedFilter: string | null;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string | null>>;
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
  filterItem: { label: string; key: keyof IFilter }[];
}

export default function FilterContent({
  selectedFilter,
  setSelectedFilter,
  filter,
  setFilter,
  filterItem,
}: FilterContentProps) {
  return (
    <div className="pb-[40px]">
      <AreaFilter
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        filter={filter}
        setFilter={setFilter}
        filterItem={filterItem[0]}
      />
      <TimeFilter
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        filter={filter}
        setFilter={setFilter}
        filterItem={filterItem[1]}
      />
      <ServiceFilter
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        filter={filter}
        setFilter={setFilter}
        filterItem={filterItem[2]}
      />
      <TargetFilter
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        filter={filter}
        setFilter={setFilter}
        filterItem={filterItem[3]}
      />
    </div>
  );
}
