import styled from 'styled-components';

export const CenterDiv = styled.div`
  height: 100%;
  padding: 1rem;
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
  font-size: 1.5rem;
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
`;

export const CenterContentDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  margin: 1rem 0rem;
  align-items: flex-start;
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
  align-items: flex-start;
  justify-content: flex-start;
`;

export const CenterContentSection = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  padding: 0.9375rem 1rem;
  margin: 0.625rem 0rem 1.875rem 0rem;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 1rem;
  background: ${({ theme }) => theme.centerContentSectionBackgroundColor};
`;

export const CenterContentSectionDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(20rem, 1fr)
  ); /* 그리드 형식으로 카드 배치 */
  gap: 1rem;
  width: 100%;
  padding: 0.625rem;
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
  width: 20rem;
  height: 10rem; /* 모든 카드의 높이를 일정하게 유지 */
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
  border-radius: 1.25rem;
  background: ${({ theme }) => theme.newsBackgroundColor};
  box-shadow: 0rem 0.25rem 0.25rem 0rem rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  overflow: hidden; /* 내용이 넘치면 잘리도록 설정 */
`;

export const CardTitleFontStyle = styled.p`
  font-size: 1.375rem;
  line-height: 1.5625rem;
  margin: 0.625rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  width: calc(100% - 1.25rem); /* 부모 padding을 고려해 너비 조정 */
  box-sizing: border-box;
`;

export const CardContextDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;
  margin-left: 0.625rem;
`;

export const CardBottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

export const NewsSectionContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
`;
