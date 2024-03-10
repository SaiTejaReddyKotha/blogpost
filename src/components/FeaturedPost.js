import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { Dialog, DialogContent, Box, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentBox from './CommentBox';
import ReplyIcon from '@mui/icons-material/Reply';


function FeaturedPost(props) {
  const { post } = props;
  const [comOpen, setcomOpen] = useState(false)
  const [replyOpen, setreplyOpen] = useState(false)
  const [newcomments, setnewcomments] = useState([])

  const handlecomDialogOpen = () => {
    setcomOpen(true)
  }
  const handlecomDialogClose = () => {
    setcomOpen(false)
  }

  const handlereplyDialogOpen = () => {
    setreplyOpen(true)
  }
  const handlereplyDialogClose = () => {
    setreplyOpen(false)
  }

  const handleChange = (e) => {
    const comments = post.comments;
    const newComment = {"author": `${props.user.username}`, "content": `${e.target.value}`}
    const updatedComments = [...comments, newComment]
    setnewcomments(updatedComments)
  }

  const handleSubmit = () => {
    post.comments = newcomments
    setreplyOpen(false)
  }


  return (
    <div>
    <Grid item xs={12} md={6}>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <div style={{ display: 'flex'}}>
            <div style={{ marginRight: '20px' }}>
                <ThumbUpIcon />
                <Typography variant="subtitle1" color="text.secondary">
                  {post.likes}
                </Typography>
            </div>
            <div style={{ marginRight: '20px' }}>
                <ThumbDownIcon />
                <Typography variant="subtitle1" color="text.secondary">
                  {post.dislikes}
                </Typography>
            </div>
            <div>
            <IconButton onClick={handlecomDialogOpen}>
              <CommentIcon />
            </IconButton>
            </div>
            <div style={{ marginRight: '20px' }}>
            <IconButton onClick={handlereplyDialogOpen}>
              <ReplyIcon />
            </IconButton>
            </div>
             </div>
            {props.user !=null && props.user.role == "Moderator" ? (<IconButton onClick={console.log("delete")}><DeleteIcon /></IconButton>): (null)}
            <Typography variant="subtitle1" paragraph>
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
    <Dialog open={comOpen} onClose={handlecomDialogClose} fullWidth maxWidth="md">
        <DialogContent className='signin-style'>
          {post.comments.length > 0 ? (<Box sx={{ flexGrow: 1 }}><Grid item xs={5}>
            {post.comments.map((post) => (
              <CommentBox author={post.author} content={post.content} />
            ))}
          </Grid></Box>) : (null)}
        </DialogContent>
      </Dialog>

      <Dialog open={replyOpen} onClose={handlereplyDialogClose} fullWidth maxWidth="md">
        <DialogContent className='signin-style'>
        {props.user != null ? (<><TextField type='text' size='medium' onChange={(e) => { handleChange(e); } } /><Button onClick={handleSubmit}>Submit</Button></>) : (<h2>Please LogIn</h2>)}
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
