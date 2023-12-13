import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LoginContainer,
  LoginButton,
  AuthorizedProfileContainer,
  QuestionProfileContainer,
  Signup,
} from './QuestionProfile.styles';
import { AuthContext } from '../../contexts/AuthContexts';
import Swal from 'sweetalert2';

export function Login() {
  const navigate = useNavigate();

  const onLoginClick = () => navigate('/login');
  const onSignupClick = () => navigate('/signup');

  return (
    <LoginContainer>
      <div>로그인을 하면 나의 등급을 알 수 있어요!</div>
      <LoginButton onClick={onLoginClick}>로그인 하러 가기</LoginButton>
      <Signup onClick={onSignupClick}>회원가입</Signup>
    </LoginContainer>
  );
}

function AuthorizedProfile({
  handleIsLogined,
}: {
  handleIsLogined: (nextValue: boolean) => void;
}) {
  const { nickname, points } = JSON.parse(localStorage.getItem('userInfo')!);
  const { deleteAccessToken } = useContext(AuthContext);

  const onLogoutClick = () => {
    localStorage.removeItem('userInfo');
    deleteAccessToken();
    Swal.fire({
      icon: 'success',
      title: '로그아웃이 완료되었습니다',
      showConfirmButton: false,
      toast: true,
      timer: 1000,
    });
    handleIsLogined(false);
  };

  return (
    <AuthorizedProfileContainer>
      <div>
        반갑습니다, <strong>{nickname}</strong>님!
      </div>
      <div>현재 포인트 : {points}점</div>
      <button type="button" onClick={onLogoutClick}>
        로그아웃
      </button>
    </AuthorizedProfileContainer>
  );
}

export function QuestionProfile() {
  const userInfo = localStorage.getItem('userInfo');
  const [isLogined, setIsLogined] = useState(!!userInfo);

  const handleIsLogined = (nextValue: boolean) => setIsLogined(nextValue);

  return (
    <QuestionProfileContainer>
      {isLogined ? (
        <AuthorizedProfile handleIsLogined={handleIsLogined} />
      ) : (
        <Login />
      )}
    </QuestionProfileContainer>
  );
}
