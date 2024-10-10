import { TextP_16, TitleP_15 } from '@features/Scrap/scrapStyledComponent';
import { CalendarIcon } from '@features/Scrap/create/Icon';
import {
  RightTitleBottomDiv,
  RightTitleBottomFilterDiv,
  RightTitleTopDiv,
} from '@features/Scrap/create/scrapCreateRightStyledComponent';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import styled from 'styled-components';

const TitleDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  /* gap: 0.625rem; */
  align-self: stretch;
`;

const RightTitle: React.FC<{
  onDateRangeChange: (dates: [Date | null, Date | null]) => void;
}> = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isVisible] = useState<boolean>(false); // 상태를 추가

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

  return (
    <TitleDiv>
      <RightTitleTopDiv>
        <TitleP_15>관심 뉴스</TitleP_15>
        {/* <GoIcon /> */}
      </RightTitleTopDiv>
      <RightTitleBottomDiv>
        {isVisible && (
          <>
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
          </>
        )}
      </RightTitleBottomDiv>
    </TitleDiv>
  );
};

export default RightTitle;
