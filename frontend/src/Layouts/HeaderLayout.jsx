import React from 'react'
import Header from '../Components/Header';

const HeaderLayout = ({children}) => {
  return (
    <>
      <Header/>
      { children }
    </>
  );
}

export default HeaderLayout