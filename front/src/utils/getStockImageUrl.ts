export const getStockImageUrl = (stockCode: string) => {
  // 이미지 URL 생성
  return `https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stockCode}.png`;
};
