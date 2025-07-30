import AreaFilter from './AreaFilter';
import { IFilter } from '@/app/(_utils)/type';
import ReservationFilter from './ReservationFilter';
import ServiceFilter from './ServiceFilter';
import TargetFilter from './TargetFilter';
import TimeFilter from './TimeFilter';
import TypeFilter from './TypeFilter';

interface FilterContentProps {
  selectedFilter: string | null;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
}

export default function FilterContent({ selectedFilter, setFilter }: FilterContentProps) {
  return (
    <div className="pb-[40px]">
      <AreaFilter selectedFilter={selectedFilter} filterKey="지역" setFilter={setFilter} />
      <TypeFilter selectedFilter={selectedFilter} filterKey="여행지 유형" setFilter={setFilter} />
      <ReservationFilter selectedFilter={selectedFilter} filterKey="예약" setFilter={setFilter} />
      <TimeFilter selectedFilter={selectedFilter} filterKey="주 운영 시간" setFilter={setFilter} />
      <ServiceFilter selectedFilter={selectedFilter} filterKey="제공 서비스" setFilter={setFilter} />
      <TargetFilter selectedFilter={selectedFilter} filterKey="성별과 연령대" setFilter={setFilter} />
    </div>
  );
}
