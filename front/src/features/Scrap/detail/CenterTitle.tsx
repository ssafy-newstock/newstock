import { useNavigate } from 'react-router-dom';
import { CenterTitleBottomDiv } from '@features/Scrap/detail/scrapDetailCenterStyledComponent';
import ThemedButton from '@components/ThemedButton';
import {
  TitleDiv,
  TextP_16,
  TitleP,
} from '@features/Scrap/scrapStyledComponent';
import useAuthStore from '@store/useAuthStore';

interface CenterTitleProps {
  selectedCard: {
    Title: string;
    Date: string;
  };
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
      <TitleP>{selectedCard.Title}</TitleP>
      <CenterTitleBottomDiv>
        <TextP_16>
          {memberName} | {selectedCard.Date}
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
