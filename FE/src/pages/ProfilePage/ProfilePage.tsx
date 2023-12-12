import { ProfilePageMetas } from '../../metas/metas';
import { getUserProfileAPI } from '../../api/profile';
import {
  ProfileAnswerList,
  ProfileInfo,
  ProfileQuestionList,
} from '../../components';
import { Container, Inner } from './ProfilePage.styles';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export default function ProfilePage() {
  const getUserProfileData = async () => {
    return await getUserProfileAPI();
  };

  const { data: userProfileData } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfileData,
    staleTime: 10 * 1000,
    gcTime: 30 * 1000,
    placeholderData: keepPreviousData,
  });

  return (
    <Container>
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
            />
            <ProfileQuestionList
              userQuestionList={userProfileData.recentQuestions}
            />
            <ProfileAnswerList userAnswerList={userProfileData.recentAnswers} />
          </Inner>
        </>
      )}
    </Container>
  );
}
