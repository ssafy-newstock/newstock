import styled from "styled-components";
import { Text } from "@features/Stock/styledComponent";
import { RightArrow } from "@features/Stock/RightArrow";
// import { IMore } from "@features/Stock/types";

interface MoreProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const MoreWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0rem 2.5rem;
  gap: 0.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
`;

const More: React.FC<MoreProps> = ({onClick}) => {
  return (
    <MoreWrapper onClick={onClick}>
      <Text>더보기</Text>
      <RightArrow/>
    </MoreWrapper>
  )
};

export default More;