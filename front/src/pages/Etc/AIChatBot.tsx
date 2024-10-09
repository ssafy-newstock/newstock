import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { Center } from '@components/Center';
import styled, { useTheme } from 'styled-components';
import chatbotImg from '@assets/Chat/chatbotImg.png';
import darkUserImg from '@assets/Chat/darkUser.png';
import lightUserImg from '@assets/Chat/user.png';
import AINews from '@features/Etc/AINews';
import WelcomeMessage from '@features/Etc/WelcomeMessage';
import CalendarIcon from '@features/MyNews/CalendarIcon';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // 날짜 선택 UI를 위한 CSS
import { axiosInstance } from '@api/axiosInstance';

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
  padding: 0 1rem;
`;

const ChatOuterWrapper = styled.div`
  width: 100%;
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
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
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
`;

const ChatMessage = styled.div<{ $isMine: boolean }>`
  margin: 0.31rem 0;
  padding: 0.625rem;
  background-color: ${({ $isMine, theme }) =>
    $isMine ? theme.chatBalloonColor : 'transparent'};
  color: ${({ theme }) => theme.textColor};
  max-width: ${({ $isMine }) => ($isMine ? '60%' : '100%')};
  word-wrap: break-word;
  border-radius: ${({ $isMine }) => ($isMine ? '0.5rem' : '0')};
  text-align: ${({ $isMine }) => ($isMine ? 'right' : 'left')};
`;

const ChatInputWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 1.875rem;
  border: 1px solid #ccc;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.94rem 1.25rem 0.94rem 0.1rem;
  border-radius: 1.875rem;
  border: none;
  background-color: transparent;
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

interface NewsItem {
  id: number;
  upload_datetime: string;
  title: string;
  media: string;
  thumbnail?: string;
  sentiment: number;
  type: string;
}

const AIChatBotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false); // DatePicker 표시 여부
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  // API 응답 상태
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // 뉴스 AI API 호출 함수
  const fetchNewsAI = async (query: string) => {
    try {
      if (!startDate || !endDate) return;

      const formattedStartDate = startDate.toISOString().split('T')[0];
      const formattedEndDate = endDate.toISOString().split('T')[0];

      const response = await axiosInstance.get('/newsai/chat', {
        params: {
          query,
          start_date: formattedStartDate,
          end_date: formattedEndDate,
        },
      });

      const { answer, relatedNews } = response.data;

      const aiResponse: Message = {
        content: answer || '관련 뉴스를 찾을 수 없습니다.',
        isMine: false,
      };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);

      setRelatedNews(relatedNews);
    } catch (error) {
      console.error('API 호출 에러:', error);
    }
  };

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage: Message = { content: input, isMine: true };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput('');

      fetchNewsAI(input);
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

  const toggleDatePicker = () => {
    setShowDatePicker((prev) => !prev);
  };

  return (
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
                      <ChatImage
                        src={theme.mode === 'dark' ? darkUserImg : lightUserImg}
                        alt="userImg"
                      />
                    </>
                  )}
                </ChatMessageInnerWrapper>
                {!msg.isMine && relatedNews.length > 0 && (
                  <AINews newsList={relatedNews} />
                )}
              </ChatMessageOuterWrapper>
            ))}
          </ChatBodyWrapper>
          <ChatInputWrapper>
            <DateWrapper onClick={toggleDatePicker}>
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
          {showDatePicker && (
            <div>
              <DatePicker
                selected={startDate ?? undefined} // null일 경우 undefined로 설정
                onChange={(date: Date | null) => {
                  if (date) setStartDate(date);
                }}
                selectsStart
                startDate={startDate ?? undefined} // null일 경우 undefined로 설정
                endDate={endDate ?? undefined} // null일 경우 undefined로 설정
                dateFormat="yyyy-MM-dd"
              />
              <DatePicker
                selected={endDate ?? undefined} // null일 경우 undefined로 설정
                onChange={(date: Date | null) => {
                  if (date) setEndDate(date);
                }}
                selectsEnd
                startDate={startDate ?? undefined} // null일 경우 undefined로 설정
                endDate={endDate ?? undefined} // null일 경우 undefined로 설정
                minDate={startDate ?? undefined} // null일 경우 undefined로 설정
                dateFormat="yyyy-MM-dd"
              />
            </div>
          )}
        </ChatOuterWrapper>
      </ChatCenter>
    </Center>
  );
};

export default AIChatBotPage;
