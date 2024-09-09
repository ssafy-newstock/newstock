import React from 'react';
import styled from 'styled-components';
import { Center } from '@components/Center';
import NewsMainHeader from '@features/NewsMainHeader';
import NewsMainBody from '@features/NewsMainBody';

// 스타일드 컴포넌트 정의
const NewsMainWrapper = styled.div`
  display: flex;
  padding: 20px 50px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
  align-self: stretch;
  background: #f6f8ff;
`;

const NewsMain: React.FC = () => {
  return (
    <Center>
      <NewsMainWrapper>
        <NewsMainHeader />
        <NewsMainBody />
      </NewsMainWrapper>
    </Center>
  );
};

export default NewsMain;
