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

interface ProfileInfoProps {
  userPoint: number;
  userNickname: string;
  userGrade: string;
  userAdoptedAnswerCount: number;
  userAnswerCount: number;
  userQuestionCount: number;
}

export function ProfileInfo({
  userPoint,
  userNickname,
  userGrade,
  userAdoptedAnswerCount,
  userAnswerCount,
  userQuestionCount,
}: ProfileInfoProps) {
  // user/me api에 등수는 아직 안 내려와서 mock data 추가.
  const data = [
    { topic: '등수', content: '2등' },
    { topic: '포인트', content: userPoint },
    { topic: '전체 질문', content: `${userQuestionCount}건` },
    { topic: '전체 답변', content: `${userAnswerCount}건` },
    { topic: '채택 답변', content: `${userAdoptedAnswerCount}건` },
  ];
  return (
    <Section>
      <PersonalInfoLeftDiv>
        <ProfileImage src={Programmer} />
        <Nickname>{userNickname}</Nickname>
        <Rank>{userGrade}</Rank>
      </PersonalInfoLeftDiv>
      <PersonalInfoRightDiv>
        {data.map(({ topic, content }, idx) => (
          <div key={idx}>
            <Topic>{topic}</Topic>
            <Content>{content}</Content>
          </div>
        ))}
      </PersonalInfoRightDiv>
      <PointMarket>포인트 상점</PointMarket>
    </Section>
  );
}
