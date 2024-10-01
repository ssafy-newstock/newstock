import { Center } from '@components/Center';
import Left from '@components/Left';
import styled from 'styled-components';

const CenterDiv = styled.div`
  padding: 1rem;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
`;

const ScrapEditPage = () => {
  return (
    <>
      <Left />
      <Center>
        <CenterDiv></CenterDiv>
      </Center>
    </>
  );
};

export default ScrapEditPage;
