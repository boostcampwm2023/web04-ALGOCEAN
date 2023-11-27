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
import { createQuestionAPI } from '../../api/questionService';
import useDidMountEffect from '../../hooks/useDidMountEffect';

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
  // 서버에 제출할 데이터
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tag: 'baekjoon',
    programmingLanguage: 'C',
    originalLink: '',
  });

  // 폼 필드 값 변경 이벤트 핸들러
  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = () => {
    // 문서에디터 내용 html 형식으로 변환
    const contentState = draftToHtml(
      convertToRaw(editorState.getCurrentContent()),
    );
    handleInputChange('content', contentState);
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

  useDidMountEffect(() => {
    const fetchData = async () => {
      return await createQuestionAPI(formData);
    };
    fetchData();
  }, [formData.content]);

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
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
            <Label>내용</Label>
            <DocumentEditor
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
