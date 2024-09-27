import styled from 'styled-components';
import StockTable from '@features/Etc/StockTable';
import StockChart from '@features/Etc/StockChart';
import { DailyReportText } from '@pages/Etc/DailyReport';

const KospiWrapper = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
`;

const KospiTextWrapper = styled.div`
  padding: 10px;
  align-self: stretch;
`;

const KospiGraphWrapper = styled.div`
  height: 412px;
  padding: 24px;
  align-self: stretch;
  border: 1px solid var(--Apex-Grey-200, #bbc5ca);
  background-color: var(--Apex-White-100, #fff);

  /* Shadows/Drop Shadow 2 */
  box-shadow: 0px 3px 8px 0px rgba(34, 34, 34, 0.24);
`;

const Kospi: React.FC = () => {
  return (
    <>
      <KospiWrapper>
        <KospiTextWrapper>
          <DailyReportText fontSize="32px" fontWeight="500">
            코스피(KOSPI) 지수
          </DailyReportText>
        </KospiTextWrapper>
        <KospiGraphWrapper>
          <StockChart />
        </KospiGraphWrapper>
        <StockTable />
      </KospiWrapper>
    </>
  );
};

export default Kospi;
