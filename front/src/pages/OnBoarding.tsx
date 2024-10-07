import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAuthStore from '@store/useAuthStore';
import SectionFirst from '@features/Onboading/SectionFirst';
import SectionSecond from '@features/Onboading/SectionSecond';
import SectionThird from '@features/Onboading/SectionThird';
import SectionFourth from '@features/Onboading/SectionFourth';
import SectionFifth from '@features/Onboading/SectionFifth';
import SectionSixth from '@features/Onboading/SectionSixth';
import SectionLast from '@features/Onboading/SectionLast';
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// 스크롤 컨테이너 스타일: 스크롤이 발생하고 각 섹션이 스냅되는 스타일
const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll; // 스크롤 활성화
  scroll-snap-type: y mandatory; // 스냅 방식 지정
  &::-webkit-scrollbar {
    width: 0;
    height: 0; // 스크롤바 숨김 처리
  }
`;

// 각 섹션을 스냅 대상 요소로 설정
const SectionContainer = styled.div`
  scroll-snap-align: start; // 섹션이 화면 시작에 맞춰 스냅됨
  width: 100%;
  height: 100vh; // 섹션이 화면 크기에 맞도록 설정
`;

const OnBoardingPage = () => {
  const { isLogin } = useAuthStore(); // 로그인 상태 확인
  const navigate = useNavigate();
  const location = useLocation();

  // 각 섹션의 가시성 상태를 관리하는 상태 (섹션별로 true/false 설정)
  const [isSectionVisible, setIsSectionVisible] = useState({
    SectionFirst: false,
    SectionSecond: false,
    SectionThird: false,
    SectionFourth: false,
    SectionFifth: false,
    SectionSixth: false,
    SectionLast: false,
  });

  // 각 섹션의 ref를 생성해 DOM 참조
  const sectionRefs = {
    SectionFirst: useRef<HTMLDivElement | null>(null),
    SectionSecond: useRef<HTMLDivElement | null>(null),
    SectionThird: useRef<HTMLDivElement | null>(null),
    SectionFourth: useRef<HTMLDivElement | null>(null),
    SectionFifth: useRef<HTMLDivElement | null>(null),
    SectionSixth: useRef<HTMLDivElement | null>(null),
    SectionLast: useRef<HTMLDivElement | null>(null),
  };

  const prevIsLogin = usePrevious(isLogin);

  useEffect(() => {
    console.log('OnBoardingPage useEffect 호출');
    console.log('현재 isLogin 상태:', isLogin);
    console.log('이전 isLogin 상태:', prevIsLogin);
    console.log('현재 경로:', location.pathname);

    // 로그인 시도 후에만 리다이렉트
    if (isLogin && location.pathname === '/onboarding') {
      console.log(
        '로그인 상태가 false에서 true로 변경되었습니다. /news-main으로 이동합니다.'
      );
      navigate('/news-main');
    }
  }, [isLogin, prevIsLogin, location.pathname, navigate]);

  useEffect(() => {
    // IntersectionObserver 생성
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target.getAttribute('data-section')!;
          if (entry.isIntersecting) {
            // 섹션이 화면에 보일 때 가시성 true로 설정
            setIsSectionVisible((prev) => ({ ...prev, [section]: true }));
          } else {
            // 섹션이 화면에서 벗어날 때 가시성 false로 설정
            setIsSectionVisible((prev) => ({ ...prev, [section]: false }));
          }
        });
      },
      { threshold: 0.5 } // 50% 이상 보일 때 "보임"으로 처리
    );

    // 각 섹션을 옵저버에 등록
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    // 컴포넌트가 언마운트 될 때 옵저버 해제
    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  // 특정 섹션으로 스크롤 이동하는 함수
  const scrollToSection = (section: keyof typeof sectionRefs) => {
    sectionRefs[section].current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 마지막 섹션에서 "시작하기" 버튼을 클릭할 때 처리
  const handleStart = () => {
    // 로그인 여부에 따라 페이지 이동
    if (isLogin) {
      navigate('/news-main'); // 로그인 시 news-main으로 이동
    } else {
      navigate('/login'); // 로그인하지 않았을 경우 로그인 페이지로 이동
    }
  };

  return (
    <Container>
      {/* 첫 번째 섹션 */}
      <SectionContainer
        ref={sectionRefs.SectionFirst}
        data-section="SectionFirst" // data-section 속성을 사용하여 구분
      >
        <SectionFirst
          $isVisible={isSectionVisible.SectionFirst} // 현재 섹션이 화면에 보이는지 여부 전달
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

      {/* 다섯 번째 섹션 - 주식 기능 소개*/}
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
