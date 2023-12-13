import { Suspense } from 'react';
import { ProfilePageMetas } from '../../metas/metas';
import { getUserProfileAPI } from '../../api/profile';
import {
  Loading,
  ProfileAnswerList,
  ProfileInfo,
  ProfileQuestionList,
} from '../../components';
import { Container, Inner } from './ProfilePage.styles';
import { useSuspenseQuery } from '@tanstack/react-query';

const ProfileContent = () => {
  const getUserProfileData = async () => {
    return await getUserProfileAPI();
  };

  const { data: userProfileData } = useSuspenseQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfileData,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {userProfileData && (
        <>
          <ProfilePageMetas userName={userProfileData.nickname} />
          <Inner>
            <ProfileInfo
              userPoint={userProfileData.points}
              userNickname={userProfileData.nickname}
              userGrade={userProfileData.grade}
              userAdoptedAnswerCount={userProfileData.adoptedAnswerCount}
              userAnswerCount={userProfileData.answerCount}
              userQuestionCount={userProfileData.questionCount}
              userRanking={userProfileData.ranking}
            />
            <ProfileQuestionList
              userQuestionList={userProfileData.recentQuestions}
            />
            <ProfileAnswerList userAnswerList={userProfileData.recentAnswers} />
          </Inner>
        </>
      )}
    </>
  );
};
export default function ProfilePage() {
  return (
    <Container>
      <Suspense fallback={<Loading />}>
        <ProfileContent />
      </Suspense>
    </Container>
  );
}
