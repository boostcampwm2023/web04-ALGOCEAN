import { useForm, SubmitHandler } from 'react-hook-form';
import { Container, Inner, Form } from './LoginPage.styles';

interface LoginFormProps {
  handleLoginSubmit: (data: FormData) => void;
}

interface FormData {
  id: string;
  password: string;
}

const LoginForm = ({ handleLoginSubmit }: LoginFormProps) => {
  const { register, handleSubmit } = useForm<FormData>();

  const isFormDataRight = (formData: FormData) => {
    const isFormDataEmpty = (formData: FormData) => {
      const { id, password } = formData;
      const result = !id || !password;
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
    if (test.result === false) {
      return alert(test.message);
    }

    const { id, password } = formData;
    const fetchData = {
      id,
      password,
    };
    handleLoginSubmit(fetchData);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <label>ID</label>
      <input {...register('id', { required: true, maxLength: 20 })} />
      <label>비밀번호</label>
      <input {...register('password')} />
      <button>로그인</button>
    </Form>
  );
};

const LoginPage = () => {
  return (
    <Container>
      <Inner>
        <LoginForm
          handleLoginSubmit={(data) => {
            console.log('data', data);
          }}
        />
      </Inner>
    </Container>
  );
};

export default LoginPage;
