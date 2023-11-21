import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainHeader, MainNav } from './components';
import { MainPage } from './pages';
import '../style/index.css';

function App() {
  return (
    <>
      <MainHeader />
      <MainNav />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
