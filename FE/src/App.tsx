import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainHeader } from './components';
import '../style/index.css';

function App() {
  return (
    <>
      <MainHeader />
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
