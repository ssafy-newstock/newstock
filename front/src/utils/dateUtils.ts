import dayjs from "dayjs";

export const calculateDates = (days: number) => {
  // const endDate = dayjs().format('YYYY-MM-DD');
  const endDate = dayjs().format('2024-09-19');
  const startDate = dayjs().subtract(days, 'day').format('YYYY-MM-DD');
  // const startDate = dayjs().subtract(days, 'day').format('2024-09-19');
  return { startDate, endDate };
};