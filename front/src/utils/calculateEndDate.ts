// 한달 뒤 날짜를 계산하는 함수
export const calculateEndDate = (startDate: string) => {
  const start = new Date(startDate);
  const end = new Date(start);
  end.setMonth(start.getMonth() + 1); // 한달 뒤로 설정
  return end.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 반환
};
