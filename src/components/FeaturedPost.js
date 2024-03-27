// FeaturedPost.js

import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { Dialog, DialogContent, Box, TextField, Button, DialogTitle, Switch } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentIcon from '@mui/icons-material/Comment';
import ReplyIcon from '@mui/icons-material/Reply';
import CommentBox from './CommentBox';
import './FeaturedPost.css'; // Import the CSS file
import axios from "axios";
function FeaturedPost(props) {
  const { post } = props;
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [comOpen, setcomOpen] = useState(false);
  const [replyOpen, setreplyOpen] = useState(false);
  const [newcomments, setnewcomments] = useState([]);
  const [posts, setPosts] = useState();
  const [replyText, setReplyText] = useState('');
  
  const handleDetailsOpen = () => {
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
  };

  const handlecomDialogOpen = () => {
    setcomOpen(true);
  };

  const handlecomDialogClose = () => {
    setcomOpen(false);
  };

  const handlereplyDialogOpen = () => {
    setreplyOpen(true);
    setGenerateReply(false);
  };

  const handlereplyDialogClose = () => {
    setreplyOpen(false);
    setReplyText('');
  };

  const handleChange = (e) => {
    const comments = post.comments;
    const newComment = { "author": `${props.user.username}`, "content": `${e.target.value}` };
    const updatedComments = [...comments, newComment];
    setnewcomments(updatedComments);
  };

  const handleDelete = async () => {
    // Check if the user is a moderator
    if (props.user != null && props.user.role === "Moderator") {
      // Remove the post from the posts data
      try {
        const response = await fetch(`http://localhost:4500/deleteposts/${post.id}`, {
        method: 'DELETE',
      });
        console.log(response.success);
        setDetailsOpen(false);
        //buttonElement.click();
        
      } catch (error) {
        console.error('Error occurred while deleting post', error);
        // Handle error accordingly
      }
    }
  };
  const [generateReply, setGenerateReply] = useState(false); // State for OpenAI generated replies

  const handleGenerateReplyToggle = () => {
    setGenerateReply(!generateReply);
    console.log("in handleGenerateReplyToggle ",generateReply);
    if (!generateReply) {
      // Call handleGenerateReply function to get the reply message response
      handleGenerateReply();
    } else {
      setReplyText(''); // Clear text field when generateReply is toggled off
    }
  };

  const handleGenerateReply = async () => {
    if (!generateReply) {
      try {
        // Call OpenAI completion endpoint to generate reply
        const rtitle=post.title;
        const rcontent=post.content;
        const response = await axios.post('http://localhost:4500/generate-reply', { rtitle, rcontent });
      
        const generatedReply = response.data; 
          console.log("Generated Reply is ",generatedReply);
          setReplyText(generatedReply);
          setGenerateReply(false);
          // Extract generated reply from response
      } catch (error) {
        console.error('Error occurred while generating reply', error);
        // Handle error accordingly
      }
    } 
  };


  // const handleSubmit = () => {
  //   post.comments = newcomments;
  //   setreplyOpen(false);
  // };
  const handleSubmit = () => {
    const commentText = !generateReply ? replyText : post.comments[post.comments.length - 1].content; // If generating reply, use replyText, otherwise use the manually entered text
    const newComment = { "author": `${props.user.username}`, "content": commentText };
    const updatedComments = [...post.comments, newComment]; // Append the new comment to the existing comments
    post.comments = updatedComments; // Update the comments in the post
    setnewcomments(updatedComments); // Update the newcomments state
    setreplyOpen(false); // Close the reply dialog
    setReplyText('');
  };


  return (
    <div className="featured-post">
      <Grid item xs={12} md={6}>
        <Card className="featured-card" onClick={handleDetailsOpen}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5" className="post-title">
              {post.title}
            </Typography>
            <Typography variant="subtitle2" className="post-author">
              Author: {post.author}
            </Typography>
            <div className="post-actions">
              <IconButton onClick={handlecomDialogOpen}>
                <CommentIcon />
              </IconButton>
              <IconButton onClick={handlereplyDialogOpen}>
                <ReplyIcon />
              </IconButton>
              {props.user != null && props.user.role === "Moderator" ? (
                <IconButton onClick={handleDelete} className="delete-button">
                  <DeleteIcon />
                </IconButton>
              ) : null}
            </div>
            <Typography variant="subtitle1" paragraph className="post-content">
              {post.content}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={post.image}
            alt={post.imageLabel}
          />
        </Card>
      </Grid>

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onClose={handleDetailsClose} fullWidth maxWidth="md">
        <DialogTitle><b>{post.title}</b></DialogTitle>
        <DialogContent className='signin-style'>
          {/* Display post details in the dialog */}
          <Typography variant="subtitle2" className="post-author">
            Author: {post.author}
          </Typography>

          <Typography variant="subtitle1" paragraph className="post-content">
            {post.content}
          </Typography>
          <div className="post-actions">
            <IconButton onClick={handlecomDialogOpen}>
              <CommentIcon />
            </IconButton>
            <IconButton onClick={handlereplyDialogOpen}>
              <ReplyIcon />
            </IconButton>
            {props.user != null && props.user.role === "Moderator" ? (
              <IconButton onClick={handleDelete} className="delete-button">
                <DeleteIcon />
              </IconButton>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>

      {/* Comment Dialog */}
      <Dialog open={comOpen} onClose={handlecomDialogClose} fullWidth maxWidth="md">
        <DialogTitle><b>Replies</b></DialogTitle>
        <DialogContent className='signin-style'>
          {post.comments.length > 0 ? (
            <Box sx={{ flexGrow: 1 }}>
              <Grid item xs={5}>
                {post.comments.map((comment, index) => (
                  <CommentBox key={index} author={comment.author} content={comment.content} />
                ))}
              </Grid>
            </Box>
          ) : (null)}
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={replyOpen} onClose={handlereplyDialogClose} fullWidth maxWidth="md">
      <DialogTitle><b>Write your reply</b></DialogTitle>
      <DialogContent className='signin-style'>

        {props.user != null ? (
          <>
            <Switch
              checked={generateReply}
              onChange={handleGenerateReplyToggle}
              color="primary"
              inputProps={{ 'aria-label': 'toggle OpenAI generated replies' }}
            />
            <Typography variant="body2" color="textSecondary">
              Generate Reply
            </Typography>

            <TextField 
              type='text' 
              sx={{ width: '100%' }} 
              onChange={(e) => { handleChange(e); }} 
              value={generateReply ? "Generating reply..." : replyText} // Displaying "Generating reply..." while generating
              disabled={generateReply} // Disabling the text field if generating reply
            />
            <Button onClick={handleSubmit}>Submit</Button>
          </>
        ) : (<h2>Please LogIn</h2>)}
      </DialogContent>
    </Dialog>

    </div>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;
