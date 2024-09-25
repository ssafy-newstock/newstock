import styled from 'styled-components';

// 화살표 아이콘
export const StyledArrowIcon = styled.svg`
  width: 0.5rem;
  height: 1rem;
  fill: ${({ theme }) => theme.textColor};
`;

export const ArrowIcon = () => (
  <StyledArrowIcon
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 9 18"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.55354 1.1713L8.79654 8.4273C8.86174 8.4896 8.91347 8.56461 8.94856 8.64768C8.98365 8.73075 9.00134 8.82013 9.00054 8.9103C9.00094 9.0025 8.98313 9.09386 8.94812 9.17915C8.91311 9.26444 8.8616 9.34198 8.79654 9.4073C6.17654 11.9633 3.65154 14.4303 1.22154 16.8083C1.09654 16.9253 0.59654 17.2163 0.21054 16.7843C-0.17546 16.3513 0.0585399 15.9743 0.21054 15.8183L7.27854 8.9103L0.53154 2.1513C0.28554 1.81197 0.30554 1.49897 0.59154 1.2123C0.878207 0.925638 1.19887 0.911304 1.55354 1.1713Z"
    />
  </StyledArrowIcon>
);

// 태그 스타일링
export const NewsTag = styled.div`
  display: flex;
  padding: 0.3rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.3rem;
  background-color: #e0e0e0;
  color: #000;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  line-height: 1.875rem;
`;

// 북마크 스타일링
const UnbookmarkedIcon = styled.svg`
  cursor: pointer;
  &:hover path {
    fill: #006dff;
  }
`;
export const bookmarkedIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    style={{ cursor: 'pointer' }}
  >
    <path
      d="M7.5 31.5V7.5C7.5 6.675 7.794 5.969 8.382 5.382C8.97 4.795 9.676 4.501 10.5 4.5H25.5C26.325 4.5 27.0315 4.794 27.6195 5.382C28.2075 5.97 28.501 6.676 28.5 7.5V31.5L18 27L7.5 31.5Z"
      fill="#006DFF"
    />
  </svg>
);

export const unbookmarkedIcon = (
  <UnbookmarkedIcon
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
  >
    <path
      d="M7.5 31.5V7.5C7.5 6.675 7.794 5.969 8.382 5.382C8.97 4.795 9.676 4.501 10.5 4.5H25.5C26.325 4.5 27.0315 4.794 27.6195 5.382C28.2075 5.97 28.501 6.676 28.5 7.5V31.5L18 27L7.5 31.5ZM10.5 26.925L18 23.7L25.5 26.925V7.5H10.5V26.925Z"
      fill="#828282"
    />
  </UnbookmarkedIcon>
);
