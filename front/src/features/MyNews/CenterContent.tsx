import NewsSection from '@features/MyNews/NewsSection';
import { CenterContentDiv } from '@features/MyNews/styledComponent';

const CenterContent: React.FC = () => {
  return (
    <CenterContentDiv>
      <NewsSection title={'시황 뉴스'} />
      <NewsSection title={'종목 뉴스'} />
    </CenterContentDiv>
  );
};

export default CenterContent;
