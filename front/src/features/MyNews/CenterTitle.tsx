import React, { useState } from 'react';
import CalendarIcon from '@features/MyNews/CalendarIcon';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  CenterMenu,
  CenterMenuLeft,
  CenterTitleDiv,
  CenterTitleFontStyle,
  FontStyle,
  SelectDateDiv,
} from './styledComponent';

const CenterTitle: React.FC<{
  onDateRangeChange: (dates: [Date | null, Date | null]) => void;
}> = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    onDateRangeChange(dates); // 부모 컴포넌트에 선택된 날짜 범위를 전달
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    onDateRangeChange([null, null]); // 날짜 선택 초기화
  };

  // Custom input to display both CalendarIcon and selected date range
  const CustomInput = React.forwardRef(({ value, onClick }: any, ref: any) => (
    <div
      onClick={onClick}
      ref={ref}
      style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
    >
      <div style={{ marginRight: '0.5rem' }}>
        <CalendarIcon />
      </div>
      <FontStyle>{value || '기간 선택'}</FontStyle>{' '}
    </div>
  ));

  return (
    <CenterTitleDiv>
      <CenterTitleFontStyle>저장한 뉴스</CenterTitleFontStyle>
      <FontStyle>중요한 뉴스를 저장하고 관리할 수 있어요.</FontStyle>
      <CenterMenu>
        <CenterMenuLeft>
          {/* 전체 버튼: 클릭 시 필터 초기화 */}
          <FontStyle onClick={handleReset} style={{ cursor: 'pointer' }}>
            전체
          </FontStyle>

          {/* 캘린더 드롭다운 */}
          <SelectDateDiv style={{ cursor: 'pointer' }}>
            <DatePicker
              selected={startDate || undefined} // null 대신 undefined로 변환
              onChange={handleDateChange}
              startDate={startDate || undefined} // null 대신 undefined로 변환
              endDate={endDate || undefined} // null 대신 undefined로 변환
              selectsRange
              dateFormat="yyyy.MM.dd"
              shouldCloseOnSelect={false}
              customInput={<CustomInput />}
            />
          </SelectDateDiv>
        </CenterMenuLeft>
      </CenterMenu>
    </CenterTitleDiv>
  );
};

export default CenterTitle;
