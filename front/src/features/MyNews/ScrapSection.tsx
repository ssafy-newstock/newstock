import CenterScrapCard from './CenterScrapCard';
import {
  CenterContentSection,
  CenterContentSectionTitle,
} from './styledComponent';

interface ScrapSectionProps {
  title: string;
}

interface CardData {
  Title: string;
  NewsTitle: string;
  Date: string;
}

const cards: CardData[] = [
  {
    Title: '나 이정준 첫 번째 스크랩',
    NewsTitle: '[청년 디지털 인재] “AI부터 ...',
    Date: '2024.08.18',
  },
  {
    Title: '나 이주호 두 번째 스크랩',
    NewsTitle: '[청년 디지털 인재] “AI부터 ...',
    Date: '2024.08.18',
  },
  {
    Title: '아 숙제하기 싫다.',
    NewsTitle: '[청년 디지털 인재] “AI부터 ...',
    Date: '2024.08.18',
  },
];

const ScrapSection: React.FC<ScrapSectionProps> = ({ title }) => (
  <CenterContentSection>
    <CenterContentSectionTitle>{title}</CenterContentSectionTitle>
    {cards.map((data, index) => (
      <CenterScrapCard key={index} data={data} />
    ))}
  </CenterContentSection>
);

export default ScrapSection;
