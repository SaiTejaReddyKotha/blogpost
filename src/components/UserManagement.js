import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from the JSON file
    axios.get('/db.json')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const toggleUserStatus = (userId) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        user.enabled = !user.enabled;
      }
      return user;
    });

    // Update the JSON file with the new user data
    axios.put('/path/to/users.json', updatedUsers)
      .then(() => setUsers(updatedUsers))
      .catch(error => console.error('Error updating user status:', error));
  };

  return (
    <div>
      <h1>Admin Control Panel</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} - {user.enabled ? 'Enabled' : 'Disabled'}
            <button onClick={() => toggleUserStatus(user.id)}>
              {user.enabled ? 'Disable' : 'Enable'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
