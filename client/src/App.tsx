import React, { createContext, useState } from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter';
import Navbar from './components/navbar/Navbar';
import Header from './components/header/Header';
import { TokenContext } from './context/authContext';
import { AuthToken } from './context/authContext';


function App() {

  const [jwtToken, setJwtToken] = useState('')

  return (
    <AuthToken.Provider value={{ jwtToken, setJwtToken }}>
      <BrowserRouter>
        <Header />
        <AppRouter />
      </BrowserRouter>
    </AuthToken.Provider>

  );
}

export default App;
