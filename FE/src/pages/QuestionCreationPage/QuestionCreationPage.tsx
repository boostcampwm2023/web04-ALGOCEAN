import { DocumentEditor } from '../../components';
import {
  Main,
  Header,
  InnerDiv,
  Form,
  ContentDiv,
  Aside,
} from './QuestionCreationPage.style';

const QuestionCreationPage = () => {
  return (
    <Main>
      <InnerDiv className="inner">
        <Header>질문 작성</Header>
        <Form className="contentContainer">
          <ContentDiv>
            <DocumentEditor />
            <p>제목</p>
            <p>내용</p>
            <p>문제 출처 사이트</p>
            <p>문제 원본 링크</p>
            <p>프로그래밍 언어</p>
          </ContentDiv>
          <Aside>글 생성 버튼들 자리</Aside>
        </Form>
      </InnerDiv>
    </Main>
  );
};

export default QuestionCreationPage;
