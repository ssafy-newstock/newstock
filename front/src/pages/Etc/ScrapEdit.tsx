import LeftNews from '@components/LeftNews';
import { Center } from '@components/Center';
import { Right } from '@components/Right';
import CenterTitle from '@features/Scrap/edit/CenterTitle';
import CenterContent from '@features/Scrap/edit/CenterContent';
import RightTitle from '@features/Scrap/edit/RightTitle';
// import RightContent from '@features/Scrap/edit/RightContent';
import {
  CenterDiv,
  RightDiv,
  ScrapHr,
} from '@features/Scrap/scrapStyledComponent';

const ScrapEditPage = () => {
  return (
    <>
      <LeftNews />
      <Center>
        <CenterDiv>
          <CenterTitle />
          <ScrapHr />
          <CenterContent />
        </CenterDiv>
      </Center>
      <Right>
        <RightDiv>
          <RightTitle />
          <ScrapHr />
          {/* <RightContent /> */}
        </RightDiv>
      </Right>
    </>
  );
};

export default ScrapEditPage;
