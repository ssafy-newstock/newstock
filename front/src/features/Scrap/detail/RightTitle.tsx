import { RightTitleTopDiv } from '@features/Scrap/detail/scrapDetailRightStyledComponent';
import { useNavigate } from 'react-router-dom';
import {
  TextP_16,
  TitleDiv,
  TitleP_15,
} from '@features/Scrap/scrapStyledComponent';
import styled from 'styled-components';
import ThemedButton from '@components/ThemedButton';

const CustomTitleDiv = styled(TitleDiv)`
  gap: 0.8rem;
`;

const RightTitle: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate('/scrap-create');
  };

  return (
    <CustomTitleDiv>
      <RightTitleTopDiv>
        <TitleP_15>스크랩 관리</TitleP_15>
        <ThemedButton onClick={handleCreateClick}>스크랩 만들기</ThemedButton>
      </RightTitleTopDiv>
      <TextP_16>뉴스를 스크랩하고 스크랩한 뉴스를 관리할 수 있어요.</TextP_16>
    </CustomTitleDiv>
  );
};

export default RightTitle;
