import CenterTitle from '@features/MyNews/CenterTitle';
import CenterContent from '@features/MyNews/CenterContent';
import { CenterDiv, CenterHr } from '@features/MyNews/styledComponent';
import { Center } from '@components/Center';
import { useState } from 'react';
import styled from 'styled-components';

const CustomCenterDiv = styled(CenterDiv)`
  min-width: 50rem;
`

const MyNewsPage = () => {
  const [selectedDateRange, setSelectedDateRange] = useState<
    [Date | null, Date | null]
  >([null, null]);

  // 날짜 범위 변경 핸들러
  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    setSelectedDateRange(dates);
  };

  return (
    <>
      <Center>
        <CustomCenterDiv>
          {/* handleDateRangeChange를 통해 CenterTitle에서 선택한 날짜 범위를 가져옴 */}
          <CenterTitle onDateRangeChange={handleDateRangeChange} />
          <CenterHr />
          {/* CenterContent에 선택된 날짜 범위를 props로 전달 */}
          <CenterContent selectedDateRange={selectedDateRange} />
        </CustomCenterDiv>
      </Center>
    </>
  );
};

export default MyNewsPage;
