import styled from 'styled-components';

const EconNewsDetailBodyWrapper = styled.div`
  display: flex;
  padding: 1rem 0.625rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
`;
const NewsSubTitleWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 1.875rem;
  align-items: flex-start;
  margin-bottom: 2rem;
`;
const NewsSubTitleLine = styled.div`
  width: 0.15rem;
  height: auto;
  background-color: ${({ theme }) => theme.textColor};
  align-self: stretch;
`;

const NewsSubTitleText = styled.p`
  color: ${({ theme }) => theme.grayTextColor};
  width: 60%;
  font-size: 1.25rem;
  line-height: 1.875rem; /* 150% */
`;

const NewsThumbnailWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 1.25rem 0rem 3.75rem 0rem;
`;

const ThumbnailImage = styled.img`
  width: 100%; /* 너비에 맞게 꽉 차도록 설정 */
  height: auto; /* 이미지의 원래 비율을 유지 */
  object-fit: cover; /* 비율을 유지하면서 컨테이너에 맞추되, 넘치는 부분은 잘라냄 */
`;
// `;
const NewsContentText = styled.div`
  display: block;
  white-space: normal; /* 줄바꿈을 정상 처리 */
  color: ${({ theme }) => theme.textColor};
  font-size: 1.25rem;
  line-height: 1.875rem;
  word-break: break-word; /* 긴 텍스트가 있을 때 줄바꿈 */
  margin-bottom: 1rem;
`;

const processArticle = (article: string) => {
  const imageTagRegex = /<ImageTag>(.*?)<\/ImageTag>/g;
  const content: Array<string | { imageUrl: string }> = [];
  let lastIndex = 0;
  let match;

  while ((match = imageTagRegex.exec(article)) !== null) {
    const imageUrl = match[1];

    // ImageTag 이전의 텍스트를 줄바꿈과 함께 저장
    if (match.index > lastIndex) {
      const textChunk = article.substring(lastIndex, match.index);
      content.push(textChunk); // 텍스트는 string으로 저장
    }

    // ImageTag를 실제 이미지 URL로 교체하여 저장
    content.push({ imageUrl });

    // 다음 텍스트 조각 시작 위치
    lastIndex = match.index + match[0].length;
  }

  // 마지막으로 남은 텍스트 조각 추가
  if (lastIndex < article.length) {
    const textChunk = article.substring(lastIndex);
    content.push(textChunk); // 텍스트는 string으로 저장
  }

  return content;
};

interface EconNewsDetailBodyProps {
  subtitle?: string;
  article: string;
}

const EconNewsDetailBody: React.FC<EconNewsDetailBodyProps> = ({
  subtitle,
  article,
}) => {
  const contentWithImages = article ? processArticle(article) : [];

  return (
    <>
      <EconNewsDetailBodyWrapper>
        <NewsSubTitleWrapper>
          <NewsSubTitleLine />
          {subtitle && (
            <NewsSubTitleText>{subtitle ?? '제목 없음'}</NewsSubTitleText>
          )}
        </NewsSubTitleWrapper>

        {contentWithImages.map((item, index) => {
          if (typeof item === 'object' && 'imageUrl' in item) {
            // 이미지 부분 렌더링
            return (
              <NewsThumbnailWrapper key={index}>
                <ThumbnailImage src={item.imageUrl} alt={`image-${index}`} />
              </NewsThumbnailWrapper>
            );
          } else if (typeof item === 'string') {
            // 텍스트 부분 렌더링, 줄바꿈 처리
            const paragraphs = item.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ));
            return <NewsContentText key={index}>{paragraphs}</NewsContentText>;
          }
          return null;
        })}
      </EconNewsDetailBodyWrapper>
    </>
  );
};

export default EconNewsDetailBody;
