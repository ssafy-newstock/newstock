import { useNavigate } from 'react-router-dom';
import {
  TextP_16,
  TextP_20_bold,
  TitleDiv,
} from '@features/Scrap/scrapStyledComponent';
import { CalendarIcon, GoIcon } from '@features/Scrap/create/Icon';
import {
  RightTitleBottomDiv,
  RightTitleBottomFilterDiv,
  RightTitleTopDiv,
} from '@features/Scrap/create/scrapCreateRightStyledComponent';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';

const RightTitle: React.FC<{
  onDateRangeChange: (dates: [Date | null, Date | null]) => void;
}> = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateChange = (dates: [Date | null, Date | null] | null) => {
    const [start, end] = dates || [null, null];
    setStartDate(start);
    setEndDate(end);
    onDateRangeChange([start, end]); // 부모 컴포넌트에 선택된 날짜 범위를 전달
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    onDateRangeChange([null, null]); // 날짜 선택 초기화
  };

  const CustomInput = React.forwardRef<
    HTMLDivElement,
    { value?: string; onClick?: () => void }
  >(({ value, onClick }, ref) => (
    <div
      onClick={onClick}
      ref={ref}
      style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
    >
      <div style={{ marginRight: '0.5rem' }}>
        <CalendarIcon />
      </div>
      <TextP_16>{value || '기간 선택'}</TextP_16>
    </div>
  ));

  const navigate = useNavigate();

  // Navigate to saved news page
  const handleGoIconClick = () => {
    navigate('/my-news');
  };

  return (
    <TitleDiv>
      <RightTitleTopDiv
        onClick={handleGoIconClick}
        style={{ cursor: 'pointer' }}
      >
        <TextP_20_bold>저장한 뉴스</TextP_20_bold>
        <GoIcon />
      </RightTitleTopDiv>
      <RightTitleBottomDiv>
        <TextP_16 onClick={handleReset} style={{ cursor: 'pointer' }}>
          전체
        </TextP_16>
        <RightTitleBottomFilterDiv style={{ cursor: 'pointer' }}>
          <DatePicker
            selected={startDate || undefined}
            onChange={handleDateChange} // 날짜 범위 선택
            startDate={startDate || undefined}
            endDate={endDate || undefined}
            selectsRange
            dateFormat="yyyy.MM.dd"
            shouldCloseOnSelect={false}
            customInput={<CustomInput />} // 사용자 정의 입력 컴포넌트
            locale={ko} // 한국어 로케일 설정
          />
        </RightTitleBottomFilterDiv>
      </RightTitleBottomDiv>
    </TitleDiv>
  );
};

export default RightTitle;
