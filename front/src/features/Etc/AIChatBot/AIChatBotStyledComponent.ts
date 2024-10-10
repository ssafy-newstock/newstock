import styled from 'styled-components';

export const ChatCenter = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

export const DateWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  cursor: pointer;
`;

export const ChatOuterWrapper = styled.div`
  width: 100%;
  max-width: 106rem;
  height: 95%;
  display: flex;
  padding: 0.94rem 1.25rem;
  margin: 1.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 1.875rem;
`;

export const ChatBodyWrapper = styled.div`
  width: 100%;
  height: 90%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

export const ChatMessageOuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ChatMessageInnerWrapper = styled.div<{ $isMine: boolean }>`
  display: flex;
  gap: 1.25rem;
  justify-content: ${({ $isMine }) => ($isMine ? 'flex-end' : 'flex-start')};
  align-items: center;
  width: 100%;
`;

export const ChatImage = styled.img`
  width: auto;
  height: 100%;
  max-height: 2.5rem;
`;

export const ChatMessage = styled.div<{ $isMine: boolean }>`
  margin: 0.31rem 0;
  padding: 0.625rem;
  background-color: ${({ $isMine, theme }) =>
    $isMine ? theme.chatBalloonColor : theme.newsBackgroundColor};
  font-size: 1.3rem;
  color: ${({ theme }) => theme.textColor};
  max-width: ${({ $isMine }) => ($isMine ? '60%' : '70%')};
  word-wrap: break-word;
  border-radius: ${({ $isMine }) => ($isMine ? '1rem' : '1rem')};
  text-align: ${({ $isMine }) => ($isMine ? 'right' : 'left')};
  border: 1px solid #d1d1d1;
  line-height: 2rem;
`;

export const ChatInputWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 1.875rem;
  border: 1px solid #ccc;
  position: relative;

  /* 포커스 시 스타일 */
  &:focus-within {
    border-color: ${({ theme }) =>
      theme.highlightColor}; /* 포커스 시 하이라이트 색상 */
    box-shadow: 0 0 5px ${({ theme }) => theme.highlightColor}; /* 포커스 시 외곽선 강조 */
  }
`;

export const ChatInput = styled.input`
  flex: 1;
  padding: 0.94rem 1.25rem 0.94rem 0.1rem;
  border-radius: 1.875rem;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;
  outline: none;
`;

export const DatePickerWrapper = styled.div`
  display: flex;
  margin-right: auto;
  margin-left: 1rem;
  gap: 1rem;
  align-items: center;
`;

export const SendIconWrapper = styled.div`
  margin-left: 0.625rem;
  margin-right: 0.625rem;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const SendIcon = styled.svg`
  fill: ${({ theme }) => theme.sendIconColor};
`;

export const DatePickerText = styled.p`
  color: ${({ theme }) => theme.profileColor};
  font-weight: 500;
  font-size: 1.2rem;
`;

export const CustomInput = styled.input`
  padding: 0.5rem;
  border-radius: 1rem;
  border: none;
  background-color: ${({ theme }) => theme.profileBackgroundColor};
  color: ${({ theme }) => theme.profileColor};
  font-size: 1rem;
  font-weight: 500;
  width: 100%;
  outline: none;
  cursor: pointer;
  text-align: center;

  &::placeholder {
    color: ${({ theme }) => theme.profileColor};
    opacity: 0.7;
  }
`;

export const NewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin-top: 1.25rem;
  gap: 1.25rem;
`;

export const NewsHeaderText = styled.p`
  font-weight: 600;
  font-size: 1.25rem;
`;

export const NewsOuterWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  width: 100%;
  gap: 1rem;
`;

export const NewsItemWrapper = styled.div`
  flex: 0 0 auto;
  width: 18%;
  height: 12.5rem;
  padding: 1.25rem 1rem;
  border: 1px solid #d1d1d1;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
`;

export const NewsMedia = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
`;

export const NewsTitle = styled.p`
  font-size: 1.3rem;
`;

export const NewsDate = styled.p`
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;
