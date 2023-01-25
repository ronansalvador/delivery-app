import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import CustomerProducts from './pages/CustomerProducts';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        <Route exact path="/login" element={ <Login /> } />
        <Route exact path="/register" element={ <Register /> } />
        <Route exat path="/customer/products" element={ <CustomerProducts /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
