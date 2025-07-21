import AreaFilter from './AreaFilter';
import ReservationFilter from './ReservationFilter';
import TimeFilter from './TimeFilter';
import TypeFilter from './TypeFilter';

interface FilterContentProps {
  selectedFilter: string | null;
}

export default function FilterContent({ selectedFilter }: FilterContentProps) {
  return (
    <div className="pb-[40px]">
      <AreaFilter selectedFilter={selectedFilter} filterKey="지역" />
      <TypeFilter selectedFilter={selectedFilter} filterKey="여행지 유형" />
      <ReservationFilter selectedFilter={selectedFilter} filterKey="예약" />

      <TimeFilter selectedFilter={selectedFilter} filterKey="소요 시간" />
    </div>
  );
}
