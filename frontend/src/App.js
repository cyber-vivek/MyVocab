import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderLayout from './Layouts/HeaderLayout';
import Homepage from './Components/Homepage';
import Login from './Components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Components/Loader';
import { useSelector } from 'react-redux';
import About from './Components/About';
import SignUp from './Components/SignUp';
import PrivateRoute from './Components/PrivateRoute';
import { Grid } from '@mui/material';

function App() {
  const loaderCount = useSelector((state) => state?.loader?.count);
  const getPrivateRoute = (Component) => {
    return <PrivateRoute><Component /></PrivateRoute>
  }
  return (<Grid component="div"  style={{pointerEvents: (loaderCount ? 'none' : 'all') }}>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<HeaderLayout>{getPrivateRoute(Homepage)}</HeaderLayout>} />
        <Route path="/about" element={<HeaderLayout>{getPrivateRoute(About)}</HeaderLayout>} />
      </Routes>
    </Router>
    <ToastContainer />
    {!!loaderCount && <Loader />}
  </Grid>
  );
}

export default App;
