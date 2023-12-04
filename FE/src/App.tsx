import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainHeader, MainNav, Scroller } from './components';
import {
  MainPage,
  QuestionCreationPage,
  QuestionDetailPage,
  QuestionSearchPage,
  LoginPage,
  SignupPage,
} from './pages';
import {
  AuthContext,
  DEFAULT_AUTH_CONTEXT_VALUE,
} from './contexts/AuthContexts';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

function App() {
  return (
    <>
      <AuthContext.Provider value={DEFAULT_AUTH_CONTEXT_VALUE}>
        <ThemeProvider theme={theme}>
          <Router>
            <MainHeader />
            <MainNav />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route
                path="/question/create"
                element={<QuestionCreationPage />}
              />
              <Route path="/question/:id" element={<QuestionDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/search" element={<QuestionSearchPage />} />
            </Routes>
            <Scroller />
          </Router>
        </ThemeProvider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
