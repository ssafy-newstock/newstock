export const formatChange = (change: string) => {
  // 변경값이 '-'로 시작하지 않으면 '+'를 붙여줍니다.
  return change.startsWith('-') ? change : `+${change}`;
};