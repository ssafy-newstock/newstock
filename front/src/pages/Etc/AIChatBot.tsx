import {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  forwardRef,
} from 'react';
import { Center } from '@components/Center';
import styled, { useTheme } from 'styled-components';
import chatbotImg from '@assets/Chat/chatbotImg.png';
import darkUserImg from '@assets/Chat/darkUser.png';
import lightUserImg from '@assets/Chat/user.png';
import AINews from '@features/Etc/AIChatBot/AINews';
import WelcomeMessage from '@features/Etc/WelcomeMessage';
import CalendarIcon from '@features/MyNews/CalendarIcon';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { axiosInstance } from '@api/axiosInstance';
import { useChatStore, Message } from '@store/useChatBotStore';
import { ko } from 'date-fns/locale';
import {
  ChatBodyWrapper,
  ChatCenter,
  ChatImage,
  ChatInput,
  ChatInputWrapper,
  ChatMessage,
  ChatMessageInnerWrapper,
  ChatMessageOuterWrapper,
  ChatOuterWrapper,
  CustomInput,
  DatePickerText,
  DatePickerWrapper,
  DateWrapper,
  SendIcon,
  SendIconWrapper,
} from '@features/Etc/AIChatBot/AIChatBotStyledComponent';

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

// ForwardRef component for the custom input
interface CustomDateInputProps {
  value?: string;
  onClick?: () => void;
}

const CustomDateInput = forwardRef<HTMLInputElement, CustomDateInputProps>(
  ({ value, onClick }, ref) => (
    <CustomInput
      onClick={onClick}
      ref={ref}
      value={value || '연도-월-일'} // value가 없을 때 "연도-월-일" 표시
      readOnly
    />
  )
);

CustomDateInput.displayName = 'CustomDateInput'; // forwardRef 사용 시 displayName 설정

// Styled DatePicker with props type extensions
const StyledDatePicker = styled(DatePicker as any)``;

const AIChatBotPage: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const messages = useChatStore((state) => state.messages);
  const addMessage = useChatStore((state) => state.addMessage);
  const startDate = useChatStore((state) => state.startDate);
  const endDate = useChatStore((state) => state.endDate);
  const showDatePicker = useChatStore((state) => state.showDatePicker);
  const setStartDate = useChatStore((state) => state.setStartDate);
  const setEndDate = useChatStore((state) => state.setEndDate);
  const toggleDatePicker = useChatStore((state) => state.toggleDatePicker);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

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
        relatedNews: relatedNews.length > 0 ? relatedNews : undefined,
      };
      addMessage(aiResponse);
    } catch (error) {
      console.error('API 호출 에러:', error);
    }
  };

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage: Message = { content: input, isMine: true };
      addMessage(newMessage);
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
                        src={
                          theme.textColor === '#4C506B'
                            ? lightUserImg
                            : darkUserImg
                        }
                        alt="userImg"
                      />
                    </>
                  )}
                </ChatMessageInnerWrapper>
                {!msg.isMine && msg.relatedNews && (
                  <AINews newsList={msg.relatedNews} />
                )}
              </ChatMessageOuterWrapper>
            ))}
          </ChatBodyWrapper>
          <DatePickerWrapper>
            {showDatePicker && (
              <StyledDatePicker
                selected={startDate ? startDate : null}
                onChange={(date: Date | null) => {
                  setStartDate(date);
                }}
                selectsStart
                startDate={startDate ?? null}
                endDate={endDate ?? null}
                dateFormat="yyyy-MM-dd"
                customInput={<CustomDateInput />}
                locale={ko}
              />
            )}
            {showDatePicker && <DatePickerText> ~ </DatePickerText>}
            {showDatePicker && (
              <StyledDatePicker
                selected={endDate ? endDate : null}
                onChange={(date: Date | null) => {
                  setEndDate(date);
                }}
                selectsEnd
                startDate={startDate ?? null}
                endDate={endDate ?? null}
                minDate={startDate ?? null}
                dateFormat="yyyy-MM-dd"
                customInput={<CustomDateInput />}
                locale={ko}
              />
            )}
          </DatePickerWrapper>
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
          <DatePickerText>
            우측 하단의 달력 버튼을 클릭 후 날짜를 선택하고 대화를 시작해
            주세요.
          </DatePickerText>
        </ChatOuterWrapper>
      </ChatCenter>
    </Center>
  );
};

export default AIChatBotPage;
