import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import UserContext from './context/UserContext';
import CustomerProducts from './pages/CustomerProducts';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles';

function App() {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        <Route exact path="/login" element={ <Login /> } />
        {/* Caso não exista um usuário salvo no localstorage automáticamente o usuário será redirecionado para tela de login */}
        { user === null
          ? (
            <Route path="*" element={ <Navigate to="/login" /> } />)
          : (
            <>
              <Route exact path="/register" element={ <Register /> } />
              <Route exat path="/customer/products" element={ <CustomerProducts /> } />
            </>
          )}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
