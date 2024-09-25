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

const NewsSection: React.FC<NewsSectionProps> = ({ title, datas }) => (
  <>
    <CenterContentSectionBeforeDiv>
      <CenterContentSectionTitle>{title}</CenterContentSectionTitle>
    </CenterContentSectionBeforeDiv>
    <CenterContentSection>
      <CenterContentSectionRowDiv>
        {datas.map((data, index) => (
          <CenterNewsCard key={index} data={data} />
        ))}
      </CenterContentSectionRowDiv>
    </CenterContentSection>
  </>
);

export default NewsSection;
