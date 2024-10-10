import styled from 'styled-components';
import FlipCardContainer from './FlipCardContainer';
import {
  CardDescription,
  CardTitle,
  MoreButton,
  SectionContainerWhite,
  SectionTitle,
} from '@features/Onboading/OnboadingStyledComponent';
import { RightIcon } from '@features/Onboading/Icon';

// 카드 내용 래퍼 스타일
const CardContentWrapper = styled.div`
  position: relative; /* 부모 요소의 위치를 상대적으로 설정 */
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

// 카드 타이틀 스타일
const CardContentTitle = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: white;
`;

// 카드 내용 항목 스타일
const CardContentItem = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0; /* 각 문장 사이의 여백 */
  color: white;
  line-height: 1.5;
`;

interface SectionProps {
  $isVisible: boolean;
  sectionRef: React.RefObject<HTMLDivElement>;
  scrollToSectionFourth: () => void;
  scrollToSectionFifth: () => void;
  scrollToSectionSixth: () => void;
}

const SectionSecond: React.FC<SectionProps> = ({
  $isVisible,
  sectionRef,
  scrollToSectionFourth,
  scrollToSectionFifth,
  scrollToSectionSixth,
}) => {
  return (
    <SectionContainerWhite
      ref={sectionRef}
      $isVisible={$isVisible}
      data-section="SectionNews"
    >
      <SectionTitle>뉴스톡의 주요 기능</SectionTitle>
      <FlipCardContainer
        cards={[
          {
            front: (
              <CardContentWrapper>
                <iframe
                  src="https://lottie.host/embed/100a9330-a472-46b5-99aa-0b7920b4050d/HHxJgpXD6z.json"
                  width="300"
                  height="300"
                ></iframe>
                <CardTitle>뉴스</CardTitle>
                <CardDescription>한눈에 파악하는 경제 뉴스</CardDescription>
              </CardContentWrapper>
            ),
            back: (
              <CardContentWrapper>
                <CardContentTitle>뉴스</CardContentTitle>
                <CardDescription as="ul">
                  <CardContentItem>
                    Newstock은 다양한 경제 뉴스를 실시간으로 제공하며, 보다
                    전략적으로 뉴스를 활용할 수 있도록 시황 뉴스와 종목별 뉴스로
                    분류해드려요.
                  </CardContentItem>
                  <CardContentItem>
                    뉴스 감정 분석을 통해 긍정·부정적 시장 반응을 쉽게 파악하고,
                    투자 결정에 도움을 드려요.
                  </CardContentItem>
                </CardDescription>
                <MoreButton onClick={scrollToSectionFourth}>
                  더 알아보기
                  <RightIcon />
                </MoreButton>
              </CardContentWrapper>
            ),
            bgColor: '#e6eef4',
          },
          {
            front: (
              <CardContentWrapper>
                <iframe
                  src="https://lottie.host/embed/687b168d-6cf4-4357-a3a9-f3ef3a4efc8f/6aJfpOudUD.json"
                  width="300"
                  height="300"
                  style={{ border: 'none' }}
                ></iframe>
                <CardTitle>주식</CardTitle>
                <CardDescription>
                  실시간 주식 데이터 기반 모의 투자
                </CardDescription>
              </CardContentWrapper>
            ),
            back: (
              <CardContentWrapper>
                <CardContentTitle>주식</CardContentTitle>
                <CardDescription as="ul">
                  <CardContentItem>
                    가상 포인트를 사용하여 실시간 주식 데이터 기반의 모의 투자
                    기능을 제공해요. 실제 시장 데이터를 통해 리스크 없는 투자를
                    경험해보세요.
                  </CardContentItem>
                  <CardContentItem>
                    주식 차트를 통해 투자 흐름을 쉽게 파악하고, 과거와 현재 시장
                    상황을 비교하여 투자 전략을 개선할 수 있습니다.
                  </CardContentItem>
                </CardDescription>
                <MoreButton onClick={scrollToSectionFifth}>
                  더 알아보기
                  <RightIcon />
                </MoreButton>
              </CardContentWrapper>
            ),
            bgColor: '#e6eef4',
          },
          {
            front: (
              <CardContentWrapper>
                <iframe
                  src="https://lottie.host/embed/478bd268-09fa-444c-a0fb-ca0418b653b5/4s6kRdSWYV.json"
                  width="300"
                  height="300"
                ></iframe>
                <CardTitle>부가 기능</CardTitle>
                <CardDescription>
                  AI 챗봇, 일일 레포트, 스크랩, 랭킹 등
                </CardDescription>
              </CardContentWrapper>
            ),
            back: (
              <CardContentWrapper>
                <CardContentTitle>부가 기능</CardContentTitle>
                <CardDescription as="ul">
                  <CardContentItem>
                    AI 요약 기능을 통해 방대한 양의 뉴스 데이터와 주식 데이터를
                    간단하게 요약하여 제공합니다.
                  </CardContentItem>
                  <CardContentItem>
                    북마크한 뉴스를 스크랩하여 공부할 수 있는 기능을 제공합니다.
                  </CardContentItem>
                </CardDescription>
                <MoreButton onClick={scrollToSectionSixth}>
                  더 알아보기
                  <RightIcon />
                </MoreButton>
              </CardContentWrapper>
            ),
            bgColor: '#e6eef4',
          },
        ]}
      />
    </SectionContainerWhite>
  );
};

export default SectionSecond;
