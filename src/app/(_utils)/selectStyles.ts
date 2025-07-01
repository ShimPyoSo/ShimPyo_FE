import { StylesConfig } from 'react-select';

interface DomainOption {
  value: string;
  label: string;
  isLast?: boolean;
}

const reactSelectStyles: StylesConfig<DomainOption, false> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: '#fafafa',
    borderRadius: '0.5rem',
    borderColor: '#f0f0f0',
    padding: '10px 6px',
    boxShadow: 'none',
    minHeight: '48px',
    width: '158px',
    fontSize: '1rem',
    fontWeight: 400,
    color: '#000000',
    outline: state.isFocused ? '1px solid #80a281' : 'none',
    '&:hover': {
      borderColor: '#f0f0f0',
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '0.5rem',
    border: '1px solid #f0f0f0',
    marginTop: '8px',
    boxShadow: '0px 6px 20px 0px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#DFF5DF' : state.isFocused ? '#F0F0F0' : '#fff',
    color: '#242424',
    fontSize: '16px',
    fontWeight: 400,
    padding: '8px 16px',
    borderBottom: '1px solid #F0F0F0',
    cursor: 'pointer',
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
  singleValue: (base) => ({
    ...base,
    color: '#242424',
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: '0px',
    marginRight: '4px',
    justifyContent: 'flex-end',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
};

export default reactSelectStyles;
export type { DomainOption };
