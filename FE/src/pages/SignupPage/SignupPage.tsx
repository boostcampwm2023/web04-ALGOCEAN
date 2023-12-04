import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getUserIdVerified, postSignup } from '../../api/auth';
import { SignupFetchData as FetchData } from 'src/types/type';
import { Container, Inner, Form } from './SignupPage.styles';

interface SignupFormProps {
  handleSignupSubmit: (data: FetchData) => void;
}

interface FormData extends FetchData {
  passwordConfirm: string;
}

const SignupForm = ({ handleSignupSubmit }: SignupFormProps) => {
  const { register, getValues, handleSubmit } = useForm<FormData>();
  const [isIdVelified, setIsIdVelifed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onIdVelifyButtonClick = async () => {
    if (isIdVelified) {
      setErrorMessage('이미 아이디 확인이 완료되었습니다.');
      return;
    }

    const userId = getValues('userId');
    const isUserVerified = await getUserIdVerified(userId);
    if (isUserVerified) {
      setIsIdVelifed(true);
      if (errorMessage === 'Id를 확인해 주세요') {
        setErrorMessage(null);
      }
      return;
    }
    setErrorMessage('중복된 아이디입니다. 다른 아이디를 입력해주세요');
  };

  const isFormDataRight = (formData: FormData) => {
    const isFormDataEmpty = (formData: FormData) => {
      const { userId, password, passwordConfirm, nickname } = formData;
      const result = !userId || !password || !passwordConfirm || !nickname;
      return result;
    };

    const isPasswordConfirmed = (formData: FormData) => {
      const { password, passwordConfirm } = formData;
      return password === passwordConfirm;
    };

    if (isFormDataEmpty(formData)) {
      return {
        result: false,
        message: '모든 값을 입력해주세요',
      };
    }

    if (!isPasswordConfirmed(formData)) {
      return {
        result: false,
        message: '비밀번호가 일치하지 않습니다.',
      };
    }

    return {
      result: true,
    };
  };

  const onSubmit: SubmitHandler<FormData> = (formData: FormData) => {
    if (!isIdVelified) {
      return setErrorMessage('Id를 확인해 주세요');
    }

    const test = isFormDataRight(formData);
    if (test.result === false) {
      return setErrorMessage(test.message!);
    }

    const { userId, password, nickname } = formData;
    const fetchData = {
      userId,
      password,
      nickname,
    };
    handleSignupSubmit(fetchData);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <label>ID</label>
      <input
        {...register('userId', { required: true, maxLength: 20 })}
        disabled={isIdVelified}
      />
      {isIdVelified && <small>아이디 중복 확인 완료</small>}
      <button type="button" onClick={onIdVelifyButtonClick}>
        Id 확인
      </button>
      <label>비밀번호</label>
      <input {...register('password')} type="password" />
      <label>비밀번호 확인</label>
      <input {...register('passwordConfirm')} type="password" />
      <label>닉네임</label>
      <input {...register('nickname')} />
      <button>회원 가입</button>
      {!!errorMessage && <p>{errorMessage}</p>}
    </Form>
  );
};

const SignupPage = () => {
  const navigate = useNavigate();
  const handleSignupsubmit = async (fetchData: FetchData) => {
    const isSuccess = await postSignup(fetchData);

    if (!isSuccess) {
      return alert('회원 가입에 실패했습니다. 다시 시도해 주세요');
    }
    alert('성공적으로 회원 가입이 완료되었습니다');
    navigate('/');
  };

  return (
    <Container>
      <Inner>
        <SignupForm handleSignupSubmit={handleSignupsubmit} />
      </Inner>
    </Container>
  );
};

export default SignupPage;
