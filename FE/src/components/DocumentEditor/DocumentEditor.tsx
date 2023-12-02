import { Editor } from 'react-draft-wysiwyg';
import { AtomicBlockUtils, EditorState } from 'draft-js';
import { EditorWrapper } from './DocumentEditor.styles';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useState } from 'react';
import { putDraftQuestionAPI } from '../../api/questionService';
import { FileProps, QuestionData } from '../../types/type';
import { S3 } from '../../utils/network';
import { v4 as uuidv4 } from 'uuid';

interface EditorProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  handleFocusCallback?: () => QuestionData;
}

const POLLING_INTERVAL = 30000;

const DocumentEditor = ({
  editorState,
  setEditorState,
  handleFocusCallback,
}: EditorProps) => {
  const onEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  // 임시글 저장 처리
  const [pollingIntervalId, setPollingIntervalId] = useState<
    number | undefined
  >(undefined);

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

  const uploadImageToNaverCloudPlatform = async (file: FileProps) => {
    const bucket = 'algocean';
    // 이미지를 업로드할 년 월 일 폴더 생성
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const folder_path = `images/${year}/${month}/${day}`;
    const object_name =
      uuidv4().toString().replace(/-/g, '') +
      file.name.replace(/[-{}^%`[\]">~<#|]/g, '');
    // 파일 업로드
    try {
      await S3.putObject({
        Bucket: bucket,
        Key: folder_path + '/' + object_name,
        ACL: 'public-read',
        // ACL을 지우면 전체 공개되지 않습니다.
        Body: file,
      }).promise();
    } catch (error) {
      console.error('에러 발생', error);
    }
    return `https://kr.object.ncloudstorage.com/${bucket}/${folder_path}/${object_name}`;
  };

  // 이미지 업로드
  const uploadCallback = async (file: FileProps) => {
    try {
      const filePath = await uploadImageToNaverCloudPlatform(file);
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        'IMAGE',
        'IMMUTABLE',
        { src: filePath, width: '600px' },
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithEntity,
      });
      setEditorState(
        AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '),
      );
    } catch (error) {
      console.error('에러 발생', error);
    }
  };

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
          image: { uploadCallback: uploadCallback }, // 이미지 업로드
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
