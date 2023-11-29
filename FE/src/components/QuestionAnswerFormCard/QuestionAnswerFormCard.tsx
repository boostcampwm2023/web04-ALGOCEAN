import { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { DocumentEditor, SquareButton } from '../';
import { QuestionAnswerFormCardProps } from 'src/types/type';
import {
  Container,
  Inner,
  Header,
  Footer,
} from './QuestionAnswerFormCard.styles';

// ⚠️ 현재 로그인한 유저의 전역 이름을 가져오는 로직이 필요
const GLOBAL_USER_NICKNAME = 'Snoopy';

const QuestionAnswerFormCard = ({
  handleCancel,
  handleSubmit,
}: QuestionAnswerFormCardProps) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const getEditorContent = () => {
    const editorContent = draftToHtml(
      convertToRaw(editorState.getCurrentContent()),
    );
    return editorContent;
  };

  const isEditorContentEmpty = (editorContent: string) => {
    const REG = /(?<=^<p>).*(?=<\/p>)/;
    const [content] = editorContent.match(REG) as Array<string>;
    return !content;
  };

  const onCancelButtonClick = () => {
    handleCancel();
  };

  const onSubmitButtonClick = () => {
    const editorContent = getEditorContent();
    if (isEditorContentEmpty(editorContent)) {
      return alert('답변을 입력해 주세요');
    }
    handleSubmit(editorContent);
  };

  return (
    <Container>
      <Inner>
        <Header>답변 작성</Header>
        <DocumentEditor
          editorState={editorState}
          setEditorState={setEditorState}
        />
        <Footer>
          <span>{GLOBAL_USER_NICKNAME}</span>
          <div>
            <button onClick={onCancelButtonClick}>답변 취소</button>
            <SquareButton
              content="답변 등록하기"
              handleClick={onSubmitButtonClick}
            />
          </div>
        </Footer>
      </Inner>
    </Container>
  );
};

export default QuestionAnswerFormCard;
