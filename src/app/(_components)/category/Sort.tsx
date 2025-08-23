import Select, { SingleValue, StylesConfig } from 'react-select';

import Image from 'next/image';
import { SORT_BY } from '@/app/(_utils)/type';
import sort from '/public/images/icons/sort.svg';

interface SortProps {
  selectedOption: (typeof SORT_BY)[number];
  setSelectedOption: React.Dispatch<React.SetStateAction<(typeof SORT_BY)[number]>>;
}

export default function Sort({ selectedOption, setSelectedOption }: SortProps) {
  const handleChange = (option: SingleValue<(typeof SORT_BY)[number]>) => {
    if (option) setSelectedOption(option);
  };

  const customStyles: StylesConfig<(typeof SORT_BY)[number], false> = {
    control: (base) => ({
      ...base,
      backgroundColor: 'transparent',
      border: 'none',
      boxShadow: 'none',
      minHeight: 'auto',
      cursor: 'pointer',
      fontSize: '12px',
      color: '#5a5a62',
      letterSpacing: '-0.02em',
      fontWeight: '600',
    }),
    valueContainer: (base) => ({
      ...base,
      padding: 0,
    }),
    singleValue: (base) => ({
      ...base,
      fontSize: '12px',
      color: '#5a5a62',
      letterSpacing: '-0.02em',
    }),
    indicatorsContainer: (base) => ({
      ...base,
      padding: 0,
      marginLeft: 0,
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: '#ffffff',
      border: '1px solid #eff0f2',
      borderRadius: '6px',
      boxShadow: '0px 3px 8px 0px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
    }),
    option: (base, state) => {
      type Option = (typeof SORT_BY)[number];

      const options = state.options as readonly Option[];
      const lastKey = options[options.length - 1]?.key;
      const isLast = state.data.key === lastKey;

      return {
        ...base,
        fontSize: '12px',
        color: '#3c3c3c',
        letterSpacing: '-0.02em',
        backgroundColor: state.isFocused ? '#f5f5f5' : '#ffffff',
        cursor: 'pointer',
        padding: '3.5px 2.5px',
        textAlign: 'center',
        borderBottom: isLast ? 'none' : '1px solid #eff0f2',
      };
    },
  };

  return (
    <div className="flex justify-end">
      <div className="relative">
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={SORT_BY}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.key}
          styles={customStyles}
          components={{
            DropdownIndicator: () => <Image src={sort} alt="더보기" width={15} height={15} />,
            IndicatorSeparator: () => null,
          }}
          isSearchable={false}
        />
      </div>
    </div>
  );
}
