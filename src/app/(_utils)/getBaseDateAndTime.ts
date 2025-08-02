export function getBaseDateAndTime() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  // 발표 시간 목록 (base_time)
  const availableHours = [2, 5, 8, 11, 14, 17, 20, 23];

  let baseHour = availableHours
    .slice()
    .reverse()
    .find((h) => hour > h || (hour === h && minute >= 10));

  const baseDateObj = new Date(now);
  if (baseHour === undefined) {
    baseHour = 23;
    baseDateObj.setDate(baseDateObj.getDate() - 1);
  }

  const baseTime = String(baseHour).padStart(2, '0') + '00';
  const year = baseDateObj.getFullYear();
  const month = String(baseDateObj.getMonth() + 1).padStart(2, '0');
  const day = String(baseDateObj.getDate()).padStart(2, '0');

  return {
    baseDate: `${year}${month}${day}`,
    baseTime,
  };
}
