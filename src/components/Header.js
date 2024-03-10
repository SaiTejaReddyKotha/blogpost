import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import SignInSide from '././signin';
import { useState } from 'react';
import Profile from './Profile';
import axios from 'axios';
import UserMan from './UserMan';


function Header(props) {
  const { sections, title, setcreatePost, setdata } = props;
  const [signInOpen, setSignInOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = useState(false)
  const [UserManOpen, setUserManOpen] = useState(false)

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

  const handlefilter = async (title) => {
    //console.log(props.data)
    const data = await axios.get('http://localhost:3001/posts')
    const rawData = data.data
    
    const filteredRows = rawData.filter((row) => row.Category == title)
    setdata(filteredRows)
  }
  const handleauthorfilter = async (author) => {
    //console.log(props.data)
    const data = await axios.get('http://localhost:3001/posts')
    const rawData = data.data

    const filteredRows = rawData.filter((row) => row.author == author)
    setdata(filteredRows)
  }
  const handledata = async () => {
    //console.log(props.data)
    const data = await axios.get('http://localhost:3001/posts')
    const rawData = data.data

    
    setdata(rawData)
  }

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
        {props.users != null && props.users.role == "Administrator"? (<Button sx={{ marginLeft: '10px' }} size="small" onClick={handleUserManOpen}>
          User Management
        </Button>) : (null)}
        {props.users == null ? (null) : (<Button sx={{ marginLeft: '10px' }} size="small" onClick={() => {handledata(); setcreatePost(false); props.setoptions(true); props.setviewPosts(false)}}>
          Home
        </Button>)}
        {props.users == null ? (null) : (<Button sx={{ marginLeft: '10px' }} size="small" onClick={() => {setcreatePost(true); props.setoptions(false)}}>
          Create Post
        </Button>)}
        {props.users == null ? (null) : (<Button sx={{ marginLeft: '10px' }} size="small" onClick={() => {handleauthorfilter(props.users.username); props.setoptions(false) }}>
          My Posts
        </Button>)}
        {props.users == null ? (null) : (<Button sx={{ marginLeft: '10px' }} size="small" onClick={handleProfileOpen}>
          {props.users.username}
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
          <UserMan users={props.users}/>
        </DialogContent>
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
