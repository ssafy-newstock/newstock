import CenterNewsCard from '@features/MyNews/CenterNewsCard';
import {
  CenterContentSection,
  CenterContentSectionBeforeDiv,
  CenterContentSectionDiv,
  CenterContentSectionTitle,
  NewsSectionContainer,
} from '@features/MyNews/styledComponent';
import { ScrapData, NewsData } from '@pages/News/ScrapNewsInterface';

// interface ScrapData {
//   id: any;
//   title: string;
//   subtitle?: string | null;
//   media?: string;
//   description?: string;
//   thumbnail?: string;
//   uploadDatetime?: string;
//   article?: string;
//   sentiment?: string;
//   industry?: string;
//   stockNewsStockCodes?: string[]; // 종목 뉴스만 해당되는 부분
//   stockKeywords?: string[]; // 종목 뉴스만 해당되는 부분
//   newsType?: string;
//   content?: string;
//   newsId?: string;
// }

// interface NewsData {
//   id: string;
//   title: string;
//   subtitle?: string | null;
//   media?: string;
//   description?: string;
//   thumbnail?: string;
//   uploadDatetime?: string;
//   article?: string;
//   sentiment?: string;
//   industry?: string;
//   stockNewsStockCodes?: string[]; // 종목 뉴스만 해당되는 부분
//   stockKeywords?: string[]; // 종목 뉴스만 해당되는 부분
//   newsType?: string;
//   content?: string;
//   newsId?: number;
// }

interface NewsSectionProps {
  title: string;
  datas: NewsData[];
  scrapDatas?: ScrapData[];
}

const NewsSection: React.FC<NewsSectionProps> = ({
  title,
  datas,
  scrapDatas,
}) => {
  const handleDelete = (id: number) => {
    datas.filter((news) => Number(news.id) !== id);
    scrapDatas?.filter((news) => Number(news.newsId) !== id);
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
              저장한 {title}이 없습니다.
            </p>
          </div>
        ) : (
          <CenterContentSection>
            <CenterContentSectionDiv>
              {/* 스크랩 뉴스인 경우 : id가 number */}
              {title.includes('스크랩') && scrapDatas
                ? scrapDatas.map((scrapData, index) => {
                    const matchedData = datas.find(
                      (data) => Number(data.id) === Number(scrapData.newsId)
                    );
                    return (
                      <CenterNewsCard
                        key={index}
                        data={matchedData || scrapData}
                        scrapData={scrapData}
                        title={title}
                        onDelete={handleDelete}
                      />
                    );
                  })
                : datas.map((data, index) => (
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
