import styled from 'styled-components';

const NewsBodyHeaderWrapper = styled.div`
  display: flex;
  /* width: 294px; */
  align-items: flex-start;
`;

const NewsBodyHeaderText = styled.div`
  color: #828282;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  /* font-weight: 400; */
  line-height: 30px;
`;

interface NewsBodyHeaderProps {
  header: string;
}

const NewsBodyHeader: React.FC<NewsBodyHeaderProps> = ({ header }) => {
  return (
    <NewsBodyHeaderWrapper>
      <NewsBodyHeaderText>{header}</NewsBodyHeaderText>
    </NewsBodyHeaderWrapper>
  );
};

export default NewsBodyHeader;
