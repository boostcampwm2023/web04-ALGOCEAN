import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import { EditorWrapper } from './DocumentEditor.styles';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useState } from 'react';
import { putDraftQuestionAPI } from '../../api';
import { QuestionData } from '../../types/type';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import htmlToDraft from 'html-to-draftjs';

interface EditorProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  handleFocusCallback?: () => QuestionData;
  draftContent?: string | undefined;
}

const POLLING_INTERVAL = 30000;

const DocumentEditor = ({
  editorState,
  setEditorState,
  handleFocusCallback,
  draftContent,
}: EditorProps) => {
  const onEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  // 임시글 저장 처리
  const [pollingIntervalId, setPollingIntervalId] = useState<any>(undefined);

  const handleFocus = () => {
    // 폴링 시작
    if (!handleFocusCallback) {
      return;
    }
    const intervalId = setInterval(async () => {
      const putQuestionData = handleFocusCallback();
      await putDraftQuestionAPI(putQuestionData);
    }, POLLING_INTERVAL);
    setPollingIntervalId(intervalId);
  };

  const handleBlur = () => {
    // 폴링 취소
    clearInterval(pollingIntervalId);
    setPollingIntervalId(undefined);
  };

  // draft 반영
  useDidMountEffect(() => {
    if (!draftContent) return;
    const blocksFromHTML = htmlToDraft(draftContent as string);
    if (!blocksFromHTML) return;
    const { contentBlocks, entityMap } = blocksFromHTML;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap,
    );
    const draftState = EditorState.createWithContent(contentState);
    setEditorState(draftState);
  }, [draftContent]);

  return (
    <EditorWrapper>
      <Editor
        onFocus={handleFocus}
        onBlur={handleBlur}
        // 에디터와 툴바 모두에 적용되는 클래스
        wrapperClassName="wrapper-class"
        // 에디터에만 적용되는 클래스
        editorClassName="editor"
        // 툴바에 적용되는 클래스
        toolbarClassName="toolbar-class"
        // 툴바 설정
        toolbar={{
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: false },
        }}
        placeholder="내용을 입력해주세요."
        // 언어 설정
        localization={{
          locale: 'ko',
        }}
        // 에디터에서 어떤 상태를 다룰 지 설정
        editorState={editorState}
        // 에디터 값 변경 감지
        onEditorStateChange={onEditorStateChange}
      />
    </EditorWrapper>
  );
};

export default DocumentEditor;
