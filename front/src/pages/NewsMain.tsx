import React from 'react';
import styled from 'styled-components';
import { Center } from '@components/Center';
import LeftNews from '@components/LeftNews';
import EconNewsMainHeader from '@features/News/EconNewsMain/EconNewsMainHeader';
import StockNewsMainHeader from '@features/News/StockNewsMain/StockNewsMainHeader';
import EconNewsMainBody from '@features/News/EconNewsMain/EconNewsMainBody';
import StockNewsMainBody from '@features/News/StockNewsMain/StockNewsMainBody';
import newsData from '@api/dummyData/20240907.json';

// 스타일드 컴포넌트 정의

const NewsMainCenter = styled.div`
  display: flex;
  padding: 20px 50px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
  align-self: stretch;
`;

const NewsMainBodyWrapper = styled.div`
  display: flex;
  padding: 19px 4px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  gap: 20px;
`;

const NewsMain: React.FC = () => {
  const top4News = newsData.data.slice(0, 4);

  return (
    <>
      <LeftNews />
      <Center>
        <NewsMainCenter>
          <EconNewsMainHeader />
          <NewsMainBodyWrapper>
            {top4News.map((news, index) => (
              <EconNewsMainBody
                key={index}
                title={news.title} // 29자
                description={news.description} // 70자
                media={news.media}
                date={news.uploadDatetime}
                header="벤처/스타트업"
              />
            ))}
          </NewsMainBodyWrapper>
          <StockNewsMainHeader />
          <NewsMainBodyWrapper>
            {top4News.map((news, index) => (
              <StockNewsMainBody
                key={index}
                title={news.title} // 29자
                description={news.description} // 70자
                media={news.media}
                date={news.uploadDatetime}
                header="삼성전자"
              />
            ))}
          </NewsMainBodyWrapper>
        </NewsMainCenter>
      </Center>
    </>
  );
};

export default NewsMain;
