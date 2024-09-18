import ThemedButton from '@components/ThemedButton';
import { CalendarIcon } from './Icon';
import {
  RightTitleBottomDiv,
  RightTitleBottomFilterDiv,
  RightTitleTopDiv,
} from './scrapDetailRightStyledComponent';
import { useNavigate } from 'react-router-dom';
import { TextP_16, TitleDiv, TitleP } from '../scrapStyledComponent';

const RightTitle: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate('/scrap-create');
  };

  return (
    <TitleDiv>
      <RightTitleTopDiv>
        <TitleP>스크랩 관리</TitleP>
        <ThemedButton onClick={handleCreateClick}>스크랩 만들기</ThemedButton>
      </RightTitleTopDiv>
      <TextP_16>뉴스를 스크랩하고 스크랩한 뉴스를 관리할 수 있어요.</TextP_16>
      <RightTitleBottomDiv>
        <TextP_16>전체</TextP_16>
        <RightTitleBottomFilterDiv>
          <CalendarIcon />
          <TextP_16>2024.08.01 ~ 2024.09.01</TextP_16>
        </RightTitleBottomFilterDiv>
      </RightTitleBottomDiv>
    </TitleDiv>
  );
};

export default RightTitle;
