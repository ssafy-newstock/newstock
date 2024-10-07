import { useNavigate } from 'react-router-dom';
import { CenterTitleBottomDiv } from '@features/Scrap/detail/scrapDetailCenterStyledComponent';
import ThemedButton from '@components/ThemedButton';
import {
  TitleDiv,
  TextP_16,
  TitleP,
} from '@features/Scrap/scrapStyledComponent';
import useAuthStore from '@store/useAuthStore';

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
  selectedCard: ScrapData
}

const CenterTitle: React.FC<CenterTitleProps> = ({ selectedCard }) => {
  const { memberName } = useAuthStore();
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/scrap-edit');
  };

  const handleDeleteClick = () => {
    console.log('삭제 버튼 클릭');
  };

  return (
    <TitleDiv>
      <TitleP>{selectedCard.title}</TitleP>
      <CenterTitleBottomDiv>
        <TextP_16>
          {memberName} | {selectedCard.uploadDatetime}
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
