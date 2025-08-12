export default function getTmFc() {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hour = now.getHours();

  let baseDate: string;
  let baseTime: string;

  if (hour < 18) {
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    baseDate = `${yesterday.getFullYear()}${(yesterday.getMonth() + 1).toString().padStart(2, '0')}${yesterday
      .getDate()
      .toString()
      .padStart(2, '0')}`;
    baseTime = '1800';
  } else {
    baseDate = `${year}${month}${day}`;
    baseTime = '0600';
  }

  return `${baseDate}${baseTime}`;
}
