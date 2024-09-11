import React from 'react';
import styled from 'styled-components';
import {
  PositiveIcon,
  PositiveIconText,
  NegativeIcon,
  NegativeIconText,
  NeutralIcon,
  NeutralIconText,
} from '@features/News/PNSubicon';
import newsData from '@api/dummyData/20240907.json';

const SubCenter = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 20px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

const EconomicNewsWrapper = styled.div`
  display: flex;
  padding: 15px 10px;
  margin: 20px 0px;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 33px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const EconomicNewsContainer = styled.div`
  display: flex;
  padding: 10px 10px 20px 10px;
  /* flex-direction: column; */
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  /* flex: 1 0 0; */
  align-self: stretch;
`;

const EconomicNewsBody = styled.div`
  display: flex;
  width: 761px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const EconomicNewsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  width: 100%;
`;

const EconomicNewsTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
`;

const EconomicNewsTitleText = styled.p`
  color: #0448a5;
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const EconomicNewsContent = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  color: #828282;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 150% */
`;

const EconomicNewsPage = () => {
  const top6News = newsData.data.slice(0, 2);

  return (
    <>
      <SubCenter>
        {top6News.map((news, index) => (
          <EconomicNewsWrapper>
            <EconomicNewsContainer>
              <EconomicNewsBody>
                <EconomicNewsHeader>
                  <PositiveIcon>
                    <PositiveIconText>긍정</PositiveIconText>
                  </PositiveIcon>
                  <EconomicNewsTitle>
                    <EconomicNewsTitleText>{news.title}</EconomicNewsTitleText>
                  </EconomicNewsTitle>
                </EconomicNewsHeader>
                <EconomicNewsContent>{news.description}</EconomicNewsContent>
              </EconomicNewsBody>
            </EconomicNewsContainer>
          </EconomicNewsWrapper>
        ))}
      </SubCenter>
    </>
  );
};

export default EconomicNewsPage;
