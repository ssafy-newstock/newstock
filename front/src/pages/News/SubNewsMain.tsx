import styled from 'styled-components';
import { Center } from '@components/Center';
import { Right } from '@components/Right';
import LeftNews from '@components/LeftNews';
import { Outlet, useLocation, Link } from 'react-router-dom';
import BookmarkedNews from '@features/News/BookmarkedNews';

const SubNewsMainCenter = styled.div`
  display: flex;
  padding: 1.25rem 1.5rem;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  /* max-width: 106rem; */
  max-width: 50rem;
  /* min-width: 1024px; */
  /* width: 64rem; */
  width: 50rem;
`;

const SubNewsHeaderWrapper = styled.div`
  display: flex;
  padding: 1.6rem 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.6rem;
  align-self: stretch;
`;

const SubNewsHeaderText = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-family: Inter;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.9rem;
`;

const SubNewsBoarder = styled.div`
  display: flex;
  margin: 0.625rem 0 0.19rem 0;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  height: 0.19rem;
  background-color: ${({ theme }) => theme.textColor};
`;

const CategoryWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  gap: 1.25rem;
  flex-wrap: nowrap;
  white-space: nowrap;
  overflow: hidden; /* 넘친 카테고리들을 가리도록 설정 */
`;

const AllCategoryText = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  line-height: 1.9rem;
  font-weight: 600;
`;

const CategoryText = styled(Link)`
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.9rem; /* 187.5% */
  color: #828282;
  text-decoration: none;

  &:hover {
    color: #000;
    font-weight: 600;
  }
`;

const SubNewsMainRight = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  align-self: stretch;
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

  const isEconomicNews = location.pathname.includes('economic-news');
  // const isEconomicNews = location.pathname.includes(`stock-news`);

  return (
    <>
      <LeftNews />

      <Center>
        <SubNewsMainCenter>
          <SubNewsHeaderWrapper>
            <SubNewsHeaderText>
              {isEconomicNews ? '시황 뉴스' : '종목 뉴스'}
            </SubNewsHeaderText>

            <SubNewsBoarder />
            {isEconomicNews ? (
              <CategoryWrapper>
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
              </CategoryWrapper>
            ) : null}
          </SubNewsHeaderWrapper>
        </SubNewsMainCenter>
        <Outlet />
      </Center>

      <Right>
        <SubNewsMainRight>
          <BookmarkedNews />
        </SubNewsMainRight>
      </Right>
    </>
  );
};

export default SubNewsMainPage;
