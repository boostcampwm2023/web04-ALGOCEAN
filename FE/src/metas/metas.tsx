import { Helmet } from 'react-helmet-async';

export const DefaultMetas = () => {
  return (
    <Helmet>
      <meta property="og:url" content="https://algocean.site" />
      <meta property="og:title" content="ALGOCEAN" />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://user-images.githubusercontent.com/97934878/285278009-d7f75de2-17b3-4c0f-9df7-16a12aafbba1.png"
      />
      <meta
        property="og:description"
        content="🌊 알고리즘의 바다에 풍덩 빠져보시겠어요"
      />
      <meta name="keywords" content="algocean, 알고션, 알고리즘" />
      <meta name="robots" content="index, follow" />
      <meta
        name="naver-site-verification"
        content="df4b8ce0d43ccc2f3f5211e0c6d285606dd4b926"
      />
    </Helmet>
  );
};

export const MainPageMetas = () => {
  return (
    <Helmet>
      <title>ALGOCEAN</title>
      <meta
        name="description"
        content="알고리즘 관련 질문을 올리고 답변할 수 있는 커뮤니티"
      />
    </Helmet>
  );
};

export const QuestionCreatePageMetas = () => {
  return (
    <Helmet>
      <title>질문 등록</title>
      <meta name="description" content="질문 등록 페이지" />
    </Helmet>
  );
};

export const QuestionDetailPageMetas = () => {
  return (
    <Helmet>
      <title>질문 상세</title>
      <meta name="description" content="질문 상세 페이지" />
    </Helmet>
  );
};

interface UserProfileProps {
  userName: string;
}

export const ProfilePageMetas = ({ userName }: UserProfileProps) => {
  return (
    <Helmet>
      <title>프로필</title>
      <meta name="description" content={`${userName}의 프로필 페이지`} />
      <meta name="keywords" content={`${userName}, 프로필`} />
    </Helmet>
  );
};

export const SignupPageMetas = () => {
  return (
    <Helmet>
      <title>회원가입</title>
      <meta name="description" content="회원가입 페이지" />
    </Helmet>
  );
};

export const LoginPageMetas = () => {
  return (
    <Helmet>
      <title>로그인</title>
      <meta name="description" content="로그인 페이지" />
    </Helmet>
  );
};

export const QuestionSearchPageMetas = () => {
  return (
    <Helmet>
      <title>질문 검색</title>
      <meta name="description" content="질문 검색 페이지" />
    </Helmet>
  );
};

export const NotFoundPageMetas = () => {
  return (
    <Helmet>
      <title>404 Not Found</title>
      <meta name="description" content="404 Not Found 페이지" />
    </Helmet>
  );
};
