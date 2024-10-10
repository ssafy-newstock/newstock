import dayjs from 'dayjs';

export const calculateDates = (days: number) => {
  const endDate = dayjs().format('YYYY-MM-DD');
  const startDate = dayjs().subtract(days, 'day').format('YYYY-MM-DD');
  return { startDate, endDate };
};
