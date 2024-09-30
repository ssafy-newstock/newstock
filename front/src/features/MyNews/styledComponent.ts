import styled from 'styled-components';

export const CenterDiv = styled.div`
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
  position: relative;
  display: flex;
  width: 100%;
  overflow-x: auto; /* 수평 스크롤을 활성화 */
  padding: 0.9375rem 2rem;
  margin: 0.625rem 0rem 1.875rem 0rem;
  flex-direction: row; /* 수평으로 자식 요소를 나열 */
  align-items: flex-start;
  border-radius: 1.25rem;
  background: ${({ theme }) => theme.centerContentSectionBackgroundColor};
  white-space: nowrap; /* 자식 요소가 한 줄로 나열되도록 함 */
  scroll-behavior: smooth; /* 부드러운 스크롤 */

  /* 스크롤바를 숨기고 싶다면 아래를 추가 */
  &::-webkit-scrollbar {
    display: none;
  }
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
  width: 20rem;
  height: 9.375rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
  border-radius: 1.25rem;
  background: ${({ theme }) => theme.newsBackgroundColor};
  box-shadow: 0rem 0.25rem 0.25rem 0rem rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
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

// 왼쪽 버튼
export const NewsSectionButtonLeft = styled.button`
  position: absolute;
  left: 0;
  top: 50%; // 상단에서 50%로 위치 설정
  transform: translateY(-50%); // 중앙 정렬
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto; // height는 100%가 아닌 auto로
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1;
`;

// 오른쪽 버튼
export const NewsSectionButtonRight = styled.button`
  position: absolute;
  right: 0;
  top: 50%; // 상단에서 50%로 위치 설정
  transform: translateY(-50%); // 중앙 정렬
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto; // height는 100%가 아닌 auto로
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1;
`;
