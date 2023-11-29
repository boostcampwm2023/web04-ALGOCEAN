import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainHeader, MainNav, Scroller } from './components';
import {
  MainPage,
  QuestionCreationPage,
  QuestionDetailPage,
  LoginPage,
  SignupPage,
} from './pages';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <MainHeader />
          <MainNav />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/question/create" element={<QuestionCreationPage />} />
            <Route path="/question/:id" element={<QuestionDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
          <Scroller />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
