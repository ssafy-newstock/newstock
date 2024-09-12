import styled from 'styled-components';

const NewsBodyContentWrapper = styled.div`
  display: flex;
  width: 290px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const NewsBodyContentText = styled.div`
  width: 275px;
  flex-shrink: 0;
  color: #828282;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px; /* 166.667% */

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
  // const trimmedContent =
  //   content.length > 70 ? `${content.slice(0, 71)}...` : content;

  return (
    <NewsBodyContentWrapper>
      <NewsBodyContentText>{content}</NewsBodyContentText>
    </NewsBodyContentWrapper>
  );
};

export default NewsBodyContent;
