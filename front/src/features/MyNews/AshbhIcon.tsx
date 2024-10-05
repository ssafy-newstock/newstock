import styled from 'styled-components';
import { useBookmarkStore } from '@store/useBookmarkStore';

const StyledSvgIcon = styled.svg`
  cursor: pointer; /* 클릭 가능한 커서 설정 */

  &:hover {
    opacity: 0.8;
    transform: scale(1.1);
    transition: transform 0.2s ease-in-out;
  }
`;

interface AshbhIconProps {
  id: number;
  title: string;
  onDelete: () => void; // 삭제 후 처리할 함수
}

const AshbhIcon: React.FC<AshbhIconProps> = ({ id, title, onDelete }) => {
  const { removeBookmark, removeStockBookmark } = useBookmarkStore();

  const handleDelete = async (event: React.MouseEvent) => {
    event.stopPropagation();

    try {
      if (title === '시황 뉴스') {
        // 시황 뉴스 삭제
        await removeBookmark(id);
      } else {
        // 종목 뉴스 삭제
        await removeStockBookmark(id);
      }
      onDelete(); // 삭제 후 UI 갱신을 위한 함수 호출
    } catch (error) {
      console.error('삭제 요청 중 오류가 발생했습니다.', error);
    }
  };

  return (
    <StyledSvgIcon
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="21"
      viewBox="0 0 18 21"
      fill="none"
      style={{ cursor: 'pointer' }}
      onClick={(e) => handleDelete(e)}
    >
      <path
        d="M1 5.5H17M7 9.5V15.5M11 9.5V15.5M2 5.5L3 17.5C3 18.0304 3.21071 18.5391 3.58579 18.9142C3.96086 19.2893 4.46957 19.5 5 19.5H13C13.5304 19.5 14.0391 19.2893 14.4142 18.9142C14.7893 18.5391 15 18.0304 15 17.5L16 5.5M6 5.5V2.5C6 2.23478 6.10536 1.98043 6.29289 1.79289C6.48043 1.60536 6.73478 1.5 7 1.5H11C11.2652 1.5 11.5196 1.60536 11.7071 1.79289C11.8946 1.98043 12 2.23478 12 2.5V5.5"
        stroke="#828282"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledSvgIcon>
  );
};

export default AshbhIcon;
