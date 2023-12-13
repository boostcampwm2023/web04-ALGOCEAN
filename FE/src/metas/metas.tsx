import { Helmet } from 'react-helmet-async';

export const MainPageMetas = () => {
  return (
    <Helmet>
      <title>알고션 (ALGOCEAN)</title>
      <meta
        name="description"
        content="알고리즘 관련 질문을 올리고 답변할 수 있는 커뮤니티"
      />
      <meta name="keywords" content="알고션, ALGOCEAN" />
    </Helmet>
  );
};

export const QuestionCreatePageMetas = () => {
  return (
    <Helmet>
      <title>알고션 (ALGOCEAN) - 질문 등록</title>
      <meta name="description" content="질문 등록 페이지" />
      <meta name="keywords" content="알고션, ALGOCEAN, 질문 등록" />
    </Helmet>
  );
};

export const QuestionDetailPageMetas = () => {
  return (
    <Helmet>
      <title>알고션 (ALGOCEAN) - 질문 상세</title>
      <meta name="description" content="알고션 (ALGOCEAN) 질문 상세 페이지" />
      <meta name="keywords" content="알고션, ALGOCEAN, 질문 상세" />
    </Helmet>
  );
};

interface UserProfileProps {
  userName: string;
}

export const ProfilePageMetas = ({ userName }: UserProfileProps) => {
  return (
    <Helmet>
      <title>알고션 (ALGOCEAN) - 프로필</title>
      <meta
        name="description"
        content={`알고션 (ALGOCEAN) ${userName}의 프로필 페이지`}
      />
      <meta name="keywords" content="알고션, ALGOCEAN, 프로필" />
    </Helmet>
  );
};

export const SignupPageMetas = () => {
  return (
    <Helmet>
      <title>알고션 (ALGOCEAN) - 회원가입</title>
      <meta name="description" content="알고션 (ALGOCEAN) 회원가입 페이지" />
      <meta name="keywords" content="알고션, ALGOCEAN, 회원가입" />
    </Helmet>
  );
};

export const LoginPageMetas = () => {
  return (
    <Helmet>
      <title>알고션 (ALGOCEAN) - 로그인</title>
      <meta name="description" content="알고션 (ALGOCEAN) 로그인 페이지" />
      <meta name="keywords" content="알고션, ALGOCEAN, 로그인" />
    </Helmet>
  );
};

export const QuestionSearchPageMetas = () => {
  return (
    <Helmet>
      <title>알고션 (ALGOCEAN) - 질문 검색</title>
      <meta name="description" content="알고션 (ALGOCEAN) 질문 검색 페이지" />
      <meta name="keywords" content="알고션, ALGOCEAN, 질문 검색" />
    </Helmet>
  );
};

export const NotFoundPageMetas = () => {
  return (
    <Helmet>
      <title>알고션 (ALGOCEAN) - 404 Not Found</title>
      <meta
        name="description"
        content="알고션 (ALGOCEAN) 404 Not Found 페이지"
      />
    </Helmet>
  );
};
