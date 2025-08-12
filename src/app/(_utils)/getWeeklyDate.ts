const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
type DayLabel = '오늘' | '내일' | (typeof dayNames)[number];

export default function getWeeklyDate(): { date: string; day: DayLabel }[] {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const dayNum = String(date.getDate()).padStart(2, '0');
    const dateStr = `${month}.${dayNum}`;

    const dayOfWeek = dayNames[date.getDay()];
    const dayLabel: DayLabel = i === 0 ? '오늘' : i === 1 ? '내일' : dayOfWeek;

    return {
      date: dateStr,
      day: dayLabel,
    };
  });
}
