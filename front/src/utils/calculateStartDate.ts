export const calculateStartDate = (endDate: string) => {
  const end = new Date(endDate);
  const start = new Date(end);
  start.setMonth(end.getMonth() - 1); // 한달 전으로 설정
  return start.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 반환
}