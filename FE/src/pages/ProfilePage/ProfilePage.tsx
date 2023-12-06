import { useEffect, useState } from 'react';
import { AnswerList, QuestionList } from 'src/types/type';
import {
  getUserAnswerListAPI,
  getUserGradeAPI,
  getUserNicknameAPI,
  getUserPointAPI,
  getUserQuestionListAPI,
} from '../../api/profile';
import {
  ProfileAnswerList,
  ProfileInfo,
  ProfileQuestionList,
} from '../../components';
import { Container, Inner } from './ProfilePage.styles';

// 아직 유저 정보를 어떻게 가져올지 정해지지 않음.
// 그래서 유저 아이디 그냥 임의로 넣음.
const dummyUserId = 'user1';
const dummyUserIdNum = 1;

interface UserData {
  userPoint: number;
  userNickname: string;
  userGrade: string;
  userQuestionList: Array<QuestionList>;
  userAnswerList: Array<AnswerList>;
}

export default function ProfilePage() {
  const [data, setData] = useState<UserData>({
    userPoint: 0,
    userNickname: '',
    userGrade: '',
    userQuestionList: [],
    userAnswerList: [],
  });

  const fetchData = async () => {
    try {
      const [
        userPointResult,
        userNicknameResult,
        userGradeResult,
        userQuestionListResult,
        userAnswerListResult,
      ] = await Promise.all([
        getUserPointAPI(dummyUserId),
        getUserNicknameAPI(dummyUserId),
        getUserGradeAPI(dummyUserId),
        getUserQuestionListAPI(dummyUserIdNum),
        getUserAnswerListAPI(dummyUserIdNum),
      ]);
      setData({
        userPoint: userPointResult,
        userNickname: userNicknameResult,
        userGrade: userGradeResult,
        userQuestionList: userQuestionListResult,
        userAnswerList: userAnswerListResult,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Inner>
        <ProfileInfo
          userPoint={data.userPoint}
          userNickname={data.userNickname}
          userGrade={data.userGrade}
        />
        <ProfileQuestionList userQuestionList={data.userQuestionList} />
        <ProfileAnswerList userAnswerList={data.userAnswerList} />
      </Inner>
    </Container>
  );
}
