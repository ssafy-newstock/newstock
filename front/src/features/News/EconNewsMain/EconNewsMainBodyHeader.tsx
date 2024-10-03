import styled from 'styled-components';

const NewsBodyHeaderText = styled.div`
  color: ${({ theme }) => theme.editorTextColor};
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.9rem;
  margin-bottom: 1rem;
`;

interface NewsBodyHeaderProps {
  header: string;
}

const EconNewsMainBodyHeader: React.FC<NewsBodyHeaderProps> = ({ header }) => {
  return <NewsBodyHeaderText>{header}</NewsBodyHeaderText>;
};

export default EconNewsMainBodyHeader;
