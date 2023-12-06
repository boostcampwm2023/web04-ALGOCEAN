import {
  Content,
  Nickname,
  PersonalInfoLeftDiv,
  PersonalInfoRightDiv,
  PointMarket,
  ProfileImage,
  Rank,
  Section,
  Topic,
} from './ProfileInfo.styles';
import Programmer from '/images/Programmer.png';

const dummyTopic = ['등수', '포인트', '전체질문', '전체답변', '채택답변'];
const dummyContent = ['1817', '543', '13건', '6건', '3건'];

export function ProfileInfo() {
  return (
    <Section>
      <PersonalInfoLeftDiv>
        <ProfileImage src={Programmer} />
        <Nickname>겨울엔역시고구마</Nickname>
        <Rank>Bronze</Rank>
      </PersonalInfoLeftDiv>
      <PersonalInfoRightDiv>
        {dummyTopic.map((topic, idx) => (
          <div key={idx}>
            <Topic>{topic}</Topic>
            <Content>{dummyContent[idx]}</Content>
          </div>
        ))}
      </PersonalInfoRightDiv>
      <PointMarket>포인트 상점</PointMarket>
    </Section>
  );
}
