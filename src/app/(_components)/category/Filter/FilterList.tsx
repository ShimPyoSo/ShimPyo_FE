interface FilterListProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function FilterList({ setIsOpen, setSelectedFilter }: FilterListProps) {
  const handleClick = (filterType: string) => {
    setIsOpen(true);
    setSelectedFilter(filterType);
  };

  const filterItems = ['지역', '여행지 유형', '예약', '소요 시간'];

  return (
    <ul className="px-[16px] pt-[24px] pb-[20px] flex items-center justify-between">
      {filterItems.map((item) => (
        <li
          key={item}
          className="py-[6px] px-[16px] bg-white border border-w6 rounded-[100px] text-b3 text-sm tracking-[-2%] cursor-pointer"
          onClick={() => handleClick(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
