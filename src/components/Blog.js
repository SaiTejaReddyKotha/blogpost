import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Button, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import FeaturedPost from './FeaturedPost';
import { useEffect, useState } from 'react';
//import Sidebar from './Sidebar';
import Footer from './Footer';
// import post1 from './blog-post.1.md';
// import post2 from './blog-post.2.md';
// import post3 from './blog-post.3.md';
import CreatePost from './createPost';
import ViewPosts from './ViewPosts';
import axios from 'axios';
import ChatWindow from './ChatWindow';
import OpenAI from 'openai';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const sections = [
  { title: 'Academic Resources', url: '#' },
  { title: 'Career Services', url: '#' },
  { title: 'Campus', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Local Community Resources', url: '#' },
  { title: 'Social', url: '#' },
  { title: 'Sports', url: '#' },
  { title: 'Health and Wellness', url: '#' },
  { title: 'Technology', url: '#' },
  { title: 'Travel', url: '#' },
  { title: 'Alumni', url: '#' }
];


// const mainFeaturedPost = {
//   title: 'Title of a longer featured blog post',
//   description:
//     "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
//   image: 'https://source.unsplash.com/random?wallpapers',
//   imageText: 'main image description',
//   linkText: 'Continue reading…',
// };

// const featuredPosts = [
//   {
//     title: 'Featured post',
//     date: 'Nov 12',
//     description:
//       'This is a wider card with supporting text below as a natural lead-in to additional content.',
//     image: 'https://source.unsplash.com/random?wallpapers',
//     imageLabel: 'Image Text',
//   },
//   {
//     title: 'Post title',
//     date: 'Nov 11',
//     description:
//       'This is a wider card with supporting text below as a natural lead-in to additional content.',
//     image: 'https://source.unsplash.com/random?wallpapers',
//     imageLabel: 'Image Text',
//   },
// ];

//const posts = [post1, post2, post3];

// const sidebar = {
//   title: 'About',
//   description:
//     'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
//   archives: [
//     { title: 'March 2020', url: '#' },
//     { title: 'February 2020', url: '#' },
//     { title: 'January 2020', url: '#' },
//     { title: 'November 1999', url: '#' },
//     { title: 'October 1999', url: '#' },
//     { title: 'September 1999', url: '#' },
//     { title: 'August 1999', url: '#' },
//     { title: 'July 1999', url: '#' },
//     { title: 'June 1999', url: '#' },
//     { title: 'May 1999', url: '#' },
//     { title: 'April 1999', url: '#' },
//   ],
//   social: [
//     { name: 'GitHub', icon: GitHubIcon },
//     { name: 'X', icon: XIcon },
//     { name: 'Facebook', icon: FacebookIcon },
//   ],
// };

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Blog() {
  const [createPost, setcreatePost] = useState(false)
  const [viewPosts, setviewPosts] = useState(false)
  const [user, setuser] = useState(null)
  const [options, setoptions] = useState(true)
  const [data, setdata] = useState([])
  // const [currentPage, setcurrentPage] = useState(null)
  // useEffect(() => {
  //   const currentPath = window.location.pathname;
  //   setcurrentPage(currentPath)
  //   console.log(currentPath)
  // }, [])







  //chat bot code
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  const handleChatIconClick = () => {
    setChatOpen(!chatOpen);
  };

  const handleSendMessage = (message) => {
    // Add user message to chat
    setChatMessages([...chatMessages, { author: 'user', message }]);
    // Process user input and generate agent response
    processUserInput(message);
  };

  const processUserInput = (userInput) => {
    // Logic to process user input and generate agent response
    // For simplicity, let's assume the response is hardcoded
    const agentResponse = "This is a dummy agent response.";
    // Add agent response to chat
    setChatMessages([...chatMessages, { author: 'agent', message: agentResponse }]);
  };


  //chat bot code ends
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating an asynchronous API call
        const data = await axios.get("http://localhost:4500/getData", {
      withCredentials: true,
    });
    setdata(data.data);
        // console.log(result)
        // setdata(result)
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth= "lg">
        <Header title="Illinois Tech Blog Post" setdata={setdata} sections={sections} setcreatePost={setcreatePost} options={options} setoptions={setoptions} users={user} setuser={setuser} setviewPosts={setviewPosts}/>
        
{createPost ? (
        // Condition: Display CreatePost component
        <CreatePost data={data} setdata={setdata} user={user} setcreatePost={setcreatePost} setoptions={setoptions}/>
      ) : viewPosts ? (
        // Condition: Display ViewPosts component
        <ViewPosts user={user} setcreatePost={setcreatePost} setoptions={setoptions}/>
      ) : (
        // Default: Display MainComponent
        <main>
          {/* <MainFeaturedPost post={mainFeaturedPost} /> */}
          {data.length > 0 ? (<Box sx={{ flexGrow: 1 }}><Grid item xs={5}>
            {data.map((post) => (
              <FeaturedPost key={post.title} post={post} data={data} user={user} setdata={setdata}/>
            ))}
          </Grid></Box>) : (null)}
          
        </main>
      )}
        
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />

<Box
        position="fixed"
        bottom={16}
        right={16}
        zIndex={1000}
        onClick={handleChatIconClick}
        style={{ cursor: 'pointer' }}
      >
        <SmartToyIcon fontSize="large" />
      </Box>
      {chatOpen && (
        <Box
          position="fixed"
          bottom={88} 
          right={16}
          zIndex={1001}
          boxShadow={3}
        >
          <ChatWindow chatMessages={chatMessages} onSendMessage={handleSendMessage} />
        </Box>
      )}
    </ThemeProvider>
  );
}
