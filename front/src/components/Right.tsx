import styled from 'styled-components';

export const Right = styled.div`
  /* min-width: 576px; */
  min-width: 25%;
  /* flex-shrink: 0; */
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;
