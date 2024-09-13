export const formatNumber = (number: string): string => {
  // 쉼표가 포함된 숫자를 포맷팅
  return new Intl.NumberFormat().format(Number(number.replace(/,/g, '')));
};