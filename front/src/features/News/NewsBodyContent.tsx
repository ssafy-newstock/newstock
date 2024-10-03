import styled from 'styled-components';

const NewsBodyContentWrapper = styled.div`
  display: flex;
  width: 18rem;
  justify-content: center;
  align-items: center;
`;

const NewsBodyContentText = styled.div`
  width: 17rem;
  /* flex-shrink: 0; */
  color: #828282;
  font-size: 0.94rem;
  line-height: 1.6rem;

  display: -webkit-box;
  -webkit-line-clamp: 3; /* 최대 3줄까지만 표시 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; /* 말줄임표 적용 */
`;

interface NewsBodyContentProps {
  content: string;
}

const NewsBodyContent: React.FC<NewsBodyContentProps> = ({ content }) => {
  return (
    <NewsBodyContentWrapper>
      <NewsBodyContentText>{content}</NewsBodyContentText>
    </NewsBodyContentWrapper>
  );
};

export default NewsBodyContent;
