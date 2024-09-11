import styled from 'styled-components';

export const CenterDiv = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

export const CenterTitleDiv = styled.div`
  display: flex;
  padding-top: 25px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

export const CenterTitleFontStyle = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px;
`;

export const CenterMenu = styled.div`
  display: flex;
  padding: 5px 10px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const CenterMenuLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;

export const SelectDateDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const CenterHr = styled.hr`
  width: 100%;
  height: 3px;
  background: #000;
`;

export const CenterContentDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 2px;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  overflow: auto;
`;

export const FontStyle = styled.p`
  color: #828282;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
`;

export const CenterContentSection = styled.div`
  display: flex;
  padding: 15px 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 20px;
  background: ${({ theme }) => theme.centerContentSectionBackgroundColor};
`;

export const CenterContentSectionTitle = styled.p`
  color: ${({ theme }) => theme.textColor};
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 150% */
`;

export const CardContainer = styled.div`
  display: flex;
  padding: 6px 0px;
  width: 327px;
  height: 150px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 20px;
  background: ${({ theme }) => theme.newsBackgroundColor};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const CardTitleFontStyle = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-family: Inter;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px; /* 113.636% */
  margin: 10px;
`;

export const CardContextDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  margin-left: 10px;
`;

export const CardBottomContainer = styled.div<{ hasKeyword: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ hasKeyword }) =>
    hasKeyword ? 'space-between' : 'flex-end'};
  width: 100%;
`;

export const IconWrapper = styled.div`
  margin-left: auto; /* 아이콘을 오른쪽으로 밀기 위한 속성 */
  margin-right: 20px;
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
`;

export const CardKeywordDiv = styled.div`
  display: flex;
  padding: 5px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: #81b5fc;
  margin-left: 10px;
`;

export const CardKeywordFontStyle = styled.p`
  color: #fff;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 150% */
`;
