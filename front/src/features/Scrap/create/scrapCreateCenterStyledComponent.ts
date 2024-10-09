import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const ConterTitleDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
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

export const CenterContentTopDiv = styled.div`
  display: flex;
  width: 100%;
  padding: 0.3125rem;
  justify-content: space-between;
  align-items: flex-start;
`;

export const CenterCotainer = styled.div`
  width: 100%;
`;

export const CenterContentNewsDiv = styled.div`
  display: flex;
  width: 100%;
  height: 202px;
  padding: 3rem 0rem;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border: 2px dashed ${({ theme }) => theme.textColor};
`;

export const MyBlock = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 20px;
  border-radius: 0.625rem;
  background: ${({ theme }) => theme.centerContentSectionBackgroundColor};
  width: 100%;
`;

export const CenterGlobalStyle = createGlobalStyle`
  /* 에디터 툴바 */
  .rdw-editor-toolbar {
    background: ${({ theme }) => theme.centerContentSectionBackgroundColor};
    border: none;
    border-radius: 0.625rem;
    padding: 0.625rem;
    margin-bottom: 0.625rem;
    border: 1px solid #ccc;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  /* 드롭다운 컨테이너 */
  .rdw-dropdown-wrapper {
    background: ${({ theme }) => theme.centerContentSectionBackgroundColor};
    z-index: 1000 !important;
    position: relative !important;
    border-radius: 4px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #ccc;
  }

  /* 드롭다운 옵션 메뉴 */
  .rdw-dropdown-optionwrapper {
    background : ${({ theme }) => theme.centerContentSectionBackgroundColor};
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 5px;
    z-index: 1001;
    &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  .rdw-colorpicker-modal {
  background : ${({ theme }) => theme.centerContentSectionBackgroundColor};
  }
  }
  .rdw-block-dropdown {
  background : ${({ theme }) => theme.centerContentSectionBackgroundColor};
  }
  /* 드롭다운에서의 개별 옵션 스타일 */
  .rdw-option-wrapper {
    border: none;
    padding: 0.3125rem;
    border-radius: 4px;
    margin-right: 0.5rem;
    border: 1px solid #ccc;
    background: ${({ theme }) => theme.centerContentSectionBackgroundColor};
  }
  .rdw-option-wrapper img {
    filter: ${({ theme }) =>
      theme.textColor === '#A9ACBB'
        ? 'invert(100%)'
        : 'invert(0) brightness(1)'};
  }

  .rdw-dropdown-selectedtext img {
    filter: ${({ theme }) =>
      theme.textColor === '#A9ACBB'
        ? 'invert(100%)'
        : 'invert(0) brightness(1)'};
  }
  .rdw-dropdown-selectedtext span {
  color : ${({ theme }) => theme.editorTextColor};
  }
  /* 드롭다운 옵션이 활성화될 때 */
  .rdw-option-active {
    background-color: ${({ theme }) => theme.activeOptionBackgroundColor}; /* 활성화된 옵션 배경색 */
    color: ${({ theme }) => theme.activeOptionTextColor}; /* 활성화된 옵션 텍스트 색상 */
  }

  /* 드롭다운 옵션에 마우스를 올렸을 때 */
  .rdw-option-wrapper:hover {
    background-color: ${({ theme }) => theme.hoverOptionBackgroundColor}; /* 마우스 오버시 배경색 */
    color: ${({ theme }) => theme.hoverOptionTextColor}; /* 마우스 오버시 텍스트 색상 */
  }

  /* 에디터 본문 */
  .rdw-editor-main {
    min-height: 400px;
    border-radius: 0.625rem;
    padding : 0.5rem;
    border: 1px solid #ccc;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    background: ${({ theme }) => theme.editorBackgroundColor}; /* 에디터 배경색 */
    color: ${({ theme }) => theme.editorTextColor}; /* 에디터 텍스트 색상 */
    cursor: text;
  }

  .public-DraftStyleDefault-block,
  .public-DraftStyleDefault-ltr {
    margin: 0.5rem !important; /* 마진 제거 */
  }
  /* 에디터 전체 감싸는 wrapper */
  .rdw-editor-wrapper {
    overflow: visible !important;
  }

  .rdw-editor-main h1 {
  font-size: 2em;
  font-weight: bold;
}

.rdw-editor-main h2 {
  font-size: 1.5em;
  font-weight: bold;
}

.rdw-editor-main h3 {
  font-size: 1.25em;
  font-weight: bold;
}
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem; /* 글자 크기 24px에 해당 */
  font-weight: bold;
  color: ${({ theme }) => theme.textColor}; /* 테마에 맞는 텍스트 색상 */
  background-color: ${({ theme }) => theme.centerContentSectionBackgroundColor};
  border: 2px solid ${({ theme }) => theme.grayTextColor}; /* 기본 회색 테두리 */
  border-radius: 0.5rem; /* 약간 둥근 모서리 */
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.textColor}; /* 테마에 맞는 placeholder 색상 */
    opacity: 0.8; /* placeholder 투명도 */
  }
  /* 포커스 시 스타일 */
  &:focus {
    border-color: ${({ theme }) =>
      theme.highlightColor}; /* 포커스 시 하이라이트 색상 */
    box-shadow: 0 0 5px ${({ theme }) => theme.highlightColor}; /* 포커스 시 외곽선 강조 */
  }

  /* 비활성화 상태 */
  &:disabled {
    background-color: ${({ theme }) => theme.grayTextColor};
    color: ${({ theme }) => theme.textColor};
    cursor: not-allowed;
  }
`;

export const CenterNewsDiv = styled.div`
  display: flex;
  width: 100%;
  padding: 1.5rem;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.3125rem;
  align-self: stretch;
  border-radius: 1.25rem;
  box-shadow: 0rem 0.25rem 0.25rem 0rem rgba(0, 0, 0, 0.25);
  background: ${({ theme }) => theme.newsBackgroundColor};
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
  padding: 0px 10px;
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
