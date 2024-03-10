import React, { useState } from 'react';
import axios from 'axios';
import { Avatar, Link, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Profile = (props) => {
    console.log(props)
    return (
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
      </Box>
      <Typography component="h2" variant='h6'>Username: {props.userdetails.username}</Typography>
      <Typography component="h2" variant='h6'>Role: {props.userdetails.role}</Typography>
    </Container>
      );
}

export default Profile;