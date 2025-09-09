import { AGE_GROUPS, GENDERS, IAgeGroup, IFilter } from '@/app/(_utils)/type';

import FilterItems from './FilterItem';

interface TargetFilterProps {
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
  filterItem: { label: string; key: keyof IFilter };
}

export default function TargetList({ filter, setFilter, filterItem }: TargetFilterProps) {
  return (
    <div>
      <p className="mt-[16px] text-g1 text-xs tracking-[-0.02em]">성별</p>
      <ul className="mt-[16px] flex gap-x-[4px] gap-y-[8px] flex-wrap">
        {filterItem.key === 'target' &&
          GENDERS.map((area, idx) => {
            const isSelected = filter.target[0].includes(area.value);
            return (
              <FilterItems
                isSelected={isSelected}
                name={area.label}
                key={idx}
                setFilter={setFilter}
                filterItem={filterItem}
              />
            );
          })}
      </ul>
      <p className="mt-[16px] text-g1 text-xs tracking-[-0.02em]">연령대</p>
      <ul className="mt-[16px] flex flex-col gap-y-[8px]">
        {AGE_GROUPS.reduce((rows, area, idx) => {
          if (idx % 3 === 0) rows.push([]);
          rows[rows.length - 1].push(area);
          return rows;
        }, [] as IAgeGroup[][]).map((row, rowIdx) => (
          <li key={rowIdx} className="flex gap-x-[4px]">
            {row.map((area, idx) => {
              const isSelected = filter.target[1].includes(area.value);
              return (
                <FilterItems
                  isSelected={isSelected}
                  name={area.label}
                  key={idx}
                  setFilter={setFilter}
                  filterItem={filterItem}
                />
              );
            })}
          </li>
        ))}
      </ul>
    </div>
  );
}
