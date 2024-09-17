import FilterIcon from "./FilterIcon";
import { 
  RightsubTitleP, 
  RightTitleBottomCategoryDiv, 
  RightTitleBottomDiv, 
  RightTitleBottomFilterDiv, 
  RightTitleDiv, 
  RightTitleP, 
  RightTitleTopDiv} from "./styledComponent";

const RightTitle :React.FC =() => {
  return (
    <RightTitleDiv>
      <RightTitleTopDiv>
        <RightTitleP>스크랩 관리</RightTitleP>
      </RightTitleTopDiv>
      <RightsubTitleP>뉴스를 스크랩하고 스크랩한 뉴스를 관리할 수 있어요.</RightsubTitleP>
      <RightTitleBottomDiv>
        <RightTitleBottomCategoryDiv>
          <RightsubTitleP>전체</RightsubTitleP>
          <RightsubTitleP>시황 뉴스</RightsubTitleP>
          <RightsubTitleP>종목 뉴스</RightsubTitleP>
        </RightTitleBottomCategoryDiv>
        <RightTitleBottomFilterDiv>
          <FilterIcon />
          <RightsubTitleP>필터링</RightsubTitleP>
        </RightTitleBottomFilterDiv>
      </RightTitleBottomDiv>
    </RightTitleDiv>
  )
};

export default RightTitle;