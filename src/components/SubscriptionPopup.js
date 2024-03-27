import React, { useState, useEffect } from 'react';
import { Grid, Checkbox, FormControlLabel, Button } from '@mui/material';
import axios from 'axios';

const UserMan = (props) => {
  const [users, setUsers] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4500/getcreds', {
          withCredentials: true,
        });
        const result = await response.json();
        setResult(result);
        const sortedUsers = result.sort((a, b) => a.username.localeCompare(b.username));
        setUsers(sortedUsers.map(user => ({ ...user, originalStatus: user.status })));
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, []);

  const handleChange = (user) => {
    setUsers((prevUsers) =>
      prevUsers.map((person) =>
        person.username === user.username
          ? { ...person, status: !person.status }
          : person
      )
    );
  };

  const handleSave = async () => {
    try {
      const userToUpdate = users.find(u => u.status !== u.originalStatus);
      console.log(userToUpdate);

      if (userToUpdate) {
        await axios.patch(`http://localhost:4500/getcreds/${userToUpdate.username}/${userToUpdate.status}`, {
          withCredentials: true,
        });
        console.log('User status successfully updated on the server');
      } else {
        console.log('No changes in user status to save.');
      }
      props.dialogClose(false);
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  return (
    <div>
      <h1>UserManagement</h1>
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item xs={12} key={user.id}>
            <Grid container alignItems="center">
              <Grid item xs={6}>
                {user.subscribedto}
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  value="active"
                  control={<Checkbox checked={user.status} />}
                  label="Active"
                  onChange={() => {
                    handleChange(user);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserMan;
