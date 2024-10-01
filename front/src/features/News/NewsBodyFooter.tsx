import styled from 'styled-components';

const NewsBodyFooterWrapper = styled.div`
  display: flex;
  padding: 0 0.6rem;
  align-items: center;
  gap: 0.75rem;
`;

const NewsBodyFooterWriter = styled.div`
  color: #828282;
  font-family: Inter;
  font-size: 1.1rem;
  font-style: normal;
  line-height: 1.9rem;
`;

const LineSVG = styled.div`
  width: 0.09rem;
  height: 1.3rem;
  background-color: #828282;
`;

const NewsBodyFooterDate = styled.div`
  color: #828282;
  font-family: Inter;
  font-size: 1.1rem;
  font-style: normal;
  line-height: 1.9rem;
`;

interface NewsBodyFooterProps {
  media: string;
  date: string;
}

const NewsBodyFooter: React.FC<NewsBodyFooterProps> = ({ media, date }) => {
  const formattedDate = date.split(' ')[0].replace(/-/g, '.');

  return (
    <NewsBodyFooterWrapper>
      <NewsBodyFooterWriter>{media}</NewsBodyFooterWriter>
      <LineSVG />
      <NewsBodyFooterDate>{formattedDate}</NewsBodyFooterDate>
    </NewsBodyFooterWrapper>
  );
};

export default NewsBodyFooter;
