import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { EditorWrapper } from './DocumentEditor.styles';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface EditorProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}

const DocumentEditor = ({ editorState, setEditorState }: EditorProps) => {
  const onEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };
  return (
    <EditorWrapper>
      <Editor
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
