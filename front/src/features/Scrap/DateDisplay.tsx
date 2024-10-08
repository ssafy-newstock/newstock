const DateDisplay: React.FC = () => {
  const currentDate = new Date(); // 현재 날짜 가져오기
  const formattedDate = currentDate
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\./g, '.'); // 포맷팅

  return <span>{formattedDate}</span>; // 날짜 반환
};

export default DateDisplay;
