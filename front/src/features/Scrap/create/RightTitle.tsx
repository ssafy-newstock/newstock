import { TitleP_15 } from '@features/Scrap/scrapStyledComponent';
import { RightTitleTopDiv } from '@features/Scrap/create/scrapCreateRightStyledComponent';
import styled from 'styled-components';

const TitleDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  /* gap: 0.625rem; */
  align-self: stretch;
`;

const RightTitle: React.FC = () => {
  return (
    <TitleDiv>
      <RightTitleTopDiv>
        <TitleP_15>관심 뉴스</TitleP_15>
        {/* <GoIcon /> */}
      </RightTitleTopDiv>
    </TitleDiv>
  );
};

export default RightTitle;
