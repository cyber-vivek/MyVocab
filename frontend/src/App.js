import React from'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderLayout from './Layouts/HeaderLayout';
import Homepage from './Components/Homepage';
// import Login from './Components/Login';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Loader from './Components/Loader';

function App() {
  return (<>
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Login/>} /> */}
        <Route path="/" element={<HeaderLayout><Homepage/></HeaderLayout>} />
      </Routes>
    </Router>
    <ToastContainer/>
    {/* <Loader/> */}
    </>
  );
}

export default App;
