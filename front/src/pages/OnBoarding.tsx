import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAuthStore from '@store/useAuthStore';
import SectionFirst from '@features/Onboading/SectionFirst';
import SectionSecond from '@features/Onboading/SectionSecond';
import SectionThird from '@features/Onboading/SectionThird';
import SectionFourth from '@features/Onboading/SectionFourth';
import SectionFifth from '@features/Onboading/SectionFifth';
import SectionSixth from '@features/Onboading/SectionSixth';
import SectionLast from '@features/Onboading/SectionLast';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const SectionContainer = styled.div`
  scroll-snap-align: start;
  width: 100%;
  height: 100vh;
`;

const OnBoardingPage = () => {
  const { isLogin } = useAuthStore();
  const navigate = useNavigate();

  const [isSectionVisible, setIsSectionVisible] = useState({
    SectionFirst: false,
    SectionSecond: false,
    SectionThird: false,
    SectionFourth: false,
    SectionFifth: false,
    SectionSixth: false,
    SectionLast: false, // 마지막 섹션 추가
  });

  const sectionRefs = {
    SectionFirst: useRef<HTMLDivElement | null>(null),
    SectionSecond: useRef<HTMLDivElement | null>(null),
    SectionThird: useRef<HTMLDivElement | null>(null),
    SectionFourth: useRef<HTMLDivElement | null>(null),
    SectionFifth: useRef<HTMLDivElement | null>(null),
    SectionSixth: useRef<HTMLDivElement | null>(null),
    SectionLast: useRef<HTMLDivElement | null>(null), // 마지막 섹션 ref 추가
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target.getAttribute('data-section')!;

          // 화면에서 보일 때 상태를 true로 설정
          if (entry.isIntersecting) {
            setIsSectionVisible((prev) => ({ ...prev, [section]: true }));
          } else {
            // 화면에서 벗어났을 때 상태를 false로 설정
            setIsSectionVisible((prev) => ({ ...prev, [section]: false }));
          }
        });
      },
      { threshold: 0.5 }
    );

    // 각 섹션을 옵저버에 등록
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    // 클린업: 옵저버 해제
    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  const scrollToSection = (section: keyof typeof sectionRefs) => {
    sectionRefs[section].current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStart = () => {
    // 마지막 섹션에서 "시작하기"를 누르면 로그인 상태에 따라 news-main으로 이동
    if (isLogin) {
      navigate('/news-main');
    } else {
      // 로그인 상태가 아니면 로그인 페이지로 이동
      navigate('/login');
    }
  };

  return (
    <Container>
      {/* 첫 번째 섹션 */}
      <SectionContainer
        ref={sectionRefs.SectionFirst}
        data-section="SectionFirst"
      >
        <SectionFirst
          $isVisible={isSectionVisible.SectionFirst}
          sectionRef={sectionRefs.SectionFirst}
          scrollToSectionSecond={() => scrollToSection('SectionSecond')}
        />
      </SectionContainer>

      {/* 두 번째 섹션 - 기능 소개*/}
      <SectionContainer
        ref={sectionRefs.SectionSecond}
        data-section="SectionSecond"
      >
        <SectionSecond
          $isVisible={isSectionVisible.SectionSecond}
          sectionRef={sectionRefs.SectionSecond}
          scrollToSectionFourth={() => scrollToSection('SectionFourth')}
          scrollToSectionFifth={() => scrollToSection('SectionFifth')}
          scrollToSectionSixth={() => scrollToSection('SectionSixth')}
        />
      </SectionContainer>

      {/* 세 번째 섹션 - 이런거 했어요 */}
      <SectionContainer
        ref={sectionRefs.SectionThird}
        data-section="SectionThird"
      >
        <SectionThird
          $isVisible={isSectionVisible.SectionThird}
          sectionRef={sectionRefs.SectionThird}
          scrollToSectionFourth={() => scrollToSection('SectionFourth')}
          scrollToSectionFifth={() => scrollToSection('SectionFifth')}
        />
      </SectionContainer>

      {/* 네 번째 섹션 - 뉴스 기능 소개*/}
      <SectionContainer
        ref={sectionRefs.SectionFourth}
        data-section="SectionFourth"
      >
        <SectionFourth
          $isVisible={isSectionVisible.SectionFourth}
          sectionRef={sectionRefs.SectionFourth}
        />
      </SectionContainer>

      {/* 다섯 번째 섹션 - 모의 투자 기능 소개*/}
      <SectionContainer
        ref={sectionRefs.SectionFifth}
        data-section="SectionFifth"
      >
        <SectionFifth
          $isVisible={isSectionVisible.SectionFifth}
          sectionRef={sectionRefs.SectionFifth}
        />
      </SectionContainer>

      {/* 여섯 번째 섹션 - 부가 기능 기능 소개*/}
      <SectionContainer
        ref={sectionRefs.SectionSixth}
        data-section="SectionSixth"
      >
        <SectionSixth
          $isVisible={isSectionVisible.SectionSixth}
          sectionRef={sectionRefs.SectionSixth}
        />
      </SectionContainer>

      {/* 마지막 섹션 - 시작하기 */}
      <SectionContainer
        ref={sectionRefs.SectionLast}
        data-section="SectionLast"
      >
        <SectionLast
          $isVisible={isSectionVisible.SectionLast}
          sectionRef={sectionRefs.SectionLast}
          onStart={handleStart} // 시작하기 버튼에 이벤트 추가
        />
      </SectionContainer>
    </Container>
  );
};

export default OnBoardingPage;
