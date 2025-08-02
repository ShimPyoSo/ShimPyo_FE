import FilterItems from './FilterItem';
import { target } from '@/app/(_utils)/constants';

interface TargetFilterProps {
  selectedIndices: number[];
  setSelectedIndices: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function TargetList({ selectedIndices, setSelectedIndices }: TargetFilterProps) {
  return (
    <div>
      <p className="mt-[16px] text-g1 text-xs tracking-[-2%]">성별</p>
      <ul className="mt-[6px] flex gap-x-[4px] gap-y-[8px] flex-wrap">
        {['여성', '남성'].map((area, index) => {
          const isSelected = selectedIndices.includes(index);
          return (
            <FilterItems
              isSelected={isSelected}
              index={index}
              name={area}
              key={index}
              setSelectedIndices={setSelectedIndices}
            />
          );
        })}
      </ul>
      <p className="mt-[16px] text-g1 text-xs tracking-[-2%]">연령대</p>
      <ul className="mt-[6px] flex gap-x-[4px] gap-y-[8px] flex-wrap">
        {target.map((area, index) => {
          const isSelected = selectedIndices.includes(index);
          return (
            <FilterItems
              isSelected={isSelected}
              index={index}
              name={area}
              key={index}
              setSelectedIndices={setSelectedIndices}
            />
          );
        })}
      </ul>
    </div>
  );
}
