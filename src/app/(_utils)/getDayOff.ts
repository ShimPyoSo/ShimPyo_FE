export default function getDayOff(dayOffArr: string[], dayValue: string, weekOfMonth: number) {
  return dayOffArr.some((d) => {
    const match = d.match(/^(\w+)\(([*\d]+)\)$/);
    if (!match) return false;

    const [, offDay, weekIndicator] = match;
    if (offDay !== dayValue) return false;

    return weekIndicator === '*' || Number(weekIndicator) === weekOfMonth;
  });
}
