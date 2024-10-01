import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { Center } from '@components/Center';
import styled from 'styled-components';
import chatbotImg from '@assets/Chat/chatbotImg.png';
import darkUserImg from '@assets/Chat/darkUser.png';
import AINews from '@features/Etc/AINews';
import WelcomeMessage from '@features/Etc/WelcomeMessage';
import CalendarIcon from '@features/MyNews/CalendarIcon';
import Left from '@components/Left';

// import 'react-datepicker/dist/react-datepicker.css'; // 날짜 선택 UI를 위한 CSS
// import DatePicker from 'react-datepicker';

const ChatCenter = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const DateWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 0 0.625rem; */
  padding: 0 1rem;
`;

// const DateText = styled.p`
//   color: #828282;
//   font-family: Inter;
//   font-size: 1rem;
//   line-height: 1.875rem;
// `;

const ChatOuterWrapper = styled.div`
  width: 70%;
  max-width: 106rem;
  height: 95%;
  display: flex;
  padding: 0.94rem 1.25rem;
  margin: 1.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 1.875rem;
`;

const ChatBodyWrapper = styled.div`
  width: 100%;
  height: 90%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ChatMessageOuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const ChatMessageInnerWrapper = styled.div<{ $isMine: boolean }>`
  display: flex;
  gap: 1.25rem;
  justify-content: ${({ $isMine }) => ($isMine ? 'flex-end' : 'flex-start')};
  align-items: center;
  width: 100%;
`;

const ChatImage = styled.img`
  width: auto;
  height: 100%;
  max-height: 2.5rem;
  /* border-radius: 50%; */
`;

const ChatMessage = styled.div<{ $isMine: boolean }>`
  margin: 0.31rem 0;
  padding: 0.625rem;
  background-color: ${({ $isMine, theme }) =>
    $isMine ? theme.chatBalloonColor : 'transparent'};
  color: ${({ theme }) => theme.textColor};
  max-width: ${({ $isMine }) =>
    $isMine ? '60%' : '100%'}; /* 사용자 메시지는 60%, AI는 100% */
  word-wrap: break-word;
  border-radius: ${({ $isMine }) =>
    $isMine ? '0.5rem' : '0'}; /* 사용자 메시지에만 테두리 */
  text-align: ${({ $isMine }) =>
    $isMine ? 'right' : 'left'}; /* 텍스트 정렬 */
`;

const InfoWrapper = styled.div`
  width: 100%;
  border: 1px solid #d1d1d1;
  border-radius: 0.3rem;
  padding: 1.25rem 1rem;
  line-height: 1.75rem;
`;

const ChatInputWrapper = styled.div`
  display: flex;
  width: 100%;
  /* height: 15%; */
  /* padding: 0 14px; */
  justify-content: center;
  align-items: center;
  border-radius: 1.875rem;
  border: 1px solid #ccc;
  /* background-color: transparent; */
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.94rem 1.25rem 0.94rem 0.1rem;
  border-radius: 1.875rem;
  border: none;
  background-color: transparent; /* 입력 필드의 배경색 투명화 */
  align-items: center;
  color: #828282;
  font-size: 1rem;
  outline: none;
`;

const SendIconWrapper = styled.div`
  margin-left: 0.625rem;
  margin-right: 0.625rem;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const SendIcon = styled.svg`
  fill: ${({ theme }) => theme.sendIconColor};
`;

const sendIcon = (
  <SendIcon
    xmlns="http://www.w3.org/2000/svg"
    width="1.5625rem"
    height="1.5625rem"
    viewBox="0 0 25 25"
  >
    <path d="M24.456 11.6076L2.45599 0.607565C2.28356 0.521332 2.08988 0.48678 1.89827 0.50807C1.70665 0.52936 1.52528 0.605584 1.37599 0.727565C1.23341 0.847058 1.12699 1.00395 1.0687 1.18061C1.0104 1.35727 1.00254 1.54668 1.04599 1.72756L4.00599 12.4976L1.00599 23.2376C0.965214 23.3886 0.960455 23.5471 0.992092 23.7004C1.02373 23.8536 1.09088 23.9973 1.18815 24.1198C1.28541 24.2424 1.41008 24.3404 1.55212 24.406C1.69416 24.4716 1.84962 24.503 2.00599 24.4976C2.16253 24.4966 2.31667 24.4589 2.45599 24.3876L24.456 13.3876C24.6198 13.3036 24.7573 13.1762 24.8532 13.0191C24.9492 12.8621 25 12.6816 25 12.4976C25 12.3135 24.9492 12.133 24.8532 11.976C24.7573 11.819 24.6198 11.6915 24.456 11.6076ZM3.55599 21.6076L5.76599 13.4976H15.006V11.4976H5.76599L3.55599 3.38756L21.766 12.4976L3.55599 21.6076Z" />
  </SendIcon>
);

interface Message {
  content: string;
  isMine: boolean;
}

const AIChatBotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  // const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // 스크롤 제어를 위한 Ref 생성
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // 사용자가 채팅을 보낼 때만 스크롤을 아래로 이동
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

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
      {/* <LeftNews /> */}
      <Left />
      <Center>
        <ChatCenter>
          <ChatOuterWrapper>
            <ChatBodyWrapper ref={chatBodyRef}>
              {messages.length === 0 && <WelcomeMessage />}
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
                        <ChatImage src={darkUserImg} alt="userImg" />
                      </>
                    )}
                  </ChatMessageInnerWrapper>
                  {!msg.isMine && (
                    <InfoWrapper>
                      NewStock AI는 매 질문에 대해 최근 한 달간의 관련 뉴스를
                      제공합니다.
                      <br /> 만약 뉴스 제공 기간을 변경하고 싶다면, 입력창 옆의
                      날짜 아이콘을 클릭해 주세요.
                    </InfoWrapper>
                  )}
                  {/* AI의 메시지 아래에 AINews 출력 */}
                  {!msg.isMine && <AINews />}
                </ChatMessageOuterWrapper>
              ))}
            </ChatBodyWrapper>
            {/* <ChatDataWrapper></ChatDataWrapper> */}
            <ChatInputWrapper>
              <DateWrapper>
                <CalendarIcon />
              </DateWrapper>
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
