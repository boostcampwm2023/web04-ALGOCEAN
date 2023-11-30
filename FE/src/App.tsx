import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainHeader, MainNav, Scroller } from './components';
import {
  MainPage,
  QuestionCreationPage,
  QuestionDetailPage,
  QuestionSearchPage,
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
            <Route path="/search" element={<QuestionSearchPage />} />
          </Routes>
          <Scroller />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
