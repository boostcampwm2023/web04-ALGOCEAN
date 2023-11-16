import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>root</div>} />
        <Route path="/quest" element={<div>quest</div>} />
      </Routes>
    </Router>
  );
}

export default App;
