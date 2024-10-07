import { useNavigate } from 'react-router-dom';
import { CenterTitleBottomDiv } from '@features/Scrap/detail/scrapDetailCenterStyledComponent';
import ThemedButton from '@components/ThemedButton';
import {
  TitleDiv,
  TextP_16,
  TitleP,
} from '@features/Scrap/scrapStyledComponent';
import useAuthStore from '@store/useAuthStore';
import { useScrapStore } from '@store/useScrapStore';

interface ScrapData {
  id: number;
  article?: string;
  description?: string;
  industry?: string;
  media?: string;
  sentiment?: string;
  subtitle?: string | null;
  thumbnail?: string;
  title: string;
  uploadDatetime?: string;
  newsType?: string;
  content?: string;
  stockNewsStockCodes?: string[]; // 종목 뉴스만 해당되는 부분
  stockKeywords?: string[]; // 종목 뉴스만 해당되는 부분
  newsId?: number;
}

interface CenterTitleProps {
  selectedCard: ScrapData;
  selectedNewsCard: ScrapData;
}

const CenterTitle: React.FC<CenterTitleProps> = ({
  selectedCard,
  selectedNewsCard,
}) => {
  const { memberName } = useAuthStore();
  const navigate = useNavigate();
  const deleteScrap = useScrapStore((state) => state.deleteScrap); // 스크랩 삭제 함수
  const deleteStockScrap = useScrapStore((state) => state.deleteStockScrap); // 종목 스크랩 삭제 함수

  const handleEditClick = () => {
    navigate(`/scrap-edit/${selectedCard.id}`);
  };

  const handleDeleteClick = async () => {
    try {
      if (selectedNewsCard.industry) {
        // 산업 뉴스일 경우
        await deleteScrap(selectedCard.id);
        alert('시황 뉴스 스크랩이 삭제되었습니다.');
      } else {
        // 종목 뉴스일 경우
        await deleteStockScrap(selectedCard.id);
        alert('종목 뉴스 스크랩이 삭제되었습니다.');
      }
      // 페이지 새로 고침
      window.location.reload(); // 페이지 새로 고침
    } catch (error) {
      console.error('스크랩 삭제 중 오류 발생:', error);
      alert('스크랩 삭제에 실패했습니다.');
    }
  };

  return (
    <TitleDiv>
      <TitleP>{selectedCard.title}</TitleP>
      <CenterTitleBottomDiv>
        <TextP_16>
          {memberName} | {selectedNewsCard.uploadDatetime}
        </TextP_16>
        <div>
          <ThemedButton onClick={handleEditClick}>수정</ThemedButton>
          <ThemedButton onClick={handleDeleteClick}>삭제</ThemedButton>
        </div>
      </CenterTitleBottomDiv>
    </TitleDiv>
  );
};

export default CenterTitle;
