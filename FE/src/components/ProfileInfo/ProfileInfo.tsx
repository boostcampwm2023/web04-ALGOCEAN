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
const dummyContent = ['1817', 0, '13건', '6건', '3건'];

interface ProfileInfoProps {
  userPoint: number;
  userNickname: string;
  userGrade: string;
}

export function ProfileInfo({
  userPoint,
  userNickname,
  userGrade,
}: ProfileInfoProps) {
  // dummyContent에 넣은 이유는 아직 등수, 전체질문, 전체답변, 채택답변 등에 대한 api가 없어서다.
  // 현상태로 Content 태그에 userPoint를 직접 넣는 것은 쓸모없다고 판단하였다.
  // 추후에 api가 개발되면 dummyContent를 없앨 예정이다.
  dummyContent[1] = userPoint;
  return (
    <Section>
      <PersonalInfoLeftDiv>
        <ProfileImage src={Programmer} />
        <Nickname>{userNickname}</Nickname>
        <Rank>{userGrade}</Rank>
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
