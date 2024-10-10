import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ThemedButton from '@components/ThemedButton';
import { DragIcon } from '@features/Scrap/create/Icon';
import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import newstockIcon from '@assets/Stock/blueLogo.png';
import {
  ScrapHr,
  TextP_16_NOTGRAY,
  TitleDiv,
  TitleP_15,
} from '@features/Scrap/scrapStyledComponent';
import {
  CenterContentDiv,
  CenterContentTopDiv,
  CenterContentNewsDiv,
  MyBlock,
  CenterGlobalStyle,
  StyledInput,
  CenterNewsDiv,
  CenterNewsLeftDiv,
  CenterCotainer,
  ConterTitleDiv,
  CenterNewsRightImg,
} from '@features/Scrap/create/scrapCreateCenterStyledComponent';
import { stateToHTML } from 'draft-js-export-html';
// import { createScrap } from '@api/scrapApi';
import { useScrapStore } from '@store/useScrapStore';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CustomCenterNewsRightImg = styled(CenterNewsRightImg)`
  border-radius: 1rem;
  margin-right: 1rem;
`;

const EconomicNewsTitleText = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 말줄임표 적용 */
  width: 80%; /* 텍스트가 영역을 벗어나지 않도록 조정 */
`;

const EconomicNewsContent = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 최대 2줄까지만 표시 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; /* 말줄임표 적용 */
  justify-content: center;
  align-items: center;
  align-self: stretch;
  color: #828282;
  font-size: 1rem;
  line-height: 1.5rem;
  width: 90%;
`;

const EconomicNewsFooter = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 2rem;
`;

const FooterText = styled.p`
  color: #828282;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.9rem;
`;

const MediaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MediaLogo = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  object-fit: contain; /* 이미지 비율을 유지하면서 컨테이너 안에 맞춤 */
  border-radius: 50%;
`;

// const CustomConterTitleDiv = styled(ConterTitleDiv)`
//   align-items: baseline;
// `;

const processArticle = (
  article: string
): { imageUrls: string[]; content: string } => {
  const imageTagRegex = /<ImageTag>(.*?)<\/ImageTag>/g;
  const imageUrls: string[] = [];
  let content = article;
  let match;

  // 모든 ImageTag를 찾아서 이미지 URL 추출
  while ((match = imageTagRegex.exec(article)) !== null) {
    imageUrls.push(match[1]); // 이미지 URL을 배열에 추가
  }

  // 이미지 태그를 제거한 본문 내용
  content = article.replace(imageTagRegex, '').trim();

  return { imageUrls, content };
};

const CenterContent: React.FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState(''); // 스크랩 제목
  const [droppedCard, setDroppedCard] = useState<any | null>(null); // 드롭된 뉴스 상태
  const [imageUrls, setImageUrls] = useState<string[]>([]); // 이미지 URL 상태
  const [content, setContent] = useState<string>(''); // 본문 내용 상태

  const createScrap = useScrapStore((state) => state.createScrap);
  const createStockScrap = useScrapStore((state) => state.createStockScrap);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // selectedCard와 selectedNewsCard를 사용하여 초기 상태 설정
  //   if (selectedCard) {
  //     setTitle(selectedCard.title);
  //     setContent(selectedCard.content);
  //     // 여기서 드롭된 카드 정보도 설정할 수 있다면 설정
  //     setDroppedCard(selectedCard); // 드롭된 카드 설정
  //   }

  //   // EditorState 초기화
  //   setEditorState(EditorState.createEmpty());
  // }, [selectedCard]);

  const handleCreateCompleteClick = async () => {
    const contentState = editorState.getCurrentContent();
    const contentAsHTML = stateToHTML(contentState);
    console.log('작성완료');
    console.log('내용', contentAsHTML);

    if (!setDroppedCard || !title || !contentAsHTML) {
      alert('모든 필드를 입력하세요.');
      return;
    }

    try {
      // 드롭된 카드 유형에 따라 API 호출
      if (droppedCard.type === 'stock') {
        await createStockScrap(title, droppedCard.id, 'stock', contentAsHTML); // 종목 뉴스 작성 API 호출
      } else {
        await createScrap(title, droppedCard.id, 'industry', contentAsHTML); // 기존 시황 뉴스 작성 API 호출
      }
      // alert('스크랩 작성 완료!');
      navigate(`../scrap-detail/`);
    } catch (error) {
      console.error('스크랩 작성 중 오류 발생:', error);
    }
  };

  const onEditorStateChange = (newState: EditorState) => {
    setEditorState(newState);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const parsedData = JSON.parse(data);

    // article에서 imageUrls와 content를 분리
    const { imageUrls, content } = processArticle(parsedData.article);

    setDroppedCard({ ...parsedData, content }); // 드롭된 카드 데이터 설정
    setImageUrls(imageUrls); // 이미지 URL 설정
    setContent(content); // 본문 내용 설정
    document.body.style.cursor = 'default'; // 드롭 완료 후 커서 기본으로
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    document.body.style.cursor = 'copy'; // 드래그 중 커서를 'copy'로 변경
  };

  const handleDragLeave = () => {
    document.body.style.cursor = 'default'; // 드래그가 영역을 벗어나면 기본 커서로
  };

  const mediaImageUrl = droppedCard?.media
    ? `https://stock.vaiv.kr/resources/images/news/${droppedCard.media}.png`
    : '';

  return (
    <>
      <TitleDiv>
        <ConterTitleDiv>
          <TitleP_15>스크랩 작성</TitleP_15>
          <ThemedButton onClick={handleCreateCompleteClick}>
            작성 완료
          </ThemedButton>
        </ConterTitleDiv>
      </TitleDiv>
      <ScrapHr />
      <CenterGlobalStyle />
      <CenterContentDiv>
        <CenterContentTopDiv>
          <StyledInput
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </CenterContentTopDiv>
        <CenterCotainer
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {droppedCard ? (
            <CenterNewsDiv>
              {imageUrls.length > 0 && (
                <CustomCenterNewsRightImg src={imageUrls[0]} />
              )}
              <CenterNewsLeftDiv>
                <EconomicNewsTitleText>
                  {droppedCard.title}
                </EconomicNewsTitleText>
                <EconomicNewsContent>{content}</EconomicNewsContent>
                <EconomicNewsFooter>
                  <MediaWrapper>
                    <MediaLogo
                      src={mediaImageUrl}
                      alt="media"
                      onError={(e) => {
                        e.currentTarget.src = newstockIcon; // 이미지 로드 실패 시 기본 이미지로 대체
                      }}
                    />
                    <FooterText>{droppedCard.media}</FooterText>
                  </MediaWrapper>
                  <FooterText>
                    {droppedCard.uploadDatetime
                      ? droppedCard.uploadDatetime
                          .split('T')[0]
                          .replace(/-/g, '.')
                      : ''}
                  </FooterText>
                </EconomicNewsFooter>
                {/* <TextP_16>
                  {droppedCard.media}{' '}
                  {droppedCard.uploadDatetime
                    ? droppedCard.uploadDatetime
                        .split('T')[0]
                        .replace(/-/g, '.')
                    : ''}
                </TextP_16> */}
                {/* <CenterNewsLeftTopDiv></CenterNewsLeftTopDiv> */}
              </CenterNewsLeftDiv>
            </CenterNewsDiv>
          ) : (
            <CenterContentNewsDiv>
              <DragIcon />
              <TextP_16_NOTGRAY>
                스크랩 할 뉴스를 드래그해 주세요
              </TextP_16_NOTGRAY>
            </CenterContentNewsDiv>
          )}
        </CenterCotainer>
        <MyBlock>
          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            toolbar={{
              options: [
                'inline',
                'list',
                'textAlign',
                'colorPicker',
                'link',
                'emoji',
              ],
              inline: {
                options: ['bold', 'italic', 'underline', 'strikethrough'],
              },
              list: {
                options: ['unordered', 'ordered'],
              },
              textAlign: {
                options: ['left', 'center', 'right'],
              },
              colorPicker: {
                inDropdown: true,
                colors: [
                  '#000000',
                  '#808080',
                  '#FF0000',
                  '#FFA500',
                  '#FFFF00',
                  '#008000',
                  '#0000FF',
                  '#4B0082',
                  '#EE82EE',
                ],
              },
              link: {
                options: ['link'],
              },
            }}
            toolbarClassName="rdw-editor-toolbar"
            wrapperClassName="rdw-editor-wrapper"
            editorClassName="rdw-editor-main"
          />
        </MyBlock>
      </CenterContentDiv>
    </>
  );
};

export default CenterContent;
