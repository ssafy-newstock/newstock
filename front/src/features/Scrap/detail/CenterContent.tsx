import { TextP_20, TextP_24, TextP_24_NOTGRAY } from '../scrapStyledComponent';
import {
  CenterContentDiv,
  CenterNewsContextDiv,
  CenterNewsDiv,
  CenterNewsLeftDiv,
  CenterNewsLeftTopDiv,
  CenterNewsRightDiv,
} from './scrapDetailCenterStyledComponent';
// 더미 덩어리
const CenterContent: React.FC = () => {
  return (
    <CenterContentDiv>
      <CenterNewsDiv>
        <CenterNewsLeftDiv>
          <CenterNewsLeftTopDiv>
            <TextP_24_NOTGRAY>청년일보</TextP_24_NOTGRAY>
          </CenterNewsLeftTopDiv>
          <TextP_24_NOTGRAY>
            [청년 디지털 인재] “AI부터 빅데이터까지” 산업계, 디지털
          </TextP_24_NOTGRAY>
          <TextP_20>
            영입하기 위해 각고의 노력을 기울이고 있다. 기업들, 디지털 인재 육성
            ‘안간힘’ 해외 지원도 삼성전자의 SW아카데미(이하 SSAFY, 싸피)는
            디지털 인재 양성에 앞장선 대표적인 사례다.
          </TextP_20>
        </CenterNewsLeftDiv>
        <CenterNewsRightDiv></CenterNewsRightDiv>
      </CenterNewsDiv>
      <CenterNewsContextDiv>
        <TextP_24>
          오늘 코스피가 하락했다고 한다. 정준이는 코스피가 무엇인지 궁금해졌다.
          코스피 =
          한국종합주가지수(韓國綜合株價指數)는 한국거래소의 유가증권시장에
          상장된 회사들의 주식에 대한 총합인 시가총액의 기준시점과 비교시점을
          비교하여 나타낸 지표다. 원래 명칭은 종합주가지수였으나, 2005년 11월
          1일부터 현재 이름으로 바뀌어 사용되고 있다.
        </TextP_24>
      </CenterNewsContextDiv>
    </CenterContentDiv>
  );
};

export default CenterContent;
