export function getBaseDateAndTime() {
  const now = new Date();
  let hour = now.getHours();
  hour = hour - (hour % 3);

  const baseTime = String(hour).padStart(2, '0') + '00';
  const baseDateObj = new Date(now);
  if (now.getHours() < 3) {
    // 0~2시 사이면, 발표 기준은 전날 23시
    baseDateObj.setDate(baseDateObj.getDate() - 1);
  }

  const year = baseDateObj.getFullYear();
  const month = String(baseDateObj.getMonth() + 1).padStart(2, '0');
  const day = String(baseDateObj.getDate()).padStart(2, '0');

  return {
    baseDate: `${year}${month}${day}`,
    baseTime: baseTime,
  };
}
