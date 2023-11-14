import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainHeader, MainNav } from './components';
import '../style/index.css';

function App() {
  return (
    <>
      <MainHeader />
      <MainNav />
      <Router>
        <Routes>
          <Route path="/" element={<div>root</div>} />
          <Route path="/quest" element={<div>quest</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
