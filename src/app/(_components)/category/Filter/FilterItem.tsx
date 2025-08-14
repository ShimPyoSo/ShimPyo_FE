import {
  AGE_GROUPS,
  FACILITIES,
  GENDERS,
  IAgeGroupValue,
  IFacilityValue,
  IGenderValue,
  IRegionValue,
  IReservationValue,
  REGIONS,
  RESERVATION_STATUS,
} from '@/app/(_utils)/type';

import { IFilter } from '@/app/(_utils)/type';

interface FilterItemsProps {
  isSelected: boolean;
  name: string;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
  filterItem: { label: string; key: keyof IFilter };
}

export default function FilterItems({ isSelected, name, setFilter, filterItem }: FilterItemsProps) {
  const handleFilterChoice = () => {
    setFilter((prev) => {
      const key = filterItem.key;

      let value: IRegionValue | IReservationValue | IFacilityValue | IGenderValue | IAgeGroupValue | string | undefined;

      switch (key) {
        case 'region':
          value = REGIONS.find((r) => r.label === name)?.value;
          break;
        case 'reservation':
          value = RESERVATION_STATUS.find((r) => r.label === name)?.value;
          break;
        case 'facilities':
          value = FACILITIES.find((f) => f.label === name)?.value;
          break;
        case 'target':
          if (AGE_GROUPS.some((a) => a.label === name)) {
            value = AGE_GROUPS.find((a) => a.label === name)?.value as IAgeGroupValue;
          } else {
            value = GENDERS.find((g) => g.label === name)?.value as IGenderValue;
          }
          break;
        case 'visitTime':
          value = name;
          break;
      }

      if (!value) return prev as IFilter;

      // target 처리
      if (key === 'target') {
        const [genderArr, ageArr] = prev.target;

        if (GENDERS.some((g) => g.label === name)) {
          const newGenderArr = genderArr.includes(value as IGenderValue)
            ? genderArr.filter((v) => v !== (value as IGenderValue))
            : [...genderArr, value as IGenderValue];

          return { ...prev, target: [newGenderArr, ageArr] };
        } else {
          const newAgeArr = ageArr.includes(value as IAgeGroupValue)
            ? ageArr.filter((v) => v !== (value as IAgeGroupValue))
            : [...ageArr, value as IAgeGroupValue];

          return { ...prev, target: [genderArr, newAgeArr] };
        }
      }

      if (key === 'visitTime') {
        return { ...prev, visitTime: prev.visitTime === (value as string) ? '' : (value as string) };
      }

      if (key === 'region') {
        const current = prev.region;
        const newArray = current.includes(value as IRegionValue)
          ? current.filter((v) => v !== (value as IRegionValue))
          : [...current, value as IRegionValue];
        return { ...prev, region: newArray };
      }

      if (key === 'reservation') {
        const current = prev.reservation;
        const newArray = current.includes(value as IReservationValue)
          ? current.filter((v) => v !== (value as IReservationValue))
          : [...current, value as IReservationValue];
        return { ...prev, reservation: newArray };
      }

      if (key === 'facilities') {
        const current = prev.facilities;
        const newArray = current.includes(value as IFacilityValue)
          ? current.filter((v) => v !== (value as IFacilityValue))
          : [...current, value as IFacilityValue];
        return { ...prev, facilities: newArray };
      }

      return prev;
    });
  };

  return (
    <li
      className={`rounded-[100px] border py-[5px] px-[16px] text-sm tracking-[-2%] ${
        isSelected ? 'border-gn2 bg-gn4 text-gn1 font-semibold' : 'border-w6 bg-white text-b3'
      }`}
      onClick={() => handleFilterChoice()}
    >
      {name}
    </li>
  );
}
