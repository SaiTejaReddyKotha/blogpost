import React, { useState, useEffect } from 'react';
import { Grid, Checkbox, FormControlLabel, Button } from '@mui/material';
import axios from 'axios';

const UserMan = (props) => {
    
    const [users, setusers] = useState([])
    const [result, setresult] = useState([])
    useEffect(() => {
        const fetchData = async () => {
          try {
            // Simulating an asynchronous API call
            const response = await fetch('http://localhost:3001/users');
            const result = await response.json();
            setresult(result)
            result.pop();
            setusers(result)
          } catch (err) {
            console.log(err.message);
          }
        };
    
        fetchData();
      }, []);

      const handleChange = (user) => {
        users.forEach((person) => {
            if (person.username == user.username) {
                person.status = !person.status
            }
        })
      }
      

      const handleSave = async () => {
        try {
          const serverEndpoint = 'http://localhost:3001/users';

          // Make a POST request to update the data on the server
          const response = await axios.post(serverEndpoint, { users: result.users });
      
            console.log('Data successfully written to filedb.json');
        } catch (error) {
            console.error('Error writing file:', error);
        }
        console.log(result)
        console.log(users)
      }

    return (
        <div>
            <h1>UserManagement</h1>
            <Grid container spacing={2}>
      {users.map((user) => (
        <Grid item xs={12} key={user.id}>
          <Grid container alignItems="center">
            <Grid item xs={6}>
              {user.username}
            </Grid>
            <Grid item xs={6}>
                <FormControlLabel value="active" control={<Checkbox defaultChecked={user.status}/>} label="Active" onChange={() => {handleChange(user)}}/>
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
    )
}

export default UserMan

