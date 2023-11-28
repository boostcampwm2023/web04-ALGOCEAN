import { useState } from 'react';
import { DocumentEditor } from '../../components';
import {
  Main,
  Header,
  InnerDiv,
  Form,
  ContentDiv,
  Aside,
  Label,
  Input,
  ButtonWrapper,
  TagButton,
} from './QuestionCreationPage.style';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {
  createQuestionAPI,
  putDraftQuestionAPI,
} from '../../api/questionService';
import { useLocation, useNavigate } from 'react-router-dom';

const POLLING_INTERVAL = 20000;
const TAG_LIST = ['baekjoon', 'programmers', 'leetcode', 'etc'];
const PROGRAMMING_LANGUAGE_LIST = [
  'C',
  'C++',
  'C#',
  'Go',
  'Java',
  'JavaScript',
  'Kotlin',
  'Python3',
  'Ruby',
  'Scala',
  'Swift',
  'etc',
];
const BUTTON_LABEL_LIST = ['질문 등록하기', '임시 등록', '작성 취소하기'];

const BUTTON_ONCLICK_HANDLER = [
  () => {
    console.log('질문 등록하기');
  },
  () => {
    console.log('임시 등록');
  },
  () => {
    console.log('작성 취소하기');
  },
];

const QuestionCreationPage = () => {
  const navigate = useNavigate();
  // draft ID 가져오기
  const location = useLocation();
  const locationData = location.state?.id || null;

  // 서버에 제출할 데이터
  const [formData, setFormData] = useState({
    title: '',
    tag: 'baekjoon',
    programmingLanguage: 'C',
    originalLink: '',
    draftId: locationData,
  });

  // 폼 필드 값 변경 이벤트 핸들러
  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  // 서버로 보낼 데이터 가공
  const preprocessData = () => {
    // 문서에디터 내용 html 형식으로 변환
    const contentState = draftToHtml(
      convertToRaw(editorState.getCurrentContent()),
    );
    return {
      ...formData,
      content: contentState,
    };
  };

  // 폼 제출 핸들러
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const createQuestionData = preprocessData();
    try {
      await createQuestionAPI(createQuestionData);
      navigate('/');
    } catch (error: any) {
      if (error.response) {
        // 서버 응답이 있는 경우 (오류 상태 코드 처리)
        if (error.response.status === 400) {
          console.error('Bad Request:', error.response.data);
        } else {
          console.error('Server Error:', error.response.data);
        }
      } else {
        // 서버 응답이 없는 경우 (네트워크 오류 등)
        console.error('Error creating question:', error.message);
      }
      throw error;
    }
  };

  // 선택된 버튼 focusing 효과를 주기 위한 상태 및 핸들러
  const [activeButton, setActiveButton] = useState({
    tagActiveButton: 0 as number,
    programmingLanguageActiveButton: 0 as number,
  });

  const handleButtonClick = (buttonType: string, buttonId: number) => {
    setActiveButton((prevState) => ({
      ...prevState,
      [buttonType]: buttonId,
    }));
  };

  // 문서에디터 state
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // 임시글 저장 처리
  const [pollingIntervalId, setPollingIntervalId] = useState<
    number | undefined
  >(undefined);

  const handleFocus = () => {
    // 폴링 시작
    const intervalId = setInterval(async () => {
      const putQuestionData = preprocessData();
      await putDraftQuestionAPI(putQuestionData);
    }, POLLING_INTERVAL);
    setPollingIntervalId(intervalId);
  };
  const handleBlur = () => {
    // 폴링 취소
    clearInterval(pollingIntervalId);
    setPollingIntervalId(undefined);
  };

  return (
    <Main>
      <InnerDiv className="inner">
        <Header>질문 작성</Header>
        <Form className="contentContainer" onSubmit={handleSubmit}>
          <ContentDiv>
            <Label>제목</Label>
            <Input
              type="text"
              value={formData.title}
              placeholder="내용을 입력해 주세요."
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
            <Label>내용</Label>
            <DocumentEditor
              handleFocusCallback={preprocessData}
              editorState={editorState}
              setEditorState={setEditorState}
            />
            <Label>문제 출처 사이트</Label>
            <ButtonWrapper>
              {TAG_LIST.map((val, idx) => (
                <TagButton
                  key={idx}
                  type="button"
                  $isactive={activeButton.tagActiveButton === idx}
                  onClick={() => {
                    handleInputChange('tag', val);
                    handleButtonClick('tagActiveButton', idx);
                  }}
                >
                  {val}
                </TagButton>
              ))}
            </ButtonWrapper>
            <Label>문제 원본 링크</Label>
            <Input
              type="text"
              value={formData.originalLink}
              placeholder="내용을 입력해 주세요."
              onChange={(e) =>
                handleInputChange('originalLink', e.target.value)
              }
            />
            <Label>프로그래밍 언어</Label>
            <ButtonWrapper>
              {PROGRAMMING_LANGUAGE_LIST.map((val, idx) => (
                <TagButton
                  key={idx}
                  type="button"
                  $isactive={
                    activeButton.programmingLanguageActiveButton === idx
                  }
                  onClick={() => {
                    handleInputChange('programmingLanguage', val);
                    handleButtonClick('programmingLanguageActiveButton', idx);
                  }}
                >
                  {val}
                </TagButton>
              ))}
            </ButtonWrapper>
          </ContentDiv>
          <Aside>
            {BUTTON_LABEL_LIST.map((val, idx) => (
              <button
                key={idx}
                type={idx === 0 ? 'submit' : 'button'}
                onClick={BUTTON_ONCLICK_HANDLER[idx]}
              >
                {val}
              </button>
            ))}
          </Aside>
        </Form>
      </InnerDiv>
    </Main>
  );
};

export default QuestionCreationPage;
