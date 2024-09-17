import NewsSection from './NewsSection';
import ScrapSection from './ScrapSection';
import { CenterContentDiv } from './styledComponent';

const CenterContent: React.FC = () => {
  return (
    <CenterContentDiv>
      <NewsSection title={'시황 뉴스'} />
      <NewsSection title={'종목 뉴스'} />
      <ScrapSection title={'스크랩'} />
    </CenterContentDiv>
  );
};

export default CenterContent;
