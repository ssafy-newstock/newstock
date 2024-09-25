import React from 'react';
import styled from 'styled-components';
import chatImg from '@assets/Chat/chatbot.png';

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  padding: 0 2rem 8rem 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.textColor};
`;

const ChatIcon = styled.img`
  height: 3rem; /* Title의 font-size에 맞춤 */
  width: auto; /* 비율 유지 */
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 4rem;
`;

const Button = styled.div`
  background-color: ${({ theme }) => theme.navBarColor};
  color: white;
  font-weight: 500;
  padding: 10px 20px;
  margin-bottom: 10px;
  border: none;
  border-radius: 30px;
  font-size: 1.2rem;
  transition: background-color 0.3s;
  white-space: nowrap; /* 텍스트가 줄바꿈되지 않고 한 줄에 표시되도록 */
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  align-items: center;
`;

const WelcomeMessage: React.FC = () => {
  return (
    <WelcomeContainer>
      <Title>
        뉴스톡 <ChatIcon src={chatImg} alt="Chat Icon" />
      </Title>
      <SubTitle>
        질문에 답하고 원하는 기사를 찾아주는 <br />
        생성형 인공지능 서비스
      </SubTitle>

      <ButtonContainer>
        <Button>뉴스톡이 뭐야?</Button>
        <Button>최근 생성형 인공지능의 발전에 대해 알려줘</Button>
        <Button>
          최근 생성형 인공지능의 발전에 대한 정보를 서론, 본론, 결론의 형태로
          언론사 기자가 보도하는 스타일로 작성해줘
        </Button>
      </ButtonContainer>
    </WelcomeContainer>
  );
};

export default WelcomeMessage;
