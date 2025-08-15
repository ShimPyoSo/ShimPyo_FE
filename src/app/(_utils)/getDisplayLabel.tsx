import { AGE_GROUPS, FACILITIES, GENDERS, IFilter, REGIONS } from '@/app/(_utils)/type';

function getLabelFromValue<T extends { label: string; value: string }>(list: readonly T[], value: string) {
  return list.find((item) => item.value === value)?.label ?? value;
}

function sortByOrder<T extends { label: string; value: string }>(list: string[], orderList: readonly T[]) {
  return [...list].sort(
    (a, b) => orderList.findIndex((item) => item.value === a) - orderList.findIndex((item) => item.value === b)
  );
}

export function getDisplayLabel(filter: IFilter, label: string, key: keyof IFilter): string {
  switch (key) {
    case 'region': {
      const sortedValues = sortByOrder(filter.region || [], REGIONS);
      const selected = sortedValues.map((v) => getLabelFromValue(REGIONS, v));
      if (selected.length === 1 || selected.length === 2) return selected.join(', ');
      if (selected.length >= 3) return `${selected[0]} 외 ${selected.length - 1}곳`;
      break;
    }

    case 'facilities': {
      const sortedValues = sortByOrder(filter.facilities || [], FACILITIES);
      const selected = sortedValues.map((v) => getLabelFromValue(FACILITIES, v));
      if (selected.length === 1) return selected[0];
      if (selected.length >= 2) return `${selected[0]} 외 ${selected.length - 1}개`;
      break;
    }

    case 'visitTime': {
      return filter.visitTime || label;
    }
    case 'target': {
      const genderValues = sortByOrder(filter.target[0] || [], GENDERS);
      const ageValues = sortByOrder(filter.target[1] || [], AGE_GROUPS);

      const genderList = genderValues.map((v) => getLabelFromValue(GENDERS, v));
      const ageList = ageValues.map((v) => getLabelFromValue(AGE_GROUPS, v));

      if (ageList.length > 0 && genderList.length === 0) {
        if (ageList.length === 1) return ageList[0];
        return `${ageList[0]} 외 ${ageList.length - 1}개`;
      }

      if (genderList.length > 0 && ageList.length === 0) {
        return genderList.join(', ');
      }

      if (ageList.length > 0 && genderList.length > 0) {
        if (ageList.length === 1 && genderList.length === 1) {
          return `${ageList[0]} ${genderList[0]}`;
        }
        return `${ageList[0]} ${genderList[0]} 외 ${ageList.length + genderList.length - 2}개`;
      }

      break;
    }

    default:
      break;
  }
  return label;
}
