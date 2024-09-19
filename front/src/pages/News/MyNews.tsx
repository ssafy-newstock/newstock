import LeftNews from '@components/LeftNews';
import CenterTitle from '@features/MyNews/CenterTitle';
import CenterContent from '@features/MyNews/CenterContent';
import { CenterDiv, CenterHr } from '@features/MyNews/styledComponent';
import { Center } from '@components/Center';
import { RightVacant } from '@components/RightVacant';

const MyNewsPage = () => {
  return (
    <>
      <LeftNews />
      <Center>
        <CenterDiv>
          <CenterTitle />
          <CenterHr />
          <CenterContent />
        </CenterDiv>
      </Center>
      <RightVacant />
    </>
  );
};

export default MyNewsPage;
