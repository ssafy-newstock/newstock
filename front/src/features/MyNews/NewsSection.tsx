import { useState, useEffect } from 'react';
import CenterNewsCard from '@features/MyNews/CenterNewsCard';
import {
  CenterContentSection,
  CenterContentSectionBeforeDiv,
  CenterContentSectionRowDiv,
  CenterContentSectionTitle,
  NewsSectionButtonLeft,
  NewsSectionButtonRight,
} from '@features/MyNews/styledComponent';

interface NewsData {
  id: number;
  title: string;
  subtitle: string | null;
  media: string;
  description: string;
  thumbnail: string;
  uploadDatetime: string;
  article: string;
  sentiment: string;
  industry?: string;
  stockNewsStockCodes?: { stockCode: string; stockName: string }[]; // 종목 뉴스만 해당되는 부분
  stockKeywords?: string[]; // 종목 뉴스만 해당되는 부분
}

interface NewsSectionProps {
  title: string;
  datas: NewsData[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ title, datas }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4); // 기본 4개
  const [displayedDatas, setDisplayedDatas] = useState(datas);

  // 화면 크기에 따라 itemsPerPage 설정
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 2700) {
        setItemsPerPage(6);
      } else if (screenWidth >= 2100) {
        setItemsPerPage(5);
      } else if (screenWidth >= 1800) {
        setItemsPerPage(4);
      } else if (screenWidth >= 1450) {
        setItemsPerPage(3);
      } else if (screenWidth >= 1050) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    useEffect(() => {
      setDisplayedDatas(datas); // 초기화 데이터로 설정
    }, [datas]);

    handleResize(); // 초기 화면 크기에 맞게 설정
    window.addEventListener('resize', handleResize); // 화면 크기 변경 시 호출

    return () => {
      window.removeEventListener('resize', handleResize); // 클린업
    };
  }, []);

  const totalItems = datas.length;
  const maxIndex = Math.ceil(totalItems / itemsPerPage) - 1;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const getDisplayedItems = () => {
    const startIndex = currentIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return datas.slice(startIndex, endIndex);
  };
  const handleDelete = (id: number) => {
    setDisplayedDatas((prevDatas) =>
      prevDatas.filter((news) => news.id !== id)
    );
  };
  return (
    <>
      <CenterContentSectionBeforeDiv>
        <CenterContentSectionTitle>{title}</CenterContentSectionTitle>
      </CenterContentSectionBeforeDiv>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CenterContentSection>
          {displayedDatas.length === 0 ? (
            <div
              style={{
                width: '100%',
                height: '12.25rem',
                textAlign: 'center',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <p style={{ fontSize: '1.25rem' }}>저장한 뉴스가 없습니다.</p>
            </div>
          ) : (
            <>
              <NewsSectionButtonLeft
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="190"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="#828282"
                    fillRule="evenodd"
                    d="M7.222 9.897q3.45-3.461 6.744-6.754a.65.65 0 0 0 0-.896c-.311-.346-.803-.316-1.027-.08Q9.525 5.59 5.796 9.322q-.296.243-.296.574t.296.592l7.483 7.306a.75.75 0 0 0 1.044-.029c.358-.359.22-.713.058-.881a3408 3408 0 0 1-7.16-6.988"
                  />
                </svg>
              </NewsSectionButtonLeft>
              <CenterContentSectionRowDiv>
                {getDisplayedItems().map((data, index) => (
                  <CenterNewsCard
                    key={index}
                    data={data}
                    title={title}
                    onDelete={handleDelete}
                  />
                ))}
              </CenterContentSectionRowDiv>
              <NewsSectionButtonRight
                onClick={handleNext}
                disabled={currentIndex === maxIndex}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="190"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="#828282"
                    fillRule="evenodd"
                    d="m7.053 2.158l7.243 7.256a.66.66 0 0 1 .204.483a.7.7 0 0 1-.204.497q-3.93 3.834-7.575 7.401c-.125.117-.625.408-1.011-.024c-.386-.433-.152-.81 0-.966l7.068-6.908l-6.747-6.759q-.369-.509.06-.939q.43-.43.962-.04"
                  />
                </svg>
              </NewsSectionButtonRight>
            </>
          )}
        </CenterContentSection>
      </div>
    </>
  );
};

export default NewsSection;
