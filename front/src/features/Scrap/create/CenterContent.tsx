import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ThemedButton from '@components/ThemedButton';
import { DragIcon } from '@features/Scrap/create/Icon';
import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import {
  ScrapHr,
  TextP_16,
  TextP_16_NOTGRAY,
  TextP_20,
  TextP_24_NOTGRAY,
  TitleDiv,
  TitleP,
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
  CenterNewsRightDiv,
  CenterCotainer,
  CenterNewsLeftTopDiv,
  ConterTitleDiv,
  CenterNewsRightImg,
} from '@features/Scrap/create/scrapCreateCenterStyledComponent';
import { createScrap } from '@api/scrapApi';
import { stateToHTML } from 'draft-js-export-html';

const CenterContent: React.FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState(''); // 스크랩 제목
  const [droppedCard, setDroppedCard] = useState<any | null>(null); // 드롭된 뉴스 상태

  const handleCreateCompleteClick = async () => {
    const contentState = editorState.getCurrentContent();
    const contentAsHTML = stateToHTML(contentState);
    console.log('작성완료');
    console.log('내용', contentAsHTML);

    if (!setDroppedCard || !title || !contentAsHTML) {
      alert('모든 필드를 입력하세요.');
    }
    const scrapData = { title, context: contentAsHTML, droppedCard };

    // API 호출
    await createScrap(scrapData);
  };

  const onEditorStateChange = (newState: EditorState) => {
    setEditorState(newState);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const parsedData = JSON.parse(data);
    setDroppedCard(parsedData); // 드롭된 카드 데이터 설정
    document.body.style.cursor = 'default'; // 드롭 완료 후 커서 기본으로
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    document.body.style.cursor = 'copy'; // 드래그 중 커서를 'copy'로 변경
  };

  const handleDragLeave = () => {
    document.body.style.cursor = 'default'; // 드래그가 영역을 벗어나면 기본 커서로
  };

  return (
    <>
      <TitleDiv>
        <ConterTitleDiv>
          <TitleP>스크랩 작성</TitleP>
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
            placeholder="제목"
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
              <CenterNewsLeftDiv>
                <TextP_24_NOTGRAY>{droppedCard.title}</TextP_24_NOTGRAY>
                <TextP_20>{droppedCard.description}</TextP_20>
                <CenterNewsLeftTopDiv>
                  <TextP_16>
                    {droppedCard.media}{' '}
                    {droppedCard.uploadDatetime
                      ? droppedCard.uploadDatetime
                          .split(' ')[0]
                          .replace(/-/g, '.')
                      : ''}
                  </TextP_16>
                </CenterNewsLeftTopDiv>
              </CenterNewsLeftDiv>
              {droppedCard.thumbnail ? (
                <CenterNewsRightImg src={droppedCard.thumbnail} />
              ) : (
                <CenterNewsRightDiv />
              )}
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
