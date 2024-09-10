import LeftNews from '@components/LeftNews';
import CenterTitle from '@features/MyNews/CenterTitle';
import CenterContent from '@features/MyNews/CenterContent';
import { CenterDiv, CenterHr } from '@features/MyNews/StyledComponent';

const MyNewsPage = () => {
  return (
    <>
      <LeftNews />
      <CenterDiv>
        <CenterTitle />
        <CenterHr />
        <CenterContent />
      </CenterDiv>
    </>
  );
};

export default MyNewsPage;
