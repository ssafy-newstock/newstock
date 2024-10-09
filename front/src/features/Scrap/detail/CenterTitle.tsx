import { useNavigate } from 'react-router-dom';
import { CenterTitleBottomDiv } from '@features/Scrap/detail/scrapDetailCenterStyledComponent';
import ThemedButton from '@components/ThemedButton';
import { TitleDiv, TitleP } from '@features/Scrap/scrapStyledComponent';
import useAuthStore from '@store/useAuthStore';
import { useScrapStore } from '@store/useScrapStore';
import { ScrapData, NewsData } from '@features/News/ScrapNewsInterface';
import styled from 'styled-components';
import { FontStyle, CardContextDiv } from '@features/MyNews/styledComponent';

interface CenterTitleProps {
  selectedCard: ScrapData;
  selectedNewsCard: NewsData;
}

const CustomFontStyle = styled(FontStyle)`
  color: #828282;
  font-size: 1rem;
  white-space: nowrap; /* 한 줄로 표시 */
  overflow: hidden; /* 넘치는 부분을 숨김 */
  text-overflow: ellipsis; /* 넘치는 부분을 ...으로 처리 */
`;

const BookmarkedNewsMiddleLine = styled.div`
  width: 0.09rem;
  height: 1.25rem;
  background: #e0e0e0;
`;

const CenterTitle: React.FC<CenterTitleProps> = ({
  selectedCard,
  selectedNewsCard,
}) => {
  const { memberName } = useAuthStore();
  const navigate = useNavigate();
  const deleteScrap = useScrapStore((state) => state.deleteScrap); // 스크랩 삭제 함수
  const deleteStockScrap = useScrapStore((state) => state.deleteStockScrap); // 종목 스크랩 삭제 함수

  const handleEditClick = () => {
    navigate(`/scrap-edit/${selectedCard.id}`, {
      state: {
        selectedCard,
        selectedNewsCard,
      },
    });
  };

  const handleDeleteClick = async () => {
    try {
      if (selectedNewsCard.industry) {
        // 산업 뉴스일 경우
        await deleteScrap(selectedCard.id);
        // alert('시황 뉴스 스크랩이 삭제되었습니다.');
      } else {
        // 종목 뉴스일 경우
        await deleteStockScrap(selectedCard.id);
        // alert('종목 뉴스 스크랩이 삭제되었습니다.');
      }
      // 페이지 새로 고침
      window.location.reload(); // 페이지 새로 고침
    } catch (error) {
      console.error('스크랩 삭제 중 오류 발생:', error);
      // alert('스크랩 삭제에 실패했습니다.');
    }
  };

  const displayDate = selectedCard.createdAt
    ? selectedCard.createdAt.split('T')[0].replace(/-/g, '.')
    : selectedNewsCard.uploadDatetime!.split('T')[0].replace(/-/g, '.');

  return (
    <TitleDiv>
      <TitleP>{selectedCard.title}</TitleP>
      <CenterTitleBottomDiv>
        <CardContextDiv>
          <CustomFontStyle>{memberName}</CustomFontStyle>
          <BookmarkedNewsMiddleLine />
          <CustomFontStyle>{displayDate}</CustomFontStyle>
        </CardContextDiv>
        <div>
          <ThemedButton onClick={handleEditClick}>수정</ThemedButton>
          <ThemedButton onClick={handleDeleteClick}>삭제</ThemedButton>
        </div>
      </CenterTitleBottomDiv>
    </TitleDiv>
  );
};

export default CenterTitle;
