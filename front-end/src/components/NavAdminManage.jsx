import React from 'react';
import { Link } from 'react-router-dom';

export default function NavAdminManage() {
  return (
    <Link
      data-testid="customer_products__element-navbar-link-products"
      to="/customer/products"
    >
      Gerenciar Usuários
    </Link>
  );
}
