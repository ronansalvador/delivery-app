import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import UserContext from './context/UserContext';
import CustomerProducts from './pages/CustomerProducts';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import CustomerOrders from './pages/CustomerOrders';
import './styles';
import OrdersDetails from './pages/OrdersDetails';
import SellerOrders from './pages/SellerOrders';
import AdminManage from './pages/AdminManage';

function App() {
  const { user } = useContext(UserContext);
  console.log(user);
  // const [url, setUrl] = useState('');

  const checkRole = () => {
    if (user.role === 'customer') return '/customer/products';
    if (user.role === 'seller') return '/seller/orders';
    if (user.role === 'administrator') return '/admin/manage';
  };

  return (

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
            <Route exact path="/" element={ <Navigate to={ checkRole() } /> } />
            <Route
              exact
              path="/login"
              element={ <Navigate to={ checkRole() } /> }
            />
            <Route exact path="/customer/products" element={ <CustomerProducts /> } />
            <Route exact path="/customer/checkout" element={ <Checkout /> } />
            <Route exact path="/customer/orders" element={ <CustomerOrders /> } />
            <Route
              exact
              path="/customer/orders/:id"
              element={ <OrdersDetails /> }
            />
            <Route exact path="/seller/orders" element={ <SellerOrders /> } />
            <Route
              exact
              path="/seller/orders/:id"
              element={ <OrdersDetails /> }
            />
            <Route exact path="/admin/manage" element={ <AdminManage /> } />
          </>
        )}
    </Routes>

  );
}

export default App;
