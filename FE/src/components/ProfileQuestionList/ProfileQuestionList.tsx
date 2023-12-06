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
              <p>{data.Title}</p>
              <p>{data.Tag}</p>
              <p>{data.ProgrammingLanguage}</p>
              <p>{data.IsAdopted ? 'O' : 'X'}</p>
              <p>{data.LikeCount}</p>
              <p>{getFormalizedDate(data.CreatedAt)}</p>
            </ContentDiv>
          ))}
      </QuestionListDiv>
    </Section>
  );
}
