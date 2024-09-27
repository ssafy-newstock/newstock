import styled from 'styled-components';
import { PositiveIcon, PositiveIconText } from '@features/News/PNSubicon';

const EconomicNewsBody = styled.div`
  display: flex;
  /* max-width: 72%; */
  width: 72%;
  margin-right: 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
`;

const EconomicNewsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
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
  color: ${({ theme }) => theme.highlightColor};
  font-family: Inter;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EconomicNewsContent = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 최대 2줄까지만 표시 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; /* 말줄임표 적용 */
  justify-content: center;
  align-items: center;
  align-self: stretch;
  color: #828282;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem;
`;

const EconomicNewsFooter = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 2rem;
`;

const FooterText = styled.p`
  color: #828282;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.9rem;
`;

interface EconNewsBodyProps {
  title: string;
  content: string;
  media: string;
  date: string;
}

const EconNewsBody: React.FC<EconNewsBodyProps> = ({
  title,
  content,
  media,
  date,
}) => {
  const formattedDate = date?.split(' ')[0].replace(/-/g, '.') || '날짜 불명';
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

      <EconomicNewsContent>{content}</EconomicNewsContent>

      <EconomicNewsFooter>
        <FooterText>{media}</FooterText>
        <FooterText>{formattedDate}</FooterText>
      </EconomicNewsFooter>
    </EconomicNewsBody>
  );
};

export default EconNewsBody;
