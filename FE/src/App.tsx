import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainHeader, MainNav } from './components';
import { MainPage } from './pages';
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
            {/* ⚠️ QuestionCreationPage 컴포넌트 생성 후 주석 해제 필요 */}
            {/* <Route 
              path="/question/create/:id"
              element={<QuestionCreationPage />}
            /> */}
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
