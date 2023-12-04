import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContexts';
import { useNavigate } from 'react-router-dom';
import {
  LoginContainer,
  LoginButton,
  QuestionProfileContainer,
  Signup,
} from './QuestionProfile.styles';

export function Login() {
  const navigate = useNavigate();
  const handleRoute = () => {
    navigate('/login');
  };

  return (
    <LoginContainer>
      <div>로그인을 하면 나의 등급을 알 수 있어요!</div>
      <LoginButton onClick={handleRoute}>로그인 하러 가기</LoginButton>
      <Signup onClick={() => navigate('/signup')}>회원가입</Signup>
    </LoginContainer>
  );
}

function AuthorizedProfile() {
  return <div>로그인 완료</div>;
}

export function QuestionProfile() {
  const { getAccessToken } = useContext(AuthContext);
  const isAuthorized = getAccessToken();
  return (
    <QuestionProfileContainer>
      {isAuthorized ? <AuthorizedProfile /> : <Login />}
    </QuestionProfileContainer>
  );
}
