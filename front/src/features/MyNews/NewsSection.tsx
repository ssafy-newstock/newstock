import CenterNewsCard from './CenterNewsCard';
import {
  CenterContentSection,
  CenterContentSectionTitle,
} from './styledComponent';

interface NewsSectionProps {
  title: string;
}

interface CardData {
  Title: string;
  Media: string;
  Date: string;
  keyword?: string;
  category?: string;
}

const cards: CardData[] = [
  {
    Title: '[청년 디지털 인재] “AI부터 ...',
    Media: '청년일보',
    Date: '2024.08.18',
    keyword: '삼성전자',
  },
  {
    Title: '[청년 디지털 인재] “AI부터 ...',
    Media: '청년일보',
    Date: '2024.08.18',
    keyword: '삼성전자',
  },
  {
    Title: '[청년 디지털 인재] “AI부터 ...',
    Media: '청년일보',
    Date: '2024.08.18',
    category: '금융',
  },
];
const NewsSection: React.FC<NewsSectionProps> = ({ title }) => (
  <CenterContentSection>
    <CenterContentSectionTitle>{title}</CenterContentSectionTitle>
    {cards.map((data, index) => (
      <CenterNewsCard key={index} data={data} />
    ))}
  </CenterContentSection>
);

export default NewsSection;
