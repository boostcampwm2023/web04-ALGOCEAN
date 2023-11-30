import * as S from './QuestionProfile.styles';

export function Login() {
  return (
    <S.Login>
      <div>프로필이 보고 싶다면?</div>
      <button className="login-button">로그인</button>
      <div>
        <span>아직 회원이 아니라면?</span>
        <button className="signup-button">회원 가입</button>
      </div>
    </S.Login>
  );
}

export function QuestionProfile() {
  return (
    <S.UserQuestion>
      <Login />
    </S.UserQuestion>
  );
}
