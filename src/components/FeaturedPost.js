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
import { Dialog, DialogContent, Box, TextField, Button, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentIcon from '@mui/icons-material/Comment';
import ReplyIcon from '@mui/icons-material/Reply';
import CommentBox from './CommentBox';
import './FeaturedPost.css'; // Import the CSS file

function FeaturedPost(props) {
  const { post } = props;
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [comOpen, setcomOpen] = useState(false);
  const [replyOpen, setreplyOpen] = useState(false);
  const [newcomments, setnewcomments] = useState([]);
  const [posts, setPosts] = useState(/* Your posts data, possibly from an API or local storage */);

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
  };

  const handlereplyDialogClose = () => {
    setreplyOpen(false);
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
        // Assuming you have an API endpoint for deleting posts
        const response = await fetch(`http://localhost:3001/posts/${post.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // If the deletion was successful, close the details dialog
          setDetailsOpen(false);
        } else {
          console.error('Failed to delete post');
          // Handle error accordingly
        }
      } catch (error) {
        console.error('Error occurred while deleting post', error);
        // Handle error accordingly
      }
    }
  };

  const handleSubmit = () => {
    post.comments = newcomments;
    setreplyOpen(false);
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
              <TextField type='text' sx={{ width: '100%' }} onChange={(e) => { handleChange(e); }} />
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
