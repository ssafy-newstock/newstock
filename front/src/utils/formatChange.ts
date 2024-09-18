export const formatChange = (change: string | number): string => {
  // change가 string일 경우 숫자로 변환 후 다시 문자열로 변환
  const stringValue = typeof change === 'number' ? change.toString() : change;
  // 변경값이 '-'로 시작하지 않으면 '+'를 붙여줍니다.
  return stringValue.startsWith('-') ? stringValue : `+${stringValue}`;
};
