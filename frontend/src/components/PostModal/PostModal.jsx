import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ReplyIcon from '@mui/icons-material/Reply';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Avatar, Card, CardHeader, TextField } from '@mui/material';
import SubjectIcon from '@mui/icons-material/Subject';
import CardMedia from '@mui/material/CardMedia';
import LinkIcon from '@mui/icons-material/Link';
import Collapse from '@mui/material/Collapse';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import('./postmodal.css');


const PostDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function PostTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

PostTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const PostModal = ({ posts, postIndex }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [index, setIndex] = useState(postIndex);
  const [newResponse, setNewResponse] = useState(null);
  const [newComment, setNewComment] = useState(null);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleResponseChange = (e) => {
    setNewResponse({
      ...newResponse,
      [e.target.id]: e.target.value
    })
  }

  const handleNewCommentChange = (e) => {
    setNewComment({
      ...newComment,
      [e.target.id]: e.target.value
    })
  }

  const [count, setCount] = useState(0);
  const increase = () => {
    setCount(count + 1);
  };

  return (
    <>
      <Card onClick={handleClickOpen} sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <Button aria-label="settings">
              <MoreVertIcon />
            </Button>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image="/static/images/cards/paella.jpg"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <div sx={{
            border: "1px solid #a8b3cf",
            padding: 0,
            display: "flex",
            justifyContent: "space-evenly",
            borderRadius: "15px",
          }}>
            <Button onClick={increase} className="bottom-button">
              <KeyboardDoubleArrowUpIcon />
            </Button>
            <Button className="bottom-button">
              <CommentIcon />
            </Button>
            <Button className="bottom-button">
              <ReplyIcon sx={{ transform: "scale(-1, 1)" }} />
            </Button>
          </div>
        </CardActions>
        <Collapse>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
              aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
              medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
              occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
              large plate and set aside, leaving chicken and chorizo in the pan. Add
              pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
              stirring often until thickened and fragrant, about 10 minutes. Add
              saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes and
              peppers, and cook without stirring, until most of the liquid is absorbed,
              15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
              mussels, tucking them down into the rice, and cook again without
              stirring, until mussels have opened and rice is just tender, 5 to 7
              minutes more. (Discard any mussels that don&apos;t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then serve.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
      <PostDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
        PaperProps={{ sx: { maxWidth: "revert", width: "55vw" } }}
      >
        <div className='dialog-container'>
          <div className='dialog-main'>
            <div className='dialog-header'>
              <Card
                variant="outlined"
                sx={{
                  height: "60px",
                  padding: "15px",
                  position: "relative",
                  backgroundColor: "#0e1217",
                  border: "1px solid #ce3df3",
                  marginBottom: "10px",
                  borderRadius: "15px"
                }}>
                <Button sx={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  color: "white",
                }}>
                  customize
                </Button>
              </Card>
              <Button className='previous' onClick={() => {
                setIndex(index > 0 ? index-- : posts.length - 1)
              }}>
                <ChevronLeftIcon />
              </Button>
              <Button className='next' onClick={() => {
                setIndex(index < posts.length - 1 ? index++ : 0)
              }}>
                <ChevronRightIcon />
              </Button>
            </div>
            {posts && posts[index] &&
            <>
              <div className='dialog-content'>
                <PostTitle id="customized-dialog-title" onClose={handleClose}>
                  {posts[index].title}
                </PostTitle>
                <DialogContent dividers>
                  <Typography display="inline" gutterBottom color="#ce3df3">
                    TLDR
                  </Typography>
                  <Typography display="inline" gutterBottom color="#a8b3cf">
                    {posts[index].content}
                  </Typography >
                  <Typography>
                    {
                      posts[index].tags.map((tag, index) => {
                        return (
                          <Button key={index}
                            sx={{ backgroundColor: "#1c1f26", color: "white" }}
                            onClick={() => {
                              console.log(tag);
                            }}>
                            {`#${tag}`}
                          </Button>
                        )
                      })
                    }
                  </Typography>

                  <CardMedia
                    sx={{ height: 140, border: "1px solid grey" }}
                    src="\images\default-image.png"
                    alt={`image alt text`}
                  >
                  </CardMedia>
                </DialogContent>
                <DialogActions
                  sx={{
                    border: "1px solid #a8b3cf",
                    padding: 0,
                    display: "flex",
                    justifyContent: "space-evenly",
                    borderRadius: "15px",
                  }}
                >
                  <Button className='action-button' autoFocus onClick={handleClose}>
                    <KeyboardDoubleArrowUpIcon /> Upvote
                  </Button>
                  <Button className='action-button' autoFocus onClick={handleClose}>
                    <CommentIcon /> Comment
                  </Button>
                  <Button className='action-button' autoFocus onClick={handleClose}>
                    <BookmarkIcon /> Bookmark
                  </Button>
                  <Button className='action-button' autoFocus onClick={handleClose}>
                    <ReplyIcon sx={{ transform: "scale(-1, 1)" }} /> Share
                  </Button>
                </DialogActions>
              </div>
            
            <div>
              <Card sx={{
                backgroundColor: "#0e1217",
                borderRadius: "15px",
                padding: "5px 10px",
                display: "flex",
                justifyContent: "space-between",
                margin: "10px 0px",
                color: "white",
                border: "1px solid #a8b3cf",
              }}>
                <Typography display='inline'>
                  Share your thoughts
                </Typography>
                <Typography display='inline'>
                  <Button onClick={() => {
                    console.log(posts[index].comments)
                  }}>
                    Post
                  </Button>
                </Typography>
              </Card>
              {
                posts[index].comments.map((comment, index) => {
                  return (<Card key={index} sx={{ padding: "10px", backgroundColor: "#0e1217", color: "white" }}>
                    <Card sx={{ padding: "5px" }} >
                      <CardHeader
                        avatar={<Avatar alt="alt" display="inline" />}
                        title={`${comment.author.firstname} ${comment.author.lastname}`}
                      />
                      <Typography>
                        {comment.content}
                      </Typography>
                    </Card>
                    {comment.responses.map((response) => {
                      return (
                        <>
                          <CardHeader
                            avatar={<Avatar alt="alt" display="inline" />}
                            title={`${response.author.firstname} ${response.author.lastname}`}
                          />
                          <Typography sx={{ marginLeft: "70px" }}>
                            {response.content}
                          </Typography>
                          <TextField
                            sx={{ width: "100%", input: { color: "white" }, "label": { color: "white" }, border: "1px solid #a8b3cf", marginTop: "10px" }}
                            id="content"
                            label="Answer to this content"
                            onChange={(e) => {
                              handleResponseChange(e);
                            }}
                          ></TextField>
                        </>)
                    })}
                  </Card>)
                })
              }
            </div>
            </>}
            <Card>
              <TextField
                sx={{ width: "100%" }}
                placeholder="Add a new comment"
                id="content"
                onChange={(e) => {
                  handleNewCommentChange(e);
                }}
              ></TextField>
            </Card>
          </div>
          <div className='dialog-right-sidebar'>
            <Card sx={{ padding: "10px", backgroundColor: "#0e1217" }}>
              <IconButton sx={{ color: "white" }}
                onClick={() => {
                  console.log("link")
                }}
              >
                <LinkIcon />
                Copy link
              </IconButton>
            </Card>
            <Card sx={{
              color: "white",
              backgroundColor: "#1c1f26",
              marginRight: "15px"
            }}>
              <Typography sx={{ borderBottom: "1px solid grey", textAlign: "left" }}>
                <SubjectIcon />
                Table content
              </Typography>
            </Card>
          </div>
        </div>
      </PostDialog>
    </>
  );
}

export default PostModal;