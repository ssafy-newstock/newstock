import React from 'react';
import styled from 'styled-components';
import { Center } from '@components/Center';
import { Right } from '@components/Right';
import LeftNews from '@components/LeftNews';
import { Outlet, useLocation, Link } from 'react-router-dom';

const SubNewsMainCenter = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

const SubNewsHeaderWrapper = styled.div`
  display: flex;
  padding: 25px 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const SubNewsHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const SubNewsHeaderText = styled.div`
  color: ${({ theme }) => theme.highlightColor};
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 93.75% */
`;

const SubNewsBorderWrapper = styled.div`
  display: flex;
  padding: 10px 0px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

const SubNewsBoarder = styled.div`
  width: 100%;
  height: 3px;
  background: ${({ theme }) => theme.highlightColor};
`;

const CategoryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const Category = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* gap: 20px; */
  width: 100%;
`;

const BaseCategoryText = styled.div`
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 187.5% */
`;
const AllCategoryText = styled(BaseCategoryText)`
  color: #000;
  font-weight: 600;
`;

const CategoryText = styled(Link)`
  color: #828282;
  ${BaseCategoryText}
`;

const SubNewsMainRight = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
  background: #bbb;
`;

const categories = [
  { label: '전체 기사', path: '/newsMain' },
  { label: '금융', path: '/newsMain/finance' },
  { label: '산업', path: '/newsMain/industry' },
  { label: '취업/고용', path: '/newsMain/employment' },
  { label: '자동차', path: '/newsMain/automobile' },
  { label: '주식', path: '/newsMain/stock' },
  { label: '부동산', path: '/newsMain/realEstate' },
  { label: '소비자', path: '/newsMain/consumer' },
  { label: '국제경제', path: '/newsMain/internationalEconomy' },
  { label: '가상자산', path: '/newsMain/virtualAssets' },
  { label: '연금/노후', path: '/newsMain/pension' },
  { label: '경제정책', path: '/newsMain/economicPolicy' },
  { label: '벤처/스타트업', path: '/newsMain/startups' },
];

const SubNewsMainPage = () => {
  const location = useLocation();

  const isEconomicNews = location.pathname.includes('economicNews');

  return (
    <>
      <LeftNews />

      <Center>
        <SubNewsMainCenter>
          <SubNewsHeaderWrapper>
            <SubNewsHeader>
              <SubNewsHeaderText>
                {isEconomicNews ? '시황 뉴스' : '종목 뉴스'}
              </SubNewsHeaderText>
            </SubNewsHeader>
            <SubNewsBorderWrapper>
              <SubNewsBoarder />
            </SubNewsBorderWrapper>
            <CategoryWrapper>
              <Category>
                {categories.map((category, index) =>
                  category.label === '전체 기사' ? (
                    <AllCategoryText key={index}>
                      {category.label}
                    </AllCategoryText>
                  ) : (
                    <CategoryText key={index} to={category.path}>
                      {category.label}
                    </CategoryText>
                  )
                )}
              </Category>
            </CategoryWrapper>
          </SubNewsHeaderWrapper>
        </SubNewsMainCenter>
        <Outlet />
      </Center>

      <Right>
        <SubNewsMainRight></SubNewsMainRight>
      </Right>
    </>
  );
};

export default SubNewsMainPage;
