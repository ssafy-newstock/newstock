import { useNavigate } from 'react-router-dom';
import { TextP_16, TextP_20_bold, TitleDiv } from '../scrapStyledComponent';
import { CalendarIcon, GoIcon } from '../create/Icon';
import {
  RightTitleBottomDiv,
  RightTitleBottomFilterDiv,
  RightTitleTopDiv,
} from '../create/scrapCreateRightStyledComponent';

const RightTitle: React.FC = () => {
  const navigate = useNavigate();

  const handleGoIconClick = () => {
    navigate('/my-news');
  };

  return (
    <TitleDiv>
      <RightTitleTopDiv
        onClick={handleGoIconClick}
        style={{ cursor: 'pointer' }}
      >
        <TextP_20_bold>저장한 뉴스</TextP_20_bold>
        <GoIcon />
      </RightTitleTopDiv>
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
