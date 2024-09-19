import CalendarIcon from './CalendarIcon';
import 'react-datepicker/dist/react-datepicker.css';

import {
  CenterMenu,
  CenterMenuLeft,
  CenterTitleDiv,
  CenterTitleFontStyle,
  FontStyle,
  SelectDateDiv,
} from './styledComponent';
import { useState } from 'react';

const CenterTitle: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // 선택한 날짜 상태
  const [isCalendarVisible, setIsCalendarVisible] = useState(false); // 캘린더 토글 상태

  // SelectDateDiv 클릭 시 캘린더 보이기/숨기기
  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  return (
    <CenterTitleDiv>
      <CenterTitleFontStyle>저장한 뉴스</CenterTitleFontStyle>
      <FontStyle>
        중요한 뉴스를 저장하고 관리하세요. 원하는 뉴스 그룹을 선택하고 관리할 수
        있어요.
      </FontStyle>
      <CenterMenu>
        <CenterMenuLeft>
          <FontStyle>조회기간</FontStyle>
          <SelectDateDiv>
            <CalendarIcon />
            <FontStyle>24.08.01 ~ 24.08.31</FontStyle>
          </SelectDateDiv>
        </CenterMenuLeft>
      </CenterMenu>
    </CenterTitleDiv>
  );
};

export default CenterTitle;
