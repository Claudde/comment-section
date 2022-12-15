import '../App.scss';
import React, {Component} from "react";
import ReactTimeAgo from 'react-time-ago';
import EditDialog from "./EditDialog";
import {Button, Avatar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@mui/material';



const regex = /^(\d{4})\-(\d{2})\-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z$/;


class CommentCard extends Component{
    constructor(props){
        super(props);
        this.state = {
          openFlg: false
        };
        this.dateTimeTest = this.dateTimeTest.bind(this);
        this.deleteUpdateButton = this.deleteUpdateButton.bind(this);
        this.replyButton = this.replyButton.bind(this);
        this.showEditDialog = this.showEditDialog.bind(this);
        this.deleteDialog = this.deleteDialog.bind(this);
        this.cancelUpdate = this.cancelUpdate.bind(this);
        this.resetToDefault = this.resetToDefault.bind(this);
        this.buildUpdate = this.buildUpdate.bind(this);
    }

    dateTimeTest = (date) => {
      return regex.test(date) ? <ReactTimeAgo date={Date.parse(date)} locale="en-US"/> : date;
    } 

    deleteUpdateButton = () =>{
      const deleteIcon = (
        <img alt="Delete" src='./images/icon-delete.svg'/>
      );

      const editIcon = (
        <img alt="Edit" src='./images/icon-edit.svg'/>
      );

      return (
        <div className='current-user-btn'>
          <Button onClick={(e) => {this.deleteDialog(e)}}
                  className='delete-btn'
                  startIcon={deleteIcon}
                  style={{
                    textTransform: "capitalize",
                    color: "#ED6468",
                    maxHeight: '30px', 
                    minHeight: '30px'
                  }}
                  >
            Delete
          </Button>

          <Dialog open={this.state.openFlg}
                  onClose={() => {this.setState({openFlg: false})}}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby='alert-dialog-description'
                  maxWidth="xs"
                  >
            <DialogTitle id="alert-dialog-title"
                         className='dialog-title'>
              {"Delete Comment"}
              
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {"Are you sure you want to remove this comment? This will remove the comment and can't be undone."}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={(e) => {this.setState({openFlg: false})}}
                      className="dialog-btn"
                      variant="contained"
                      style={{
                        background: "#67727E",
                        color: "#F5F6FA",
                        marginLeft: 5,
                        maxHeight: '35px',
                        minHeight: '35px'
                      }}>
                  No, Cancel</Button>
              <Button onClick={(e) => {
                                        this.props.deleteComment(e, this.props.comment.id, this.props.parent)
                                        this.setState({openFlg: false})
                                      }}
                      className="dialog-btn"
                      variant="contained"
                      style={{
                        background: "#ED6468",
                        color: "#F5F6FA",
                        marginLeft: 5,
                        maxHeight: '35px',
                        minHeight: '35px'
                      }}>
                  Yes, Delete</Button>
            </DialogActions>
          </Dialog>

          <Button onClick={(e) => {this.showEditDialog(e, this.props.comment.id)}}
                  className='edit-btn'
                  startIcon={editIcon}
                  style={{
                    textTransform: "capitalize",
                    maxHeight: '30px', 
                    minHeight: '30px'
                  }}
                  >
            Edit
          </Button>
        </div>
      );
    }

    replyButton = () =>{
      const replyIcon= (
        <img alt="Reply" src='./images/icon-reply.svg' width="10" height="10"/>
      );

      return(
        <div className='reply-btn' 
             id={`reply-btn-${this.props.comment.id}`} 
             >
          <Button variant='text' 
                  onClick={(e) => {
                      this.props.toggleReply(e, this.props.comment.id)
                              }}
                  startIcon={replyIcon}
                  style={{
                    textTransform: "capitalize",
                    maxHeight: '30px', 
                    minHeight: '30px'
                  }}  
                      >
            Reply
          </Button>
        </div>
      );
    }

    deleteDialog = (e) => {
      this.setState({
        openFlg: true
      });
    }
    
    showEditDialog(e, id) {
      e.preventDefault();
      
      var editDialog = document.getElementById(`edit-dialog-div-${id}`);
      editDialog.style.display = "grid"; 
      var commentContent = document.getElementById(`content-${id}`);
      commentContent.style.display = "none";
    }


    buildUpdate(e, content){
      let updateComment = {...this.props.comment};
      updateComment.content = content;
      console.log(content);
      this.props.updateContent(e, updateComment, this.props.parent);
      this.resetToDefault(this.props.comment.id);
      
    }

    cancelUpdate = (e, id) => {
        e.preventDefault();
        
        this.resetToDefault(id);
    }
    resetToDefault = (id) => {
        var updateTextArea = document.getElementById(`edit-dialog-text-${id}`);
        updateTextArea.value = this.props.comment.content;
        var editDialog = document.getElementById(`edit-dialog-div-${id}`);
        editDialog.style.display = "none";
        var commentContent = document.getElementById(`content-${id}`);
        commentContent.style.display = "block";
        this.setState({
            content: this.props.comment.content
        });
    }

    render(){
      return (
        <div id={this.props.comment.id} key={this.props.comment.id} className={`comment-container ${this.props.className}`}>
  
          {/* Score */}
          <div className='score'>
            <Button variant="text" 
                    style={{maxWidth: '30px', maxHeight: '25px', minWidth: '30px', minHeight: '25px'}} 
                    onClick={(e) => this.props.upDownVote(e, this.props.comment, 'up', this.props.parent)}>
                      <img alt="Upvote" src='./images/icon-plus.svg'/></Button>
            <p>{this.props.comment.score}</p>
            <Button variant="text" 
                    style={{maxWidth: '30px', maxHeight: '25px', minWidth: '30px', minHeight: '25px'}} 
                    onClick={(e) => this.props.upDownVote(e, this.props.comment, 'down', this.props.parent)}>
                      <img alt="Downvote" src='./images/icon-minus.svg'/></Button>
          </div>
  
          {/* Comment */}
          {/* <div className='comment' > */}

          <div className='comment-info'>

            <div className='user-info'>
              <Avatar src={this.props.comment.user.image.png} 
                      alt={this.props.comment.user.username} 
                      className="user-photo"
                      sx={{ width: 35, height: 35 }}
                      />
              <p className="user-name">{this.props.comment.user.username} 
                {this.props.currentUser === this.props.comment.user.username ? <span>you</span> : ""}
              </p>
              <p className='date-added'>{this.dateTimeTest(this.props.comment.createdAt)}</p>
            </div>
          </div>

          {this.props.currentUser === this.props.comment.user.username ? this.deleteUpdateButton() : this.replyButton()}

          <div id={`content-${this.props.comment.id}`}
                className='content'>
            <p>
              {this.props.className === 'reply' ? <span>@{this.props.comment.replyingTo}, </span> : ""}
              {this.props.comment.content}</p>
          </div>
          {this.props.currentUser === this.props.comment.user.username ? 
                      <EditDialog comments={this.props.comments}
                                  comment={this.props.comment}
                                  updateContent={this.props.updateContent}
                                  buildUpdate={this.buildUpdate}
                                  cancelUpdate={this.cancelUpdate}
                                  parent={this.props.parent}
                      /> : 
                      ""}
          {/* </div> */}
        </div>
      );
    }
  }

  export default CommentCard;