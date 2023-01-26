import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import UserContext from './context/UserContext';
import CustomerProducts from './pages/CustomerProducts';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
// import CustomerDetails from './pages/CustomerDetails';
import './styles';
import CustomerOrdersDetails from './pages/CustomerOrdersDetails';

function App() {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        {/* Caso não exista um usuário salvo no localstorage automáticamente o usuário será redirecionado para tela de login */}
        { user === null
          ? (
            <>
              <Route exact path="/" element={ <Navigate to="/login" /> } />
              <Route exact path="/login" element={ <Login /> } />
              <Route exact path="/register" element={ <Register /> } />
              <Route path="*" element={ <Navigate to="/login" /> } />
            </>)
          : (
            <>
              <Route exact path="*" element={ <Navigate to="/customer/products" /> } />
              <Route exact path="/customer/products" element={ <CustomerProducts /> } />
              <Route exact path="/customer/checkout" element={ <Checkout /> } />
              {/* <Route exact path="/customer/orders" element={ <CustomerOrders /> } /> */}
              <Route
                exact
                path="/customer/orders"
                element={ <CustomerOrdersDetails /> }
              />
            </>
          )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
