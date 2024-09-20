import styled from 'styled-components';
import { Text } from '@features/Stock/styledComponent';
import { RightArrow } from '@features/Stock/RightArrow';
// import { IMore } from "@features/Stock/types";

interface MoreProps {
  handlClick: () => void;
}

const MoreWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0rem 2.5rem;
  gap: 0.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.textColor};
`;

const More: React.FC<MoreProps> = ({ handlClick }) => {
  return (
    <MoreWrapper>
      <Text onClick={handlClick} style={{cursor:'pointer'}}>더보기</Text>
      <RightArrow />
    </MoreWrapper>
  );
};

export default More;
