import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close'
import { Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, FormGroup, Switch } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Avatar,FormControl, Input, InputAdornment } from '@mui/material';
import Link from '@mui/material/Link';
import SignInSide from '././signin';
import { useState } from 'react';
import Profile from './Profile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import UserMan from './UserMan';
//import { Client } from '@elastic/elasticsearch';
function Header(props) {
  const { sections, title, setcreatePost, setdata } = props;
  const [signInOpen, setSignInOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = useState(false)
  const [UserManOpen, setUserManOpen] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [subscribedTopics, setSubscribedTopics] = useState([]); // Store subscribed topics here

  const handleSignInOpen = () => {
    setSignInOpen(true);
  };

  const handleSignInClose = () => {
    setSignInOpen(false);
  };
  
  const handleProfileOpen = () => {
    setProfileOpen(true);
  };

  const handleProfileClose = () => {
    setProfileOpen(false);
  };

  const handleUserManOpen = () => {
    setUserManOpen(true);
  };

  const handleUserManClose = () => {
    setUserManOpen(false);
  };

  const handleSubscribeOpen = () => {
    setSubscribeOpen(true);
  };

  const handleSubscribeClose = () => {
    setSubscribeOpen(false);
  };


  const [searchText, setSearchText] = React.useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:4500/api/search/${searchText}/title`, {
        withCredentials: true,
      });
      // Handle response data here, for example:
      console.log('Search results:', response.data);
      
    setdata(response.data);
      // Update state or do something with the search results
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleResetSearch = async () => {
    setSearchText(''); // Reset the search text
    setdata([]); // Reset the search results
    await handledata(); // Reload the data
  };
  const handlefilter = async (title) => {
    //console.log(props.data)
    const data = await axios.get('http://localhost:4500/getData', {
      withCredentials: true,
    });
    const rawData = data.data
  //console.log(rawData)
    const filteredRows = rawData.filter((row) => row.Category == title)
    setdata(filteredRows)
  }
  const handleauthorfilter = async (author) => {
    //console.log(props.data)
    const data = await axios.get('http://localhost:4500/getData', {
      withCredentials: true,
    });
    const rawData = data.data

    const filteredRows = rawData.filter((row) => row.author == author)
    setdata(filteredRows)
  }
  const handledata = async () => {
    const data = await axios.get("http://localhost:4500/getData", {
      withCredentials: true,
    });
    setdata(data.data);
};

  const handleSubscribe = () => {
    // Logic to store subscribed topics
    // This can be sent to your backend or stored locally depending on your requirements
    console.log("Subscribed Topics:", subscribedTopics); 
    handleSubscribeClose(); // Close the subscribe dialog
  };

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        {props.users == null ? (null) : (<FormControl>
            <Input
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => {handleSearch(); props.setoptions(false) }}>
                    <SearchIcon />
                  </IconButton>
                  {searchText && ( // Display the reset button only when there's text in the search input
                    <IconButton onClick={() => {handleResetSearch(); props.setoptions(true) }}>
                      <CloseIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              }
            />
          </FormControl>)}
        {props.users != null && props.users.role == "Administrator"? (<Button sx={{ marginLeft: '10px' }} size="small" onClick={handleUserManOpen}>
          User Management
        </Button>) : (null)}
        {props.users == null ? (null) : (<Button sx={{ marginLeft: '10px' }} size="small" onClick={handleSubscribeOpen}>
          Subscribe
        </Button>)}
        {props.users == null ? (null) : (<Button id="auto-click-button" sx={{ marginLeft: '10px' }} size="small" onClick={() => {handledata(); setcreatePost(false); props.setoptions(true); props.setviewPosts(false)}}>
          Home
        </Button>)}
        {props.users == null ? (null) : (<Button sx={{ marginLeft: '10px' }} size="small" onClick={() => {setcreatePost(true); props.setoptions(false)}}>
          Create Post
        </Button>)}
        {props.users == null ? (null) : (<Button sx={{ marginLeft: '10px' }} size="small" onClick={() => {handleauthorfilter(props.users.username); props.setoptions(false) }}>
          My Posts
        </Button>)}
        {props.users == null ? (null) : (<Button sx={{ marginLeft: '10px' }} size="small" onClick={handleProfileOpen}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <AccountCircleIcon primary />
        </Avatar>
        </Button>)}
        {props.users == null ? ( <Button sx={{ marginLeft: '10px' }} variant="outlined" size="small" onClick={handleSignInOpen}>
          Login
        </Button>) : ( <Button sx={{ marginLeft: '10px' }} variant="outlined" size="small" onClick={() => {handledata();props.setuser(null); setcreatePost(false); props.setoptions(true)}}>
          LogOut
        </Button>)}
       
      </Toolbar>
      {props.options ? (<Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          // <Link
          //   color="inherit"
          //   noWrap
          //   key={section.title}
          //   variant="body2"
          //   href={section.url}
          //   sx={{ p: 1, flexShrink: 0 }}
          // >
          //   {section.title}
          // </Link>
          <Button style={{ fontSize: 10, color: "black" }}  variant='text' onClick={()=> {handlefilter(section.title)}}>{section.title}</Button>
        ))}
      </Toolbar>) : (null)}
      <Dialog open={signInOpen} onClose={handleSignInClose} fullWidth maxWidth="md">
        <DialogContent className='signin-style'>
          <SignInSide dialogClose={setSignInOpen} setuser={props.setuser}/>
        </DialogContent>
      </Dialog>
      <Dialog open={profileOpen} onClose={handleProfileClose} fullWidth maxWidth="md">
        <DialogContent className='signin-style'>
          <Profile userdetails={props.users}/>
        </DialogContent>
      </Dialog>
      <Dialog open={UserManOpen} onClose={handleUserManClose} fullWidth maxWidth="md">
        <DialogContent className='signin-style'>
          <UserMan dialogClose={setUserManOpen} users={props.users}/>
        </DialogContent>
      </Dialog>
      <Dialog open={subscribeOpen} onClose={handleSubscribeClose} fullWidth maxWidth="md">
        <DialogTitle>Subscribe to Topics</DialogTitle>
        <DialogContent>
          <FormGroup>
            {sections.map((section, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Switch
                    checked={subscribedTopics.includes(section.title)}
                    onChange={() => {
                      if (subscribedTopics.includes(section.title)) {
                        setSubscribedTopics(subscribedTopics.filter(topic => topic !== section.title));
                      } else {
                        setSubscribedTopics([...subscribedTopics, section.title]);
                      }
                    }}
                  />
                }
                label={section.title}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => {
      const subscribedTopicsJson = {};
      sections.forEach((section) => {
        subscribedTopicsJson[section.title] = subscribedTopics.includes(section.title);
      });
      const jsonString = JSON.stringify(subscribedTopicsJson);
      // Call the API endpoint 'http://localhost:3000/update-usercred' on the server to update the usercred document
      console.log(subscribedTopicsJson); 

      axios.patch(`http://localhost:4500/updatesubpreferences/${props.users.username}`, {
        subscription: subscribedTopicsJson,
        withCredentials: true,
      })
        .then((response) => {
          handleSubscribe();
        })
        .catch((error) => {
          console.error('Error while updating the usercred document:', error);
        })
        .finally(() => {
          handleSubscribeClose();
        });
    }} color="primary">
      Subscribe
    </Button>

          <Button onClick={handleSubscribeClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
