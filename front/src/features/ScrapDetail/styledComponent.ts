import styled from 'styled-components';

export const RightTitleDiv = styled.div`
  display: flex;
  width: 100%;
  padding: 1.5625rem 0rem;
  margin: 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3125rem;
  align-self: stretch;
  border-bottom: 0.25rem solid;
`
export const RightTitleTopDiv = styled.div`
  display: flex;
  padding: 0.3125rem 0rem;
  justify-content: space-between;
  align-items: flex-start;
`

export const RightTitleBottomDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.625rem;
`

export const RightTitleBottomCategoryDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`

export const RightTitleBottomFilterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
`

export const RightTitleP = styled.p`
  // color: ${({ theme }) => theme.textColor};
  font-size: 2rem;
  // line-height: 1.875rem; 
`

export const RightsubTitleP = styled.p`
  color: #828282;
  font-size: 1rem;
  // line-height: 1.875rem; /* 187.5% */
`

export const ScrapCardContainerDiv = styled.div`
  display: flex;
  padding: 15px 10px;
  align-items: flex-start;
  align-content: flex-start;
  gap: 0px 22px;
  align-self: stretch;
  flex-wrap: wrap;
`