import React from'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderLayout from './Layouts/HeaderLayout';
import Homepage from './Components/Homepage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeaderLayout><Homepage/></HeaderLayout>} />
      </Routes>
    </Router>
    
  );
}

export default App;
