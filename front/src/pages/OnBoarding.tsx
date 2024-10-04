import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAuthStore from '@store/useAuthStore';
import SectionFirst from '@features/Oboading/SectionFirst';
import SectionGo from '@features/Oboading/SectionGo';
import SectionNews from '@features/Oboading/SectionNews';
import SectionStock from '@features/Oboading/SectionStock';

const Container = styled.div`
  width: 100%;
`;

const OnBoardingPage = () => {
  const { isLogin } = useAuthStore();
  const navigate = useNavigate();

  const [isSectionVisible, setIsSectionVisible] = useState({
    SectionFirst: false,
    sectionGo: false,
    SectionNews: false,
    SectionStock: false,
  });

  const sectionRefs = {
    SectionFirst: useRef<HTMLDivElement | null>(null),
    sectionGo: useRef<HTMLDivElement | null>(null),
    SectionNews: useRef<HTMLDivElement | null>(null),
    SectionStock: useRef<HTMLDivElement | null>(null),
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

  return (
    <Container>
      <SectionFirst
        isVisible={isSectionVisible.SectionFirst}
        sectionRef={sectionRefs.SectionFirst}
      />
      <SectionGo
        isVisible={isSectionVisible.sectionGo}
        sectionRef={sectionRefs.sectionGo}
      />
      <SectionNews
        isVisible={isSectionVisible.SectionNews}
        sectionRef={sectionRefs.SectionNews}
      />
      <SectionStock
        isVisible={isSectionVisible.SectionStock}
        sectionRef={sectionRefs.SectionStock}
      />
    </Container>
  );
};

export default OnBoardingPage;
