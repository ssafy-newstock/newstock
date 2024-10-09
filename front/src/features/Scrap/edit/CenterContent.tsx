import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ThemedButton from '@components/ThemedButton';
import { DragIcon } from '@features/Scrap/create/Icon';
import { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
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
import { useScrapStore } from '@store/useScrapStore';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ScrapData, NewsData } from '@features/News/ScrapNewsInterface';

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
  width: 80%;
`;

const EconomicNewsContent = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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
  object-fit: contain;
  border-radius: 50%;
`;

const processArticle = (
  article: string
): { imageUrls: string[]; content: string } => {
  const imageTagRegex = /<ImageTag>(.*?)<\/ImageTag>/g;
  const imageUrls: string[] = [];
  let content = article;
  let match;

  while ((match = imageTagRegex.exec(article)) !== null) {
    imageUrls.push(match[1]);
  }

  content = article.replace(imageTagRegex, '').trim();
  return { imageUrls, content };
};

interface CenterContentProps {
  selectedCard: ScrapData;
  selectedNewsCard: NewsData;
}

const CenterContent: React.FC<CenterContentProps> = ({
  selectedCard,
  selectedNewsCard,
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState(selectedCard.title || '');
  const [droppedCard, setDroppedCard] = useState<any | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [content, setContent] = useState<string>(
    selectedNewsCard.content || ''
  );

  const updateScrap = useScrapStore((state) => state.updateScrap);
  const updateStockScrap = useScrapStore((state) => state.updateStockScrap);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCard.content) {
      const blocksFromHTML = convertFromHTML(selectedCard.content);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setEditorState(EditorState.createWithContent(contentState));
    }

    // selectedNewsCard가 존재하면 드래그 앤 드롭 영역에 미리 보여줌
    if (selectedNewsCard) {
      setDroppedCard(selectedNewsCard);
    }
  }, [selectedCard, selectedNewsCard]);

  const handleCreateCompleteClick = async () => {
    const contentState = editorState.getCurrentContent();
    const contentAsHTML = stateToHTML(contentState);

    if (!droppedCard || !title || !contentAsHTML) {
      alert('모든 필드를 입력하세요.');
      return;
    }

    try {
      // selectedCard의 newsType이 'industry'일 때
      if (selectedCard.newsType === 'industry') {
        await updateScrap(
          selectedCard.id, // 스크랩 ID
          title, // 새로운 제목
          droppedCard.id, // 뉴스 ID
          'industry', // 뉴스 타입 (industry)
          contentAsHTML // 새롭게 작성된 HTML 내용
        );
        // alert('시황 뉴스 스크랩 수정 완료!');
      }
      // selectedCard의 newsType이 'stock'일 때
      else if (selectedCard.newsType === 'stock') {
        await updateStockScrap(
          selectedCard.id, // 스크랩 ID
          title, // 새로운 제목
          droppedCard.id, // 뉴스 ID
          'stock', // 뉴스 타입 (stock)
          contentAsHTML // 새롭게 작성된 HTML 내용
        );
        // alert('종목 뉴스 스크랩 수정 완료!');
      }

      // 수정 완료 후 상세 페이지로 이동
      navigate(`../scrap-detail/`);
    } catch (error) {
      console.error('스크랩 수정 중 오류 발생:', error);
    }
  };

  const onEditorStateChange = (newState: EditorState) => {
    setEditorState(newState);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const parsedData = JSON.parse(data);
    const { imageUrls, content } = processArticle(parsedData.article);
    setDroppedCard({ ...parsedData, content });
    setImageUrls(imageUrls);
    setContent(content);
    document.body.style.cursor = 'default';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    document.body.style.cursor = 'copy';
  };

  const handleDragLeave = () => {
    document.body.style.cursor = 'default';
  };

  const mediaImageUrl = droppedCard?.media
    ? `https://stock.vaiv.kr/resources/images/news/${droppedCard.media}.png`
    : '';

  return (
    <>
      <TitleDiv>
        <ConterTitleDiv>
          <TitleP_15>스크랩 편집</TitleP_15>
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
                        e.currentTarget.src = newstockIcon;
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
                'blockType',
                'fontSize',
              ],
              inline: {
                options: ['bold', 'italic', 'underline', 'strikethrough'],
              },
              blockType: {
                inDropdown: true,
                options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote', 'Code'],
              },
              fontSize: {
                inDropdown: true,
                options: [
                  '10',
                  '11',
                  '12',
                  '13',
                  '14',
                  '15',
                  '16',
                  '17',
                  '18',
                  '19',
                  '20',
                  '21',
                  '22',
                  '23',
                  '24',
                  '25',
                  '26',
                  '27',
                  '28',
                  '29',
                  '30',
                  '40',
                  '50',
                  '60',
                  '70',
                  '80',
                ],
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
