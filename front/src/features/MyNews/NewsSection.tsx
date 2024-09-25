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
          ◀
        </button>
        <CenterContentSection>
          <CenterContentSectionRowDiv>
            {getDisplayedItems().map((data, index) => (
              <CenterNewsCard key={index} data={data} />
            ))}
          </CenterContentSectionRowDiv>
        </CenterContentSection>
        <button onClick={handleNext} disabled={currentIndex === maxIndex}>
          ▶
        </button>
      </div>
    </>
  );
};

export default NewsSection;
