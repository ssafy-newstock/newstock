import styled from 'styled-components';
import { PositiveIcon, PositiveIconText } from '@features/News/PNSubicon';

const EconomicNewsBody = styled.div`
  display: flex;
  /* width: 761px; */
  max-width: 72%;
  margin-right: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 10px 0px;
`;

const EconomicNewsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: stretch;
`;

const EconomicNewsTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  max-width: 100%;
  overflow: hidden;
`;

const EconomicNewsTitleText = styled.p`
  color: #0448a5;
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const EconomicNewsContent = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 최대 2줄까지만 표시 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; /* 말줄임표 적용 */
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  color: #828282;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 150% */
`;

const EconomicNewsFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 37px;
`;

const NewsCompanyText = styled.p`
  color: #828282;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px; /* 200% */
`;

const NewsDateText = styled.p`
  color: #828282;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px; /* 200% */
`;

interface EconNewsBodyProps {
  title: string;
  description: string;
  media: string;
  date: string;
}

const EconNewsBody: React.FC<EconNewsBodyProps> = ({
  title,
  description,
  media,
  date,
}) => {
  const formattedDate = date.split(' ')[0].replace(/-/g, '.');
  return (
    <EconomicNewsBody>
      <EconomicNewsHeader>
        <PositiveIcon>
          <PositiveIconText>긍정</PositiveIconText>
        </PositiveIcon>
        <EconomicNewsTitle>
          <EconomicNewsTitleText>{title}</EconomicNewsTitleText>
        </EconomicNewsTitle>
      </EconomicNewsHeader>
      <EconomicNewsContent>{description}</EconomicNewsContent>
      <EconomicNewsFooter>
        <NewsCompanyText>{media}</NewsCompanyText>
        <NewsDateText>{formattedDate}</NewsDateText>
      </EconomicNewsFooter>
    </EconomicNewsBody>
  );
};

export default EconNewsBody;
