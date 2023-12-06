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

const headerList = ['제목', '채택', '작성일'];
const dummyData = [
  {
    id: 73761,
    title: '다익스트라 알고리즘의 정당성이 궁금해요',
    content:
      '<p>안녕하세요 다익스트라가 궁금하셨군요.</p>\n<p>저도 참 궁금한데요,</p>\n<p>꼭 다익스트라의 정당성을 알 수 있게 되면 좋겠네요. 사실 다익스트라는 한국 발음으로 데이크스트라입니다. 꿀 비가 내리고~ 음악이 흐르면~ 난 당신을~ 생각해요~ 당신이 떠나시던~ 아아아아아아아르헨티나 루루루루루룩셈부르크</p>\n<p>오늘은 다익스트라의 정당성에 대해 알아봤습니다 &gt;ㅡ0</p>\n',
    isAdopted: false,
    createdAt: '2023-12-05T11:41:59.000Z',
  },
  {
    id: 33763,
    title: '다익스트라 알고리즘의 정당성이 궁금해요',
    content: '<p>저도요!</p>\n',
    isAdopted: false,
    createdAt: '2023-12-05T05:24:17.000Z',
  },
  {
    id: 53763,
    title: '다익스트라 질문이 많아서 무서워요',
    content: '<p>너굴맨이 처리했으니까</p>\n<p>안심하라구!</p>\n',
    isAdopted: false,
    createdAt: '2023-12-04T08:21:46.000Z',
  },
];

export default function ProfileAnswerList() {
  return (
    <Section>
      <Topic>나의 답변</Topic>
      <AnswerListDiv>
        <HeaderDiv>
          {headerList.map((val, idx) => (
            <p key={idx}>{val}</p>
          ))}
        </HeaderDiv>
        {dummyData.map((data) => (
          <ContentDiv key={data.id}>
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
