import React from 'react';
import PropTypes from 'prop-types';

export default function UserCard({ userDetails, index, deleteUser }) {
  const { id, name, email, role } = userDetails;

  return (
    <div>
      <p
        data-testid={ `admin_manage__element-user-table-item-number-${'<index>'}` }
      >
        {index + 1}
      </p>

      <p
        data-testid="admin_manage__input-email"
      >
        {name}
      </p>

      <p
        data-testid={ `admin_manage__element-user-table-email-${'<index>'}` }
      >
        {email}
      </p>

      <p
        data-testid={ `admin_manage__element-user-table-role-${'<index>'}` }
      >
        {role}
      </p>

      <button
        type="button"
        data-testid={ `admin_manage__element-user-table-remove-${'<index>'}` }
        onClick={ () => deleteUser(id) }
      >
        Excluir
      </button>
    </div>
  );
}

UserCard.propTypes = {
  userDetails: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  deleteUser: PropTypes.func.isRequired,
};
