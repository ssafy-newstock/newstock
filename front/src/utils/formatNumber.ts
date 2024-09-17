export const formatNumber = (value: string | number): string => {
  // 숫자를 포맷팅할 때 쉼표 제거 및 number로 변환 후 포맷팅
  const numericValue = typeof value === 'string' ? Number(value.replace(/,/g, '')) : value;
  return new Intl.NumberFormat().format(numericValue);
};