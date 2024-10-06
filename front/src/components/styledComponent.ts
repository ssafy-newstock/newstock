import styled from 'styled-components';

export const DivTag = styled.div`
`;

export const Flex = styled.div`
  display: flex;
`;

export const FlexGap = styled.div<{ $gap: string }>`
  display: flex;
  gap: ${({ $gap }) => $gap};
`;

export const FlexGapEnd = styled(FlexGap)`
  align-items: flex-end;
`;

export const FlexGapStastCenter = styled(FlexGap)`
  justify-content: start;
  align-items: center;
`;

export const FlexGapColumn = styled(FlexGap)`
  flex-direction: column;
`;
export const FlexGapColumnCenter = styled(FlexGapColumn)`
  justify-content: center;
`;

export const FlexWrapBetween = styled(Flex)`
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const FlexBetween = styled(Flex)`
  justify-content: space-between;
`;

export const FlexCenter = styled(Flex)`
  justify-content: center;
  align-items: center;
`;

export const FlexAlignCenter = styled(Flex)`
  align-items: center;
`;

export const FlexBetweenStart = styled(FlexBetween)`
  align-items: flex-start;
`;

export const FlexBetweenEnd = styled(FlexBetween)`
  align-items: flex-end;
`;

export const FlexColumn = styled(Flex)`
  flex-direction: column;
`;