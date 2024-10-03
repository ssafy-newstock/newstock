import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import { Center } from '@components/Center';
import { Outlet } from 'react-router-dom';

const SubNewsMainCenter = styled.div`
  display: flex;
  padding: 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  max-width: 100rem;
  min-width: 90rem;

  width: 100%;
`;
const SubNewsHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
  align-self: stretch;
`;

const SubNewsHeaderText = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.9rem;
`;
const SubNewsBoarder = styled.hr`
  display: flex;
  margin: 0.625rem 0 0 0;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  width: 90%;
  height: 0.1rem;
  background-color: ${({ theme }) => theme.textColor};
`;

const CategoryWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  justify-content: flex-start;
  align-items: start;
  width: 98%;
  gap: 1.5rem;
  flex-wrap: nowrap;
  white-space: nowrap;
  overflow: hidden; /* 넘친 카테고리들을 가리도록 설정 */
`;

const CategoryText = styled.p<{ $isSelected: boolean }>`
  font-size: 0.8rem;
  font-weight: ${({ $isSelected }) => ($isSelected ? '600' : '400')};
  line-height: 1.9rem; /* 187.5% */
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.editorTextColor : theme.grayTextColor};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.editorTextColor};
    font-weight: 600;
  }
`;

interface Category {
  label: string;
}

const categories: Category[] = [
  { label: '전체 기사' },
  { label: '금융' },
  { label: '산업' },
  { label: '취업/고용' },
  { label: '자동차' },
  { label: '주식' },
  { label: '부동산' },
  { label: '소비자' },
  { label: '국제경제' },
  { label: '가상자산' },
  { label: '연금/노후' },
  { label: '경제정책' },
  { label: '벤처/스타트업' },
];

const SubNewsMainPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('전체 기사');
  // 북마크 업데이트 상태 관리
  const [bookmarkUpdated, setBookmarkUpdated] = useState(false);

  // 북마크 성공 시 호출되는 콜백 함수
  const handleBookmarkSuccess = () => {
    setBookmarkUpdated(true); // 북마크가 성공하면 상태를 true로 변경
  };

  // 북마크 업데이트가 발생하면, BookmarkedNews를 갱신할 수 있도록 상태를 초기화
  const resetBookmarkUpdated = () => {
    setBookmarkUpdated(false); // 상태를 다시 false로 설정
  };

  const isEconomicNews = location.pathname.includes('economic-news');

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    // navigate를 사용해 EconomicNewsPage로 이동
    navigate('/subnews-main/economic-news', {
      state: { selectedCategory: category },
    });
  };

  return (
    <>
      <Center>
        <SubNewsMainCenter>
          <SubNewsHeaderWrapper>
            <SubNewsHeaderText>
              {isEconomicNews ? '시황 뉴스' : '종목 뉴스'}
            </SubNewsHeaderText>

            <SubNewsBoarder />
            {isEconomicNews ? (
              <CategoryWrapper>
                {categories.map((category, index) => (
                  <CategoryText
                    key={index}
                    $isSelected={selectedCategory === category.label}
                    onClick={() => handleCategoryClick(category.label)}
                  >
                    {category.label}
                  </CategoryText>
                ))}
              </CategoryWrapper>
            ) : null}
          </SubNewsHeaderWrapper>
        </SubNewsMainCenter>
        <Outlet
          context={{
            selectedCategory,
            onBookmarkSuccess: handleBookmarkSuccess,
            bookmarkUpdated,
            resetBookmarkUpdated,
          }}
        />
      </Center>
    </>
  );
};

export default SubNewsMainPage;
