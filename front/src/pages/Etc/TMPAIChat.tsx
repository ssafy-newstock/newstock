import { useState, ChangeEvent, KeyboardEvent } from 'react';
import LeftNews from '@components/LeftNews';
import { Center } from '@components/Center';
import styled from 'styled-components';
import chatbotImg from '@assets/Chat/ChatbotImg.png';
import userImg from '@assets/Chat/user.jpg';
import AINews from '@features/AINews';

const ChatCenter = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const ChatOuterWrapper = styled.div`
  width: 70%;
  max-width: 106rem;
  height: 100%;
  display: flex;
  padding: 15px 20px;
  margin: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  /* background-color: ${({ theme }) => theme.newsBackgroundColorColor}; */
  background-color: white;
  border-radius: 30px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const ChatBodyWrapper = styled.div`
  width: 100%;
  height: 90%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ChatMessageOuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChatMessageInnerWrapper = styled.div<{ $isMine: boolean }>`
  display: flex;
  gap: 20px;
  justify-content: ${({ $isMine }) => ($isMine ? 'flex-end' : 'flex-start')};
  align-items: center;
  width: 100%;
`;

const ChatImage = styled.img`
  width: auto;
  height: 100%;
  max-height: 40px;
  border-radius: 50%;
`;

const ChatMessage = styled.div<{ $isMine: boolean }>`
  margin: 5px 0;
  padding: 10px;
  background-color: ${({ $isMine }) => ($isMine ? '#f1f1f1' : 'transparent')};
  max-width: ${({ $isMine }) =>
    $isMine ? '60%' : '100%'}; /* 사용자 메시지는 60%, AI는 100% */
  word-wrap: break-word;
  border-radius: ${({ $isMine }) =>
    $isMine ? '8px' : '0'}; /* 사용자 메시지에만 테두리 */
  text-align: ${({ $isMine }) =>
    $isMine ? 'right' : 'left'}; /* 텍스트 정렬 */
`;

const ChatInputWrapper = styled.div`
  display: flex;
  width: 100%;
  /* height: 15%; */
  /* padding: 0 14px; */
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border: 1px solid #ccc;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 15px 20px;
  border-radius: 30px;
  border: none;
  align-items: center;
  color: #828282;
  font-size: 16px;
  outline: none;
`;

const SendIconWrapper = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const sendIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
  >
    <path
      d="M24.456 11.6076L2.45599 0.607565C2.28356 0.521332 2.08988 0.48678 1.89827 0.50807C1.70665 0.52936 1.52528 0.605584 1.37599 0.727565C1.23341 0.847058 1.12699 1.00395 1.0687 1.18061C1.0104 1.35727 1.00254 1.54668 1.04599 1.72756L4.00599 12.4976L1.00599 23.2376C0.965214 23.3886 0.960455 23.5471 0.992092 23.7004C1.02373 23.8536 1.09088 23.9973 1.18815 24.1198C1.28541 24.2424 1.41008 24.3404 1.55212 24.406C1.69416 24.4716 1.84962 24.503 2.00599 24.4976C2.16253 24.4966 2.31667 24.4589 2.45599 24.3876L24.456 13.3876C24.6198 13.3036 24.7573 13.1762 24.8532 13.0191C24.9492 12.8621 25 12.6816 25 12.4976C25 12.3135 24.9492 12.133 24.8532 11.976C24.7573 11.819 24.6198 11.6915 24.456 11.6076ZM3.55599 21.6076L5.76599 13.4976H15.006V11.4976H5.76599L3.55599 3.38756L21.766 12.4976L3.55599 21.6076Z"
      fill="#434CE7"
    />
  </svg>
);

interface Message {
  content: string;
  isMine: boolean;
}

const AIChatBotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage: Message = { content: input, isMine: true };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput('');

      // 일단 무엇이든지 채팅을 치면 ai가 자동으로 응답을 하게끔 임의로 설정함
      setTimeout(() => {
        const aiResponse: Message = {
          content: '무슨 말씀인지 모르겠어요',
          isMine: false,
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      }, 1000);
    }
  };

  const handleSendClick = () => {
    sendMessage();
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {/* left는 없애고, 관련 뉴스는 채팅을 쳤을 때 제공하도록 하는게 나을듯? */}
      <LeftNews />
      <Center>
        <ChatCenter>
          <ChatOuterWrapper>
            <ChatBodyWrapper>
              {messages.map((msg, index) => (
                <ChatMessageOuterWrapper key={index}>
                  <ChatMessageInnerWrapper $isMine={msg.isMine}>
                    {!msg.isMine && (
                      <>
                        <ChatImage src={chatbotImg} alt="userImg" />
                        <ChatMessage key={index} $isMine={msg.isMine}>
                          {msg.content}
                        </ChatMessage>
                      </>
                    )}
                    {msg.isMine && (
                      <>
                        <ChatMessage key={index} $isMine={msg.isMine}>
                          {msg.content}
                        </ChatMessage>
                        <ChatImage src={userImg} alt="userImg" />
                      </>
                    )}
                  </ChatMessageInnerWrapper>
                  {/* AI의 메시지 아래에 AINews 출력 */}
                  {!msg.isMine && <AINews />}
                </ChatMessageOuterWrapper>
              ))}
            </ChatBodyWrapper>
            {/* <ChatDataWrapper></ChatDataWrapper> */}
            <ChatInputWrapper>
              <ChatInput
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
              />
              <SendIconWrapper onClick={handleSendClick}>
                {sendIcon}
              </SendIconWrapper>
            </ChatInputWrapper>
          </ChatOuterWrapper>
        </ChatCenter>
      </Center>
    </>
  );
};

export default AIChatBotPage;
