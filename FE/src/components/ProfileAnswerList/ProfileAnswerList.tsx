import {
  AnswerListDiv,
  ContentDiv,
  ContentText,
  HeaderDiv,
  Section,
  TitleText,
  Topic,
} from './ProfileAnswerList.styles';
import { getFormalizedDate, getText } from '../../hooks';
import { AnswerList } from 'src/types/type';

const headerList = ['제목', '채택', '작성일'];

interface AnswerListProps {
  userAnswerList: Array<AnswerList>;
}

export default function ProfileAnswerList({ userAnswerList }: AnswerListProps) {
  return (
    <Section>
      <Topic>나의 답변</Topic>
      <AnswerListDiv>
        <HeaderDiv>
          {headerList.map((val, idx) => (
            <p key={idx}>{val}</p>
          ))}
        </HeaderDiv>
        {userAnswerList &&
          userAnswerList.map((data, idx) => (
            <ContentDiv key={idx}>
              <div>
                <TitleText>{data.title}</TitleText>
                <ContentText>{getText(data.content).trim()}</ContentText>
              </div>
              <p>{data.isAdopted ? 'O' : 'X'}</p>
              <p>{getFormalizedDate(data.createdAt)}</p>
            </ContentDiv>
          ))}
      </AnswerListDiv>
    </Section>
  );
}
