import { useEffect, useState } from 'react';
import DataSource from '../api/DataSource';

const useUsers = () => {
  const [users, setUsers] = useState([]);

  const handleAdminChange = (uid, admin) => {
    DataSource.setUserCustomClaims(
      {
        uid,
        customClaims: { admin },
      },
    )
      .then((_users) => setUsers(_users.data.users))
      .catch((error) => console.error('error is ', error));
  };
  useEffect(() => {
    DataSource.getFirebaseUsers()
      .then((_users) => {
        setUsers(_users.data.users);
      })
      .catch((error) => console.error('error is ', error));
  }, []);
  return { users, handleAdminChange };
};

export default useUsers;
