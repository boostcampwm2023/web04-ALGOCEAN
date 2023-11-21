import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainHeader, MainNav } from './components';
import { MainPage, QuestionCreationPage } from './pages';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <MainHeader />
        <MainNav />
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/question/create/:id"
              element={<QuestionCreationPage />}
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
