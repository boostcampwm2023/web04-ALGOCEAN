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
} from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthContextProvider>
        <ThemeProvider theme={theme}>
          <MainHeader />
          <MainNav />
          <Outlet />
        </ThemeProvider>
      </AuthContextProvider>
    ),
    children: [
      {
        path: '',
        element: <MainPage />,
      },
      {
        path: '/question/create',
        element: <QuestionCreationPage />,
        loader: () => {
          const isLogined = localStorage.getItem('userInfo');
          if (!isLogined) {
            return redirect('/login');
          }
          return null;
        },
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
        path: '/login',
        element: <LoginPage />,
        loader: () => {
          return null;
        },
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
    ],
  },
]);
