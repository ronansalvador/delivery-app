import React from 'react';
import PropTypes from 'prop-types';

export default function UserCard({ userDetails, index, deleteUser }) {
  const { id, name, email, role } = userDetails;

  return (
    <div className="user-card">
      <p
        className="index"
        data-testid={ `admin_manage__element-user-table-item-number-${index}` }
      >
        {index + 1}
      </p>

      <p
        data-testid={ `admin_manage__element-user-table-name-${index}` }
      >
        {name}
      </p>

      <p
        data-testid={ `admin_manage__element-user-table-email-${index}` }
      >
        {email}
      </p>

      <p
        data-testid={ `admin_manage__element-user-table-role-${index}` }
      >
        {role}
      </p>

      <button
        type="button"
        className="user-btn-remove"
        data-testid={ `admin_manage__element-user-table-remove-${index}` }
        onClick={ () => deleteUser(id) }
      >
        Excluir
      </button>
    </div>
  );
}

UserCard.propTypes = {
  userDetails: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  deleteUser: PropTypes.func.isRequired,
};
