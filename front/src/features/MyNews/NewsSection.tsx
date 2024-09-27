import React, { useState, useEffect } from 'react';
import CenterNewsCard from '@features/MyNews/CenterNewsCard';
import {
  CenterContentSection,
  CenterContentSectionBeforeDiv,
  CenterContentSectionRowDiv,
  CenterContentSectionTitle,
} from '@features/MyNews/styledComponent';

interface NewsData {
  title: string;
  subtitle: string;
  media: string;
  description: string;
  thumbnail: string;
  uploadDatetime: string;
  article: string;
  newsId: string;
  industry?: string;
  stockCodes?: string[];
  keywords?: string[];
}

interface NewsSectionProps {
  title: string;
  datas: NewsData[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ title, datas }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4); // 기본 4개

  // 화면 크기에 따라 itemsPerPage 설정
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 2700) {
        setItemsPerPage(6);
      } else if (screenWidth >= 2300) {
        setItemsPerPage(5);
      } else if (screenWidth >= 1200) {
        setItemsPerPage(4); // 큰 화면에서 4개
      } else if (screenWidth >= 768) {
        setItemsPerPage(3); // 중간 화면에서 3개
      } else {
        setItemsPerPage(2); // 작은 화면에서 2개
      }
    };

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

  return (
    <>
      <CenterContentSectionBeforeDiv>
        <CenterContentSectionTitle>{title}</CenterContentSectionTitle>
      </CenterContentSectionBeforeDiv>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button onClick={handlePrev} disabled={currentIndex === 0}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="190"
            viewBox="0 0 20 20"
          >
            <path
              fill="#828282"
              fill-rule="evenodd"
              d="M7.222 9.897q3.45-3.461 6.744-6.754a.65.65 0 0 0 0-.896c-.311-.346-.803-.316-1.027-.08Q9.525 5.59 5.796 9.322q-.296.243-.296.574t.296.592l7.483 7.306a.75.75 0 0 0 1.044-.029c.358-.359.22-.713.058-.881a3408 3408 0 0 1-7.16-6.988"
            />
          </svg>
        </button>
        <CenterContentSection>
          <CenterContentSectionRowDiv>
            {getDisplayedItems().map((data, index) => (
              <CenterNewsCard key={index} data={data} />
            ))}
          </CenterContentSectionRowDiv>
        </CenterContentSection>
        <button onClick={handleNext} disabled={currentIndex === maxIndex}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="190"
            viewBox="0 0 20 20"
          >
            <path
              fill="#828282"
              fill-rule="evenodd"
              d="m7.053 2.158l7.243 7.256a.66.66 0 0 1 .204.483a.7.7 0 0 1-.204.497q-3.93 3.834-7.575 7.401c-.125.117-.625.408-1.011-.024c-.386-.433-.152-.81 0-.966l7.068-6.908l-6.747-6.759q-.369-.509.06-.939q.43-.43.962-.04"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default NewsSection;
