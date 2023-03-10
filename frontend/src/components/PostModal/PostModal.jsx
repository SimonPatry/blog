import React, {useState, useEffect, useContext} from 'react';
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
import SendIcon from '@mui/icons-material/Send';
import { fetchPatch, fetchPost } from '../fetch';
import AppContext from '../../context/AppContext';

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

  const {sessionToken, user} = useContext(AppContext);
  const { REACT_APP_NEWPOST } = process.env;
  // Quand le token est présent, on récupère l'utilisateur

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

  const updatePost = async (id) => {
    try{
      if (newComment) {
        setNewComment({
          ...newComment,
          author: user._id,
        })
      }
      if (newResponse) {
        setNewResponse({
          ...newResponse,
          author: user._id,
        })
      }
      posts[index].comments.push(newComment);
      await fetchPatch(REACT_APP_NEWPOST, posts[index])
      .then(() => {
        setNewComment(null)
        setNewResponse(null)
      })
    } catch(e) {
      console.error(e);
      setNewComment(null)
    }
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
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
                setIndex(index > 0 ? index-- : posts.length-1)
              }}>
                <ChevronLeftIcon />
              </Button>
              <Button className='next' onClick={() => {
                setIndex(index < posts.length-1 ? index++ : 0)
              }}>
                <ChevronRightIcon />
              </Button>
            </div>
            <div className='dialog-content'>
              <PostTitle id="customized-dialog-title" onClose={handleClose}>
                { posts[index].title }
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
                        sx={{backgroundColor: "#1c1f26", color: "white"}}
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
                  sx={{height: 140, border: "1px solid grey"}}
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
                    <ReplyIcon sx={{transform: "scale(-1, 1)"}} /> Share
                  </Button>
                </DialogActions>
            </div>
            <div>
              <Card  sx={{
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
              { posts &&
                posts[index].comments.map((comment, index) => {       
                  return(<Card key={index} sx={{padding: "10px", backgroundColor: "#0e1217", color: "white"}}>
                      <Card sx={{padding: "5px"}} >
                        <CardHeader
                          avatar={<Avatar alt="alt" display="inline"/>}
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
                              avatar={<Avatar alt="alt" display="inline"/>}
                              title={`${response.author.firstname} ${response.author.lastname}`}
                            />
                            <Typography sx={{marginLeft: "70px"}}>
                              {response.content}
                            </Typography>
                            <TextField
                             sx={{ width: "100%", input: { color: "white" }, "label": {color: "white"}, border: "1px solid #a8b3cf", marginTop: "10px" }} 
                              id="content"
                              label="Answer to this content"
                              onChange={(e) => {
                                handleResponseChange(e);
                              }}
                            ></TextField>
                            <Button
                              onClick={() => {
                                updatePost(posts[index]._id);
                              }}
                            ></Button>
                        </>)
                      })}
                    </Card>)
                })
              }
            </div>
          { sessionToken &&
            <Card>
            <TextField
              sx={{width: "100%"}}
              placeholder="Add a new comment"
              id="content"
              onChange={(e) => {
                handleNewCommentChange(e);
              }}
            ></TextField>
            <Button
              onClick={() => {
                updatePost();
              }}
            >
              <SendIcon />
            </Button>
          </Card>}
          </div>
          <div className='dialog-right-sidebar'>
            <Card sx={{padding: "10px", backgroundColor: "#0e1217"}}>
              <IconButton sx={{color: "white"}}
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
              <Typography sx={{borderBottom: "1px solid grey", textAlign: "left"}}>
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