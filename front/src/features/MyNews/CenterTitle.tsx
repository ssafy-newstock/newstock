import CalendarIcon from '@features/MyNews/CalendarIcon';
import 'react-datepicker/dist/react-datepicker.css';

import {
  CenterMenu,
  CenterMenuLeft,
  CenterTitleDiv,
  CenterTitleFontStyle,
  FontStyle,
  SelectDateDiv,
} from './styledComponent';

const CenterTitle: React.FC = () => {
  return (
    <CenterTitleDiv>
      <CenterTitleFontStyle>저장한 뉴스</CenterTitleFontStyle>
      <FontStyle>중요한 뉴스를 저장하고 관리하고 관리할 수 있어요.</FontStyle>
      <CenterMenu>
        <CenterMenuLeft>
          <FontStyle>전체</FontStyle>
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
