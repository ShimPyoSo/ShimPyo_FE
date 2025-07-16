export function getBaseDateAndTime() {
  const now = new Date();
  const base = new Date(now);

  base.setMinutes(0);
  base.setSeconds(0);
  base.setMilliseconds(0);
  base.setHours(base.getHours() - 1);

  const year = base.getFullYear();
  const month = String(base.getMonth() + 1).padStart(2, '0');
  const day = String(base.getDate()).padStart(2, '0');
  const hour = String(base.getHours()).padStart(2, '0');

  return {
    baseDate: `${year}${month}${day}`,
    baseTime: `${hour}00`,
  };
}
