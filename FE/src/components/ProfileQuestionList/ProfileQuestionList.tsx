import {
  ContentDiv,
  HeaderDiv,
  QuestionListDiv,
  Section,
  Topic,
} from './ProfileQuestionList.styles';
import { getFormalizedDate } from '../../hooks';
import { QuestionList } from 'src/types/type';

const headerList = ['제목', '태그', '언어', '채택', '좋아요', '작성일'];

interface QuestionListProps {
  userQuestionList: Array<QuestionList>;
}

export function ProfileQuestionList({ userQuestionList }: QuestionListProps) {
  return (
    <Section>
      <Topic>나의 질문 </Topic>
      <QuestionListDiv>
        <HeaderDiv>
          {headerList.map((val, idx) => (
            <p key={idx}>{val}</p>
          ))}
        </HeaderDiv>
        {userQuestionList &&
          userQuestionList.map((data: any) => (
            <ContentDiv key={data.Id}>
              <p>{data.title}</p>
              <p>{data.tag}</p>
              <p>{data.programmingLanguage}</p>
              <p>{data.isAdopted ? 'O' : 'X'}</p>
              <p>{data.likeCount}</p>
              <p>{getFormalizedDate(data.createdAt)}</p>
            </ContentDiv>
          ))}
      </QuestionListDiv>
    </Section>
  );
}
