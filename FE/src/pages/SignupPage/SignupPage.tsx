import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Container, Inner, Form } from './SignupPage.styles';

interface SignupFormProps {
  handleSignupSubmit: (data: any) => void;
}

interface FormData {
  id: string;
  password: string;
  nickname: string;
  passwordConfirm: string;
}

const SignupForm = ({ handleSignupSubmit }: SignupFormProps) => {
  const { register, handleSubmit } = useForm<FormData>();

  const [isIdValified, setIsIdValifed] = useState(false);

  const onIdValifyButtonClick = () => {
    if (isIdValified) {
      alert('이미 아이디 확인이 완료되었습니다.');
      return;
    }
    // ⚠️ ID validate API 필요
    setIsIdValifed(true);
    alert('사용할 수 있는 id 입니다');
  };

  const isFormDataRight = (formData: FormData) => {
    const isFormDataEmpty = (formData: FormData) => {
      const { id, password, passwordConfirm, nickname } = formData;
      const result = !id || !password || !passwordConfirm || !nickname;
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
    if (!isIdValified) {
      return alert('Id를 확인해 주세요');
    }

    const test = isFormDataRight(formData);
    if (test.result === false) {
      return alert(test.message);
    }

    const { id, password, nickname } = formData;
    const fetchData = {
      id,
      password,
      nickname,
    };
    handleSignupSubmit(fetchData);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <label>ID</label>
      <input {...register('id', { required: true, maxLength: 20 })} />
      <button type="button" onClick={onIdValifyButtonClick}>
        Id 확인
      </button>
      <label>비밀번호</label>
      <input {...register('password')} />
      <label>비밀번호 확인</label>
      <input {...register('passwordConfirm')} />
      <label>닉네임</label>
      <input {...register('nickname')} />
      <button>회원 가입</button>
    </Form>
  );
};

const SignupPage = () => {
  return (
    <Container>
      <Inner>
        <SignupForm
          handleSignupSubmit={(data) => {
            console.log('data', data);
          }}
        />
      </Inner>
    </Container>
  );
};

export default SignupPage;
