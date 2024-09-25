import styled from 'styled-components';

const NewsBodyHeaderText = styled.div`
  color: #828282;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  line-height: 1.9rem;
`;

interface NewsBodyHeaderProps {
  header: string;
}

const EconNewsMainBodyHeader: React.FC<NewsBodyHeaderProps> = ({ header }) => {
  return <NewsBodyHeaderText>{header}</NewsBodyHeaderText>;
};

export default EconNewsMainBodyHeader;
