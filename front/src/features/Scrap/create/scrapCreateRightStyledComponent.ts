import styled from 'styled-components';

export const RightTitleTopDiv = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;
`;

export const RightTitleBottomDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  gap: 2rem;
  align-items: center;
  margin-top: 0.5rem;
`;

export const RightTitleBottomFilterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
`;

export const RightNewsCardDiv = styled.div`
  display: flex;
  padding: 0.9375rem 0.625rem 0rem 0.625rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
  border-radius: 1.25rem;
  background: ${({ theme }) => theme.newsBackgroundColor};
  box-shadow: 0rem 0.25rem 0.25rem 0rem rgba(0, 0, 0, 0.25);
`;

export const RightNewsCardBottomDiv = styled.div`
  display: flex;
  height: 3.75rem;
  padding: 0.625rem 0rem;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const RightNewsCardTagDiv = styled.div`
  display: flex;
  padding: 0.313rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.3rem;
  background: ${({ theme }) => theme.buttonBackgroundColor};
`;

export const RightNewsCardTagP = styled.p`
  color: ${({ theme }) => theme.buttonTextColor};
  padding: 0.3125rem;
  font-size: 1rem;
  /* line-height: 1.875rem;  */
`;
