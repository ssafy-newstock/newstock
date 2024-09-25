import styled from 'styled-components';

export const CenterDiv = styled.div`
  display: flex;
  padding: 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
`;

export const CenterTitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
`;

export const CenterTitleFontStyle = styled.p`
  font-size: 2rem;
  font-weight: 600;
`;

export const CenterMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  margin-top: 1.25rem;
`;

export const CenterMenuLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 3.125rem;
`;

export const SelectDateDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
`;

export const CenterHr = styled.hr`
  width: 100%;
  height: 0.1875rem;
  background-color: #828282;
`;

export const CenterTitleHr = styled.hr`
  width: 9%; /* 전체 너비로 설정 */
  height: 0.1875rem; /* 높이는 동일하게 유지 */
  background-color: #828282;
  margin-left: 0; /* 왼쪽 정렬 */
`;

export const CenterContentDiv = styled.div`
  width: 100%;
  flex-direction: column;
  padding: 0rem 0.125rem;
  margin: 1rem 0rem;
  align-items: flex-start;
  gap: 2rem;
  align-self: stretch;
`;

export const FontStyle = styled.p`
  color: #828282;
  font-size: 1rem;
  line-height: 1.875rem;
`;

export const CenterContentSectionBeforeDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0rem 1rem;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const CenterContentSection = styled.div`
  display: flex;
  padding: 0.9375rem 0.625rem;
  margin: 0.625rem 0rem 1.875rem 0rem;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 1.25rem;
  background: ${({ theme }) => theme.centerContentSectionBackgroundColor};
  overflow: auto;
`;

export const CenterContentSectionRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0rem 1rem;
  padding: 0.625rem 0.625rem;
`;

export const CenterContentSectionTitle = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0rem 0.625rem;
`;

export const CardContainer = styled.div`
  display: flex;
  padding: 0.375rem 0rem;
  width: 20.4375rem;
  height: 9.375rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
  border-radius: 1.25rem;
  background: ${({ theme }) => theme.newsBackgroundColor};
  box-shadow: 0rem 0.25rem 0.25rem 0rem rgba(0, 0, 0, 0.1);
`;

export const CardTitleFontStyle = styled.p`
  font-size: 1.375rem;
  line-height: 1.5625rem; /* 113.636% */
  margin: 0.625rem;
`;

export const CardContextDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;
  margin-left: 0.625rem;
`;

export const CardBottomContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'hasKeyword',
})<{ hasKeyword: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ hasKeyword }) =>
    hasKeyword ? 'space-between' : 'flex-end'};
  width: 100%;
`;

export const IconWrapper = styled.div`
  margin-left: auto; /* 아이콘을 오른쪽으로 밀기 위한 속성 */
  margin-right: 1.25rem;
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
`;

export const CardKeywordDiv = styled.div`
  display: flex;
  padding: 0.3125rem;
  margin-left: 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.625rem;
  background: ${({ theme }) => theme.buttonBackgroundColor};
`;

export const CardKeywordFontStyle = styled.p`
  color: #fff;
  font-size: 1.25rem;
  line-height: 1.875rem;
`;
