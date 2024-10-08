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
  height: 100%;
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
  padding: 1.5rem 1.5rem 0rem 1.5rem;
  align-items: flex-start;
  justify-content: space-between;
  align-self: stretch;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 12rem;
  cursor: pointer;
`;

export const CenterNewsLeftDiv = styled.div`
  display: flex;
  width: 85%;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
`;

export const CenterNewsLeftTopDiv = styled.div`
  display: flex;
  padding: 0.625rem 0rem 0rem 0rem;
  align-items: center;
  gap: 2rem;
`;

export const CenterNewsRightImg = styled.img`
  width: 9rem;
  height: 9rem;
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
  min-height: 30rem;
  padding: 1.5rem;
  flex-direction: column;
  gap: 0.625rem;
  flex-wrap: wrap;
  border-radius: 2rem;
  box-shadow: 0rem 0.25rem 0.25rem 0rem rgba(0, 0, 0, 0.1);
  background: ${({ theme }) => theme.newsBackgroundColor};
`;

export const CustomCenterNewsRightImg = styled.img`
  width: 8.75rem;
  height: 8.75rem;
  border-radius: 1rem;
  margin-right: 1rem;
  object-fit: cover;
`;

export const EconomicNewsTitleText = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 말줄임표 적용 */
  width: 80%; /* 텍스트가 영역을 벗어나지 않도록 조정 */
`;

export const EconomicNewsContent = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 최대 2줄까지만 표시 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; /* 말줄임표 적용 */
  justify-content: center;
  align-items: center;
  align-self: stretch;
  color: #828282;
  font-size: 1rem;
  line-height: 1.5rem;
  width: 90%;
`;

export const EconomicNewsFooter = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 2rem;
`;

export const FooterText = styled.p`
  color: #828282;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.9rem;
`;

export const MediaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const MediaLogo = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  object-fit: contain; /* 이미지 비율을 유지하면서 컨테이너 안에 맞춤 */
  border-radius: 50%;
`;
