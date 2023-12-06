import {
  ContentDiv,
  HeaderDiv,
  QuestionListDiv,
  Section,
  Topic,
} from './ProfileQuestionList.styles';
import { getFormalizedDate } from '../../hooks';

const headerList = ['제목', '태그', '언어', '채택', '좋아요', '작성일'];
const dummyData = [
  {
    Id: 73762,
    Title: '다익스트라 알고리즘의 정당성이 궁금해요',
    CreatedAt: '2023-12-04T09:35:36.000Z',
    Tag: 'Baekjoon',
    ProgrammingLanguage: 'C++',
    IsAdopted: false,
    ViewCount: 0,
    LikeCount: 0,
  },
  {
    Id: 73761,
    Title: '다익스트라 알고리즘의 정당성이 궁금해요',
    CreatedAt: '2023-12-04T09:35:36.000Z',
    Tag: 'Baekjoon',
    ProgrammingLanguage: 'C++',
    IsAdopted: false,
    ViewCount: 18,
    LikeCount: 0,
  },
  {
    Id: 73760,
    Title: '다익스트라 알고리즘의 정당성이 궁금해요',
    CreatedAt: '2023-12-04T09:35:36.000Z',
    Tag: 'Baekjoon',
    ProgrammingLanguage: 'C++',
    IsAdopted: false,
    ViewCount: 0,
    LikeCount: 0,
  },
];

export function ProfileQuestionList() {
  return (
    <Section>
      <Topic>나의 질문 </Topic>
      <QuestionListDiv>
        <HeaderDiv>
          {headerList.map((val, idx) => (
            <p key={idx}>{val}</p>
          ))}
        </HeaderDiv>
        {dummyData.map((data) => (
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
