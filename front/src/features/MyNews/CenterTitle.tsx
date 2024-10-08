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
import { ko } from 'date-fns/locale';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MoreInfoTextWrapper = styled.div`
  display: flex;
  padding: 0.5rem 0;
  align-items: center;
  gap: 0.3rem;
  margin-left: auto; /* 오른쪽 끝으로 밀림 */
`;

const MoreInfoSVG = styled.div`
  width: 0.5rem;
  height: 1rem;

  svg {
    fill: ${({ theme }) => theme.textColor}; /* 여기서 theme.textColor로 설정 */
  }
`;

const CenterTitle: React.FC<{
  onDateRangeChange: (dates: [Date | null, Date | null]) => void;
}> = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const navigate = useNavigate();

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

  const handleMoreInfoClick = () => {
    navigate(`../scrap-detail`);
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
              locale={ko}
            />
          </SelectDateDiv>
        </CenterMenuLeft>
        <MoreInfoTextWrapper
          onClick={handleMoreInfoClick}
          style={{ cursor: 'pointer' }}
        >
          <FontStyle>더보기</FontStyle>
          <MoreInfoSVG>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="17"
              viewBox="0 0 9 18"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.55305 1.1713L8.79605 8.4273C8.86125 8.4896 8.91298 8.56461 8.94807 8.64768C8.98316 8.73075 9.00085 8.82013 9.00005 8.9103C9.00045 9.0025 8.98264 9.09386 8.94763 9.17915C8.91262 9.26444 8.86111 9.34198 8.79605 9.4073C6.17605 11.9633 3.65105 14.4303 1.22105 16.8083C1.09605 16.9253 0.596052 17.2163 0.210052 16.7843C-0.175948 16.3513 0.0580517 15.9743 0.210052 15.8183L7.27805 8.9103L0.531052 2.1513C0.285052 1.81197 0.305052 1.49897 0.591052 1.2123C0.877718 0.925638 1.19838 0.911304 1.55305 1.1713Z"
                fill="#828282"
              />
            </svg>
          </MoreInfoSVG>
        </MoreInfoTextWrapper>
      </CenterMenu>
    </CenterTitleDiv>
  );
};

export default CenterTitle;
