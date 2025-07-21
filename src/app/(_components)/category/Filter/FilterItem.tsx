'use client';

interface FilterItemsProps {
  isSelected: boolean;
  index: number;
  name: string;
  setSelectedIndices: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function FilterItems({ isSelected, index, name, setSelectedIndices }: FilterItemsProps) {
  const handleFilterChoice = (index: number) => {
    setSelectedIndices((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  return (
    <li
      className={`rounded-[100px] border py-[5px] px-[16px] text-sm tracking-[-2%] ${
        isSelected ? 'border-gn2 bg-gn4 text-gn1 font-semibold' : 'border-w6 bg-white text-b3'
      }`}
      key={index}
      onClick={() => handleFilterChoice(index)}
    >
      {name}
    </li>
  );
}
