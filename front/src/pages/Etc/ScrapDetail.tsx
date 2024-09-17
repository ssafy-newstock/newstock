import { Center } from '@components/Center';
import LeftNews from '@components/LeftNews';
import { Right } from '@components/Right';
import RightTitle from '@features/ScrapDetail/RightTitle';

const ScrapDetailPage = () => {
  return (
    <>
      <LeftNews />
      <Center></Center>
      <Right>
        <RightTitle />
      </Right>
    </>
  );
};

export default ScrapDetailPage;
