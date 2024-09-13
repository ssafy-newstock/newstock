export const formatUnit = (value: string | number): string => {
  const numericValue = typeof value === 'string' ? parseInt(value, 10) : value;

  if (numericValue >= 100000000) {
    return `${Math.floor(numericValue / 100000000)}억`; // 1억 이상일 때 "억"
  } else if (numericValue >= 10000000) {
    return `${Math.floor(numericValue / 10000000)}천만`; // 1천만 이상일 때 "천만"
  } else if (numericValue >= 10000) {
    return `${Math.floor(numericValue / 10000)}만`; // 1만 이상일 때 "만"
  }
  return numericValue.toString(); // 만 이하일 때는 그대로 출력
};
