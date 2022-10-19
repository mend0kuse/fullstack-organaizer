import React, { useState } from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter';
import Navbar from './components/navbar/Navbar';
import Header from './components/header/Header';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
