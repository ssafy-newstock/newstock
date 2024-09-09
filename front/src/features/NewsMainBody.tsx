import React from 'react';
import styled from 'styled-components';

const NewsBodyOuterWrapper = styled.div`
  display: flex;
  padding: 19px 4px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const NewsBodyInnerWrapper = styled.div`
  display: flex;
  width: 334px;
  padding: 13px 14px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const NewsBody = styled.div`
  display: flex;
  padding: 1px 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  align-self: stretch;
`;

const NewsBodyHeaderWrapper = styled.div`
  display: flex;
  width: 294px;
  align-items: flex-start;
`;

const NewsBodyHeaderText = styled.div`
  color: #828282;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 187.5% */
`;

const NewsBodyTitleWrapper = styled.div`
  display: flex;
  width: 299px;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
`;

const NewsBodyTitleText = styled.div`
  width: 299px;
  height: 64px;
  flex-shrink: 0;
  color: #1a1a1a;
  font-family: Inter;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px; /* 아이콘 크기에 맞춰 수정 */
  text-indent: 25px;
`;

const PositiveIcon = styled.div`
  display: flex;
  width: 50px;
  height: 26px;
  padding: 5px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: absolute;
  top: 5px;
  border-radius: 20px;
  border: 1px solid #ea1212;
`;

const PositiveIconText = styled.div`
  display: flex;
  width: 23px;
  height: 16px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #e31837;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 250% */
`;

const NewsBodyContentWrapper = styled.div`
  display: flex;
  width: 290px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const NewsBodyContentText = styled.div`
  width: 275px;
  flex-shrink: 0;
  color: #828282;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px; /* 166.667% */
`;

const NewsBodyFooterWrapper = styled.div`
  display: flex;
  padding: 0px 10px;
  align-items: center;
  gap: 12px;
`;

const NewsBodyFooterWriter = styled.div`
  color: #828282;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 166.667% */
`;

const LineSVG = styled.div`
  width: 1.5px;
  height: 22px;
  background: #e0e0e0;
`;

const NewsBodyFooterDate = styled.div`
  color: #828282;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 166.667% */
`;

const NewsMainBody: React.FC = () => {
  return (
    <NewsBodyOuterWrapper>
      <NewsBodyInnerWrapper>
        <NewsBody>
          <NewsBodyHeaderWrapper>
            <NewsBodyHeaderText>벤처/스타트업</NewsBodyHeaderText>
          </NewsBodyHeaderWrapper>
          <NewsBodyTitleWrapper>
            <NewsBodyTitleText>
              {/* 아이콘의 너비만큼의 공백을 추가하기 위해 &nbsp; 사용 */}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [청년 디지털 인재] “AI부터
              빅데이터까지” 산업계...
            </NewsBodyTitleText>
            <PositiveIcon>
              <PositiveIconText>긍정</PositiveIconText>
            </PositiveIcon>
          </NewsBodyTitleWrapper>
          <NewsBodyContentWrapper>
            <NewsBodyContentText>
              영입하기 위해 각고의 노력을 기울이고 있다. 특히, 광주 2반 207조
              조장 박선홍은 장관상 2회에 빛나는 인재로써 각 대기업..
            </NewsBodyContentText>
          </NewsBodyContentWrapper>
          <NewsBodyFooterWrapper>
            <NewsBodyFooterWriter>청년일보</NewsBodyFooterWriter>
            <LineSVG />
            <NewsBodyFooterDate>2024.08.18</NewsBodyFooterDate>
          </NewsBodyFooterWrapper>
        </NewsBody>
      </NewsBodyInnerWrapper>
    </NewsBodyOuterWrapper>
  );
};

export default NewsMainBody;
