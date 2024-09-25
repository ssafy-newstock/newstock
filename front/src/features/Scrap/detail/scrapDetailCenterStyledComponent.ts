import styled from 'styled-components';

export const CenterTitleBottomDiv = styled.div`
  display: flex;
  width: 100%;
  padding: 0.3125rem 0rem;
  justify-content: space-between;
`;

export const CenterButtonDiv = styled.div`
  margin-right: 0.625rem;
`;

export const CenterContentDiv = styled.div`
  display: flex;
  width: 100%;
  padding: 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.875rem;
  align-self: stretch;
  border-radius: 1.25rem;
  background: ${({ theme }) => theme.centerContentSectionBackgroundColor};
`;

export const CenterNewsDiv = styled.div`
  display: flex;
  padding: 1.6rem 1.5rem;
  margin: 1.25rem 0;
  align-items: flex-start;
  justify-content: space-between;
  align-self: stretch;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 14rem;
  cursor: pointer;
`;

export const CenterNewsLeftDiv = styled.div`
  display: flex;
  width: 785px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export const CenterNewsLeftTopDiv = styled.div`
  display: flex;
  padding: 10px 0px;
  align-items: center;
  gap: 30px;
`;

export const CenterNewsRightImg = styled.img`
  width: 8.75rem;
  height: 8.75rem;
`;

export const CenterNewsRightDiv = styled.div`
  display: flex;
  width: 8.75rem;
  height: 8.75rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  background-color: #828282;
`;

export const CenterNewsContextDiv = styled.div`
  display: flex;
  width: 100%;
  padding: 0.9375rem 0.625rem;
  flex-direction: column;
  gap: 0.625rem;
  flex-wrap: wrap;
  border-radius: 1.25rem;
  box-shadow: 0rem 0.25rem 0.25rem 0rem rgba(0, 0, 0, 0.25);
  background: ${({ theme }) => theme.newsBackgroundColor};
`;
