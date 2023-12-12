import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getWhoAmI, postLogin, getGithub } from '../../api';
import { LoginFetchData as FormData } from 'src/types/type';
import { Container, Inner, Form, SocialContainer } from './LoginPage.styles';
import { AuthContext } from '../../contexts/AuthContexts';
import Swal from 'sweetalert2';
import { LoginPageMetas } from '../../metas/metas';

interface LoginFormProps {
  handleLoginSubmit: (data: FormData) => void;
}

const GITHUB_ICON_URL =
  'https://static-00.iconduck.com/assets.00/github-icon-2048x1988-jzvzcf2t.png';

const LoginForm = ({ handleLoginSubmit }: LoginFormProps) => {
  const { register, handleSubmit } = useForm<FormData>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isFormDataRight = (formData: FormData) => {
    const isFormDataEmpty = (formData: FormData) => {
      const { userId, password } = formData;
      const result = !userId || !password;
      return result;
    };

    if (isFormDataEmpty(formData)) {
      return {
        result: false,
        message: '모든 값을 입력해주세요',
      };
    }

    return {
      result: true,
    };
  };

  const onSubmit: SubmitHandler<FormData> = (formData: FormData) => {
    const test = isFormDataRight(formData);
    if (!test.result) {
      return setErrorMessage(test.message!);
    }

    handleLoginSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <label>ID</label>
      <input {...register('userId', { required: true, maxLength: 20 })} />
      <label>비밀번호</label>
      <input {...register('password')} type="password" />
      <button>로그인</button>
      {!!errorMessage && <small>{errorMessage}</small>}
    </Form>
  );
};

const SocialLoginButtons = () => {
  return (
    <SocialContainer>
      <p>소셜 로그인</p>
      <button onClick={getGithub}>
        <img src={GITHUB_ICON_URL} alt="Sign in with Github" />
        <span>Sign in with Github</span>
      </button>
    </SocialContainer>
  );
};

const LoginPage = () => {
  const { setAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginSubmit = async (fetchData: FormData) => {
    const data = await postLogin(fetchData);

    if (!data) {
      return Swal.fire({
        icon: 'error',
        title: '로그인 실패',
        text: '아이디 혹은 비밀번호를 확인해주세요',
        confirmButtonText: '확인',
      });
    }

    const { accessToken } = data;
    setAccessToken(accessToken);

    const userInfo = await getWhoAmI();
    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    Swal.fire({
      icon: 'success',
      title: '로그인이 완료되었습니다',
      showConfirmButton: false,
      toast: true,
      timer: 1000,
    });

    navigate(-1);
  };

  return (
    <Container>
      <LoginPageMetas />
      <Inner>
        <LoginForm handleLoginSubmit={handleLoginSubmit} />
        <SocialLoginButtons />
      </Inner>
    </Container>
  );
};

export default LoginPage;
