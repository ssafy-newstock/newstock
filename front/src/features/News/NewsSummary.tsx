import LoadingSpinner from '@components/LoadingSpinner';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const NewsSummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 40rem;
  min-height: 14rem;
  padding: 0.625rem;
  gap: 0.9rem;
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 1.875rem;
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

const NewsSummaryTitle = styled.div`
  display: flex;
  padding: 0.625rem 0rem;
  justify-content: center;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
`;

const NewsSummaryTitleText = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.875rem;
`;

const NewsSummaryBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
`;

const NewsSummaryBodyText = styled.div`
  color: #000000;
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.8;
  flex: 1 0 0;
  text-align: left;
  max-width: 35rem; /* 최대 폭 설정 */
  margin-bottom: 0.5rem; /* 문장 간 간격 추가 */
  margin: 0 auto; /* 가운데 정렬 느낌으로 문단 위치 조정 */
`;

const CloseButtonWrapper = styled.div`
  display: flex;
  height: 2.75rem;
  padding: 0rem 3.125rem;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  align-self: stretch;
`;

const CloseButton = styled.button`
  display: flex;
  padding: 0.625rem 1.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.9375rem;
  background-color: ${({ theme }) => theme.profileBackgroundColor};
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  cursor: pointer;
  border: none;

  &:hover {
    background-color: rgba(0, 109, 255, 0.8);
    color: #ffffff;
    transition: background-color 0.3s ease;
  }
`;

const ButtonText = styled.p`
  color: ${({ theme }) => theme.profileColor};
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.2;
`;

interface IShortResponse {
  newsOne: string;
  newsTwo: string;
  newsThree: string;
}

interface NewsSummaryProps {
  onClose: (event: React.MouseEvent) => void;
  data?: IShortResponse;
}

const NewsSummary: React.FC<NewsSummaryProps> = ({ onClose, data }) => {
  // 데이터가 없을 때 빈 문자열로 처리
  const newsOne = data?.newsOne || '요약 정보가 없습니다.';
  const newsTwo = data?.newsTwo || '요약 정보가 없습니다.';
  const newsThree = data?.newsThree || '요약 정보가 없습니다.';
  console.log(newsOne, newsTwo, newsThree);
  if (!data) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <NewsSummaryWrapper>
        <NewsSummaryTitle>
          <NewsSummaryTitleText>뉴스 요약</NewsSummaryTitleText>
        </NewsSummaryTitle>

        {/* 뉴스 요약 정보를 표시 */}
        <NewsSummaryBody>
          <NewsSummaryBodyText
            dangerouslySetInnerHTML={{ __html: `1. ${data?.newsOne || ''}` }}
          />
        </NewsSummaryBody>
        <NewsSummaryBody>
          <NewsSummaryBodyText
            dangerouslySetInnerHTML={{ __html: `2. ${data?.newsTwo || ''}` }}
          />
        </NewsSummaryBody>
        <NewsSummaryBody>
          <NewsSummaryBodyText
            dangerouslySetInnerHTML={{ __html: `3. ${data?.newsThree || ''}` }}
          />
        </NewsSummaryBody>

        <CloseButtonWrapper>
          <CloseButton type="button" onClick={onClose}>
            <ButtonText>닫기</ButtonText>
          </CloseButton>
        </CloseButtonWrapper>
      </NewsSummaryWrapper>
    </>
  );
};

export default NewsSummary;
