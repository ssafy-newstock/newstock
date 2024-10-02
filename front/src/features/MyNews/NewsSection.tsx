import { useState } from 'react';
import CenterNewsCard from '@features/MyNews/CenterNewsCard';
import {
  CenterContentSection,
  CenterContentSectionBeforeDiv,
  CenterContentSectionDiv,
  CenterContentSectionTitle,
  NewsSectionContainer,
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
  stockNewsStockCodes?: { stockCode: string; stockName: string }[];
  stockKeywords?: string[];
}

interface NewsSectionProps {
  title: string;
  datas: NewsData[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ title, datas }) => {
  const handleDelete = (id: number) => {
    datas.filter((news) => news.id !== id);
  };

  return (
    <NewsSectionContainer>
      <CenterContentSectionBeforeDiv>
        <CenterContentSectionTitle>{title}</CenterContentSectionTitle>
      </CenterContentSectionBeforeDiv>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {datas.length === 0 ? (
          <div
            style={{
              height: '100%',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '1.5rem',
            }}
          >
            <p
              style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                width: '100%',
                display: 'flex',
                alignItems: 'center', // 텍스트를 세로 중앙 정렬
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              저장한 {title}가 없습니다.
            </p>
          </div>
        ) : (
          <CenterContentSection>
            <CenterContentSectionDiv>
              {datas.map((data, index) => (
                <CenterNewsCard
                  key={index}
                  data={data}
                  title={title}
                  onDelete={handleDelete}
                />
              ))}
            </CenterContentSectionDiv>
          </CenterContentSection>
        )}
      </div>
    </NewsSectionContainer>
  );
};

export default NewsSection;
