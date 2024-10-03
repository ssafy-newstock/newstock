import dayjs from "dayjs";

export const calculateDates = (days: number) => {
  const endDate = dayjs('2024-10-01').format('YYYY-MM-DD');
  const startDate = dayjs(endDate).subtract(days, 'day').format('YYYY-MM-DD');
  // const endDate = dayjs().format('YYYY-MM-DD');
  // const startDate = dayjs().subtract(days, 'day').format('YYYY-MM-DD');
  return { startDate, endDate };
};