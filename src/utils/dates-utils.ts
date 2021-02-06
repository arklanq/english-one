const ONE_DAY_DIFF = 24 * 60 * 60 * 1000;

export function getDayInYear(date: Date | string): number {
  const nowDate = date instanceof Date ? date : new Date(date);

  if (isNaN(nowDate.getTime())) throw new Error('Got invalid date string/object in `getDayInYear` function call.');

  const nowMillis = nowDate.getTime();
  const startDate = new Date(nowDate.getFullYear(), 0, 0);
  const startMillis = startDate.getTime();
  const diff = nowMillis - startMillis + (startDate.getTimezoneOffset() - nowDate.getTimezoneOffset()) * 60 * 1000;
  return Math.floor(diff / ONE_DAY_DIFF);
}

export function doesCalendarDayDiffer(dateA: Date, dateB: Date): boolean {
  return dateA.getFullYear() !== dateB.getFullYear() || getDayInYear(dateA) !== getDayInYear(dateB);
}
