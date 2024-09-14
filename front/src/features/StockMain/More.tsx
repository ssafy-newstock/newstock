import styled from "styled-components";
import { Text } from "@features/StockMain/styledComponent";
import { RightArrow } from "@features/StockMain/RightArrow";
import { useNavigate } from "react-router-dom";
import { IMore } from "@features/StockMain/type";

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

const More: React.FC<IMore> = ({path}) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(path);
  }
  return (
    <MoreWrapper onClick={handleNavigate}>
      <Text>더보기</Text>
      <RightArrow/>
    </MoreWrapper>
  )
};

export default More;