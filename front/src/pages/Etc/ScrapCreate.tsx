import LeftNews from '@components/LeftNews';
import { Center } from '@components/Center';
import { Right } from '@components/Right';
import CenterContent from '@features/Scrap/create/CenterContent';
// import RightContent from '@features/Scrap/create/RightContent';
import RightTitle from '@features/Scrap/create/RightTitle';
import { RightDiv, ScrapHr } from '@features/Scrap/scrapStyledComponent';
import { CenterDiv } from '@features/MyNews/styledComponent';

const ScrapCreatePage = () => {
  return (
    <>
      <LeftNews />
      <Center>
        <CenterDiv>
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

export default ScrapCreatePage;
