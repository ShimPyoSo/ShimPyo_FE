import { IFilter } from '@/app/(_utils)/type';

interface FilterListProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string | null>>;
  filter: IFilter;
}

export default function FilterList({ setIsOpen, setSelectedFilter, filter }: FilterListProps) {
  const handleClick = (filterType: string) => {
    setIsOpen(true);
    setSelectedFilter(filterType);
  };

  const filterItems: { label: string; key: keyof IFilter }[] = [
    { label: '지역', key: 'region' },
    { label: '여행지 유형', key: 'type' },
    { label: '예약', key: 'reservation' },
    { label: '주 운영 시간', key: 'time' },
    { label: '제공 서비스', key: 'service' },
    { label: '성별과 연령대', key: 'target' },
  ];

  return (
    <ul className="px-[16px] pt-[24px] pb-[20px] flex items-center justify-between flex-wrap gap-2">
      {filterItems.map(({ label, key }) => {
        const isSelected = filter[key] && filter[key]!.length > 0;
        return (
          <li
            key={label}
            className={`py-[6px] px-[16px] rounded-[100px] text-b3 text-sm tracking-[-2%] cursor-pointer border ${
              isSelected ? 'bg-gn1 border-gn1' : 'bg-gn4 border-gn2 text-gn1'
            }`}
            onClick={() => handleClick(label)}
          >
            {label}
          </li>
        );
      })}
    </ul>
  );
}
