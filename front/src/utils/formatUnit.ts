export const formatUnit = (value: string | number): string => {
  // string일 경우 숫자로 변환
  const numericValue =
    typeof value === 'string' ? Number(value.replace(/,/g, '')) : value;

  if (numericValue >= 1_000_000_000_000) {
    const trillion = Math.floor(numericValue / 1_000_000_000_000);
    const billion = Math.floor((numericValue % 1_000_000_000_000) / 100_000_000_000);
    return `${trillion}.${billion}조`; // 1조 이상일 때 "조"
  } else if (numericValue >= 100_000_000_000) {
    return `${Math.floor(numericValue / 100_000_000_000)}천억`; // 1천억 이상일 때 "천억"
  } else if (numericValue >= 100_000_000) {
    return `${Math.floor(numericValue / 100_000_000)}억`; // 1억 이상일 때 "억"
  } else if (numericValue >= 10_000_000) {
    return `${Math.floor(numericValue / 10_000_000)}천만`; // 1천만 이상일 때 "천만"
  } else if (numericValue >= 10_000) {
    return `${Math.floor(numericValue / 10_000)}만`; // 1만 이상일 때 "만"
  }
  return numericValue.toString(); // 만 이하일 때는 그대로 출력
};
