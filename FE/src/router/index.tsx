import { createBrowserRouter, redirect, Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { MainHeader, MainNav } from '../components';
import { AuthContextProvider } from '../contexts/AuthContexts';
import { theme } from '../styles/theme';
import {
  QuestionCreationPage,
  QuestionDetailPage,
  LoginPage,
  SignupPage,
  QuestionSearchPage,
  MainPage,
  ProfilePage,
  NotFoundPage,
} from '../pages';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HelmetProvider, Helmet } from 'react-helmet-async';

const { DEV } = import.meta.env;

const unAuthorizedLoader = () => {
  const isLogined = !!localStorage.getItem('userInfo');
  return !isLogined ? redirect('/') : null;
};

const authorizedLoader = () => {
  const isLogined = !!localStorage.getItem('userInfo');
  return isLogined ? redirect('/') : null;
};

const queryClient = new QueryClient();

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <QueryClientProvider client={queryClient}>
        {DEV && <ReactQueryDevtools initialIsOpen={true} />}
        <AuthContextProvider>
          <HelmetProvider>
            <ThemeProvider theme={theme}>
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
              <MainHeader />
              <MainNav />
              <Outlet />
            </ThemeProvider>
          </HelmetProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    ),
    children: [
      {
        path: '',
        element: <MainPage />,
      },
      {
        path: '/question/create',
        element: <QuestionCreationPage />,
        loader: unAuthorizedLoader,
      },
      {
        path: '/question/:id',
        element: <QuestionDetailPage />,
      },
      {
        path: '/search',
        element: <QuestionSearchPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
        loader: authorizedLoader,
      },
      {
        path: '/signup',
        element: <SignupPage />,
        loader: authorizedLoader,
      },
    ],
  },
  {
    path: '*',
    element: (
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <NotFoundPage />
        </ThemeProvider>
      </HelmetProvider>
    ),
  },
]);
