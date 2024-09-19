export const formatUnit = (value: string | number): string => {
  // string일 경우 숫자로 변환
  const numericValue =
    typeof value === 'string' ? Number(value.replace(/,/g, '')) : value;

  if (numericValue >= 1000000000000) {
    const trillion = Math.floor(numericValue / 1000000000000);
    const billion = Math.floor((numericValue % 1000000000000) / 1000000000);
    return `${trillion}.${billion}조`; // 1조 이상일 때 "조"
  } else if (numericValue >= 100000000000) {
  //   return `${Math.floor(numericValue / 100000000000)}천억`; // 1천억 이상일 때 "천억"
  // } else if (numericValue >= 100000000) {
    return `${Math.floor(numericValue / 100000000)}억`; // 1억 이상일 때 "억"
  // } else if (numericValue >= 10000000) {
  //   return `${Math.floor(numericValue / 10000000)}천만`; // 1천만 이상일 때 "천만"
  } else if (numericValue >= 10000) {
    return `${Math.floor(numericValue / 10000)}만`; // 1만 이상일 때 "만"
  }
  return numericValue.toString(); // 만 이하일 때는 그대로 출력
};
