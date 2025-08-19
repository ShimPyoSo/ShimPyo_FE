import { IFilter } from '@/app/(_utils)/type';
import { getDisplayLabel } from '@/app/(_utils)/getDisplayLabel';

interface FilterListProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string | null>>;
  filter: IFilter;
  filterItem: { label: string; key: keyof IFilter }[];
}

export default function FilterList({ setIsOpen, setSelectedFilter, filter, filterItem }: FilterListProps) {
  const handleClick = (filterType: string) => {
    setIsOpen(true);
    setSelectedFilter(filterType);
  };

  const isFilterSelected = (key: keyof IFilter) => {
    switch (key) {
      case 'region':
      case 'facilities':
        return filter[key]?.length > 0;
      case 'target':
        return filter.target[0]?.length > 0 || filter.target[1]?.length > 0;
      case 'visitTime':
        return filter.visitTime !== '';
      default:
        return false;
    }
  };

  return (
    <ul
      className="
      px-[16px] pt-[24px] pb-[20px] flex flex-nowrap gap-2 
      overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing
    "
    >
      {filterItem.map(({ label, key }) => {
        const selected = isFilterSelected(key);
        const displayLabel = selected ? getDisplayLabel(filter, label, key) : label;
        return (
          <li
            key={label}
            className={`flex-shrink-0 py-[6px] px-[16px] rounded-[100px] text-sm tracking-[-2%] cursor-pointer border
              ${selected ? 'bg-gn4 border-gn2 text-gn1 font-semibold' : 'bg-[#FBFBFB] border-w6 text-b3'}`}
            onClick={() => handleClick(label)}
          >
            {displayLabel}
          </li>
        );
      })}
    </ul>
  );
}
