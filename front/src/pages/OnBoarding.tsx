import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAuthStore from '@store/useAuthStore';

const Container = styled.div`
  width: 100%;
`;

const Section = styled.div`
  width: 100%;
  height: 100vh; /* 각 div가 전체 뷰포인트 높이를 차지 */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 50px;
`;

const Card = styled.div`
  width: 300px;
  height: 200px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1); /* 마우스 오버 시 커짐 */
  }
`;

const FlipCardContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 50px;
`;

const FlipCard = styled.div`
  perspective: 1000px; /* 3D 효과를 위해 필요한 속성 */
`;

const FlipCardInner = styled.div`
  position: relative;
  width: 300px;
  height: 200px;
  transition: transform 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  transform-style: preserve-3d;
  will-change: transform;

  &:hover {
    transform: rotateY(180deg); /* 마우스 오버 시 카드 뒤집힘 */
  }
`;

const FlipCardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FlipCardFront = styled(FlipCardFace)`
  background-color: #f1c40f;
`;

const FlipCardBack = styled(FlipCardFace)`
  background-color: #2980b9;
  transform: rotateY(180deg);
`;

const OnBoardingPage = () => {
  const { isLogin } = useAuthStore();
  const navigate = useNavigate();

  const [isSectionVisible, setIsSectionVisible] = useState({
    section1: false,
    section2: false,
    section3: false,
    section4: false,
  });

  const sectionRefs = {
    section1: useRef<HTMLDivElement | null>(null),
    section2: useRef<HTMLDivElement | null>(null),
    section3: useRef<HTMLDivElement | null>(null),
    section4: useRef<HTMLDivElement | null>(null),
  };

  useEffect(() => {
    if (isLogin) {
      navigate('/news-main');
    }
  }, [isLogin, navigate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target.getAttribute('data-section')!;
            setIsSectionVisible((prev) => ({ ...prev, [section]: true }));
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Container>
      <Section
        ref={sectionRefs.section1}
        data-section="section1"
        style={{
          backgroundColor: '#FFD700',
          opacity: isSectionVisible.section1 ? 1 : 0,
          transition: 'opacity 1s ease',
        }}
      >
        Section 1
      </Section>

      {/* Section 2 */}
      <Section
        ref={sectionRefs.section2}
        data-section="section2"
        style={{
          backgroundColor: '#FF4500',
          flexDirection: 'column',
          opacity: isSectionVisible.section2 ? 1 : 0,
          transition: 'opacity 1s ease',
        }}
      >
        <h2>Explore Sections</h2>
        <CardContainer>
          {/* 카드 클릭 시 해당 섹션으로 부드럽게 스크롤 이동 */}
          <Card onClick={() => scrollToSection(sectionRefs.section3)}>
            Go to Section 3
          </Card>
          <Card onClick={() => scrollToSection(sectionRefs.section4)}>
            Go to Section 4
          </Card>
        </CardContainer>
      </Section>

      {/* Section 3 */}
      <Section
        ref={sectionRefs.section3}
        data-section="section3"
        style={{
          backgroundColor: '#32CD32',
          opacity: isSectionVisible.section3 ? 1 : 0,
          transition: 'opacity 1s ease',
        }}
      >
        <FlipCardContainer>
          <FlipCard>
            <FlipCardInner>
              <FlipCardFront>Front 1</FlipCardFront>
              <FlipCardBack>Back 1</FlipCardBack>
            </FlipCardInner>
          </FlipCard>
          <FlipCard>
            <FlipCardInner>
              <FlipCardFront>Front 2</FlipCardFront>
              <FlipCardBack>Back 2</FlipCardBack>
            </FlipCardInner>
          </FlipCard>
          <FlipCard>
            <FlipCardInner>
              <FlipCardFront>Front 3</FlipCardFront>
              <FlipCardBack>Back 3</FlipCardBack>
            </FlipCardInner>
          </FlipCard>
        </FlipCardContainer>
      </Section>

      {/* Section 4 */}
      <Section
        ref={sectionRefs.section4}
        data-section="section4"
        style={{
          backgroundColor: '#1E90FF',
          opacity: isSectionVisible.section4 ? 1 : 0,
          transition: 'opacity 1s ease',
        }}
      >
        <FlipCardContainer>
          <FlipCard>
            <FlipCardInner>
              <FlipCardFront>Front 4</FlipCardFront>
              <FlipCardBack>Back 4</FlipCardBack>
            </FlipCardInner>
          </FlipCard>
          <FlipCard>
            <FlipCardInner>
              <FlipCardFront>Front 5</FlipCardFront>
              <FlipCardBack>Back 5</FlipCardBack>
            </FlipCardInner>
          </FlipCard>
          <FlipCard>
            <FlipCardInner>
              <FlipCardFront>Front 6</FlipCardFront>
              <FlipCardBack>Back 6</FlipCardBack>
            </FlipCardInner>
          </FlipCard>
        </FlipCardContainer>
      </Section>
    </Container>
  );
};

export default OnBoardingPage;
