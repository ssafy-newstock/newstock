import ThemedButton from '@components/ThemedButton';
import { CalendarIcon } from '@features/Scrap/detail/Icon';
import {
  RightTitleBottomDiv,
  RightTitleBottomFilterDiv,
  RightTitleTopDiv,
} from '@features/Scrap/detail/scrapDetailRightStyledComponent';
import { useNavigate } from 'react-router-dom';
import {
  TextP_16,
  TitleDiv,
  TitleP,
} from '@features/Scrap/scrapStyledComponent';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

const RightTitle: React.FC<{
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
      <TextP_16>{value || '기간 선택'}</TextP_16>{' '}
    </div>
  ));
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate('/scrap-create');
  };

  return (
    <TitleDiv>
      <RightTitleTopDiv>
        <TitleP>스크랩 관리</TitleP>
        <ThemedButton onClick={handleCreateClick}>스크랩 만들기</ThemedButton>
      </RightTitleTopDiv>
      <TextP_16>뉴스를 스크랩하고 스크랩한 뉴스를 관리할 수 있어요.</TextP_16>
      <RightTitleBottomDiv>
        <TextP_16 onClick={handleReset} style={{ cursor: 'pointer' }}>
          전체
        </TextP_16>
        <RightTitleBottomFilterDiv style={{ cursor: 'pointer' }}>
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
        </RightTitleBottomFilterDiv>
      </RightTitleBottomDiv>
    </TitleDiv>
  );
};

export default RightTitle;
