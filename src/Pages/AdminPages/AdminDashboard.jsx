import React from 'react';
import UserTable from '../../components/UserTable';
import useUsers from '../../hooks/useUsers';

function AdminDashboard() {
  const { users, handleAdminChange } = useUsers();

  console.log('users are ', users);
  return (
    <div>
      Admin Dashboard
      <UserTable users={users} handleAdminChange={handleAdminChange} />
    </div>
  );
}

export default AdminDashboard;
