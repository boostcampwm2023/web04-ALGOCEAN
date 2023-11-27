import {
  LoginContainer,
  LoginButton,
  QuestionProfileContainer,
} from './QuestionProfile.styles';

export function Login() {
  return (
    <LoginContainer>
      <div>로그인을 하면 나의 등급을 알 수 있어요!</div>
      <LoginButton>로그인 하러 가기</LoginButton>
    </LoginContainer>
  );
}

export function QuestionProfile() {
  return (
    <QuestionProfileContainer>
      <Login />
    </QuestionProfileContainer>
  );
}
