import styled from 'styled-components';

const SummaryNewsWrapper = styled.div`
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
  position: fixed; /* 위치를 절대값으로 설정 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 정확히 중앙으로 이동 */
  z-index: 10; /* 다른 요소보다 위에 위치하도록 설정 */
`;

const SummaryNewsTitle = styled.div`
  display: flex;
  padding: 0.625rem 0rem;
  justify-content: center;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
`;

const SummaryNewsTitleText = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-family: Inter;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.875rem; /* 125% */
`;

const SummaryNewsBody = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;
`;

const SummaryNewsBodyText = styled.div`
  color: #828282;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.2; /* 19.2px */
  flex: 1 0 0;
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
  /* background-color: var(--black-01, rgba(26, 26, 26, 0.1)); */
  background-color: ${({ theme }) => theme.profileBackgroundColor};
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  cursor: pointer;
  border: none;

  &:hover {
    background-color: rgba(0, 109, 255, 0.8); /* hover 시 배경색 변경 */
    color: #ffffff; /* hover 시 글씨색 변경 */
    transition: background-color 0.3s ease; /* 부드러운 전환 효과 */
  }
`;

const ButtonText = styled.p`
  /* color: var(--Black, #1a1a1a); */
  color: ${({ theme }) => theme.profileColor};
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.2; /* 19.2px */
`;

const SummaryNewsModal: React.FC = () => {
  return <>
  </>;
};

export default SummaryNewsModal;
